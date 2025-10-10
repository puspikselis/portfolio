'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type Config = { color: string; description: string; title: string };

const DEFAULT_STICKY_TOP_FALLBACK = 160;
const DEFAULT_DASH = 'var(--color-dim-gray-100)';
const HYSTERESIS = 4;
const BOTTOM_THRESHOLD_PX = 100; // Fixed pixel threshold instead of percentage

export function FloatingThingy() {
  const [config, setConfig] = useState<Config>({
    color: '',
    description: '',
    title: '',
  });

  const floatingRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastSigRef = useRef('');
  const stickyTopRef = useRef<number>(DEFAULT_STICKY_TOP_FALLBACK);
  const elementsRef = useRef<HTMLElement[]>([]);
  const updateActiveElementRef = useRef<() => void>(() => {});

  // Use Framer Motion's useScroll for reliable scroll tracking
  const { scrollY } = useScroll();

  // RAF-based lerp for smooth visual updates
  const targetOffsetRef = useRef(0);
  const visualOffsetRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const animateFnRef = useRef<() => void>(() => {});

  const readStickyTop = useCallback(() => {
    const el = floatingRef.current;
    if (!el) return;
    const topPx = parseFloat(getComputedStyle(el).top || `${DEFAULT_STICKY_TOP_FALLBACK}`);
    if (!Number.isNaN(topPx)) stickyTopRef.current = topPx;
  }, []);

  const collectElements = useCallback(() => {
    elementsRef.current = Array.from(document.querySelectorAll<HTMLElement>('[data-title]'));
  }, []);

  // RAF-based animation function
  animateFnRef.current = () => {
    const v = visualOffsetRef.current;
    const t = targetOffsetRef.current;
    const next = v + (t - v) * 0.25; // smoothing factor (~4 frames to settle)
    visualOffsetRef.current = Math.abs(next - t) < 0.5 ? t : next;

    // write the CSS var directly—no React re-render
    const n = visualOffsetRef.current;
    floatingRef.current?.style.setProperty('--offset', `${n}px`);

    if (n !== t) {
      animRef.current = requestAnimationFrame(() => animateFnRef.current?.());
    } else {
      animRef.current = null;
    }
  };

  const setTargetOffset = useCallback((px: number) => {
    targetOffsetRef.current = Math.max(0, px | 0);
    if (animRef.current == null) {
      animRef.current = requestAnimationFrame(() => animateFnRef.current?.());
    }
  }, []);

  useLayoutEffect(() => {
    // Initialize the CSS var
    floatingRef.current?.style.setProperty('--offset', '0px');
    collectElements();
    readStickyTop();
  }, [collectElements, readStickyTop]);

  useEffect(() => {
    collectElements();

    const mo = new MutationObserver(() => {
      collectElements();
      requestAnimationFrame(() => updateActiveElementRef.current?.());
    });

    mo.observe(document.body, {
      attributeFilter: ['data-title', 'data-description', 'data-color'],
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => mo.disconnect();
  }, [collectElements]);

  useEffect(() => {
    const el = floatingRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => readStickyTop());
    ro.observe(el);
    return () => ro.disconnect();
  }, [readStickyTop]);

  useEffect(() => {
    const readAttrs = (el: HTMLElement) => {
      const ds = el.dataset as Record<string, string | undefined>;
      return {
        color: ds.color || '',
        description: ds.description || '',
        title: ds.title || '',
      };
    };

    const updateConfig = (el: HTMLElement) => {
      const { title, description, color } = readAttrs(el);
      const sig = `${title}|${description}|${color}`;
      if (lastSigRef.current === sig) return;
      setConfig({ color, description, title });
      lastSigRef.current = sig;
    };

    const updateActiveElement = () => {
      const host = floatingRef.current;
      const elements = elementsRef.current;
      if (!host) return;

      if (elements.length === 0) {
        if (lastSigRef.current !== '') {
          setConfig({ color: '', description: '', title: '' });
          lastSigRef.current = '';
        }
        return;
      }

      const stickyTop = stickyTopRef.current;
      const viewportH = window.innerHeight;
      const scrollBottom = window.scrollY + viewportH;
      const docH = document.documentElement.scrollHeight;
      // Use fixed pixel threshold instead of percentage - more reliable across different page heights
      const distanceFromBottom = docH - scrollBottom;
      const nearBottom = distanceFromBottom <= BOTTOM_THRESHOLD_PX;

      let activeEl: HTMLElement | null = null;
      let offset = 0;

      if (nearBottom) {
        for (let i = elements.length - 1; i >= 0; i--) {
          const rect = elements[i].getBoundingClientRect();
          if (rect.top < viewportH && rect.bottom > 0) {
            activeEl = elements[i];

            const alignTarget = activeEl.querySelector<HTMLElement>('[data-align-target]');
            if (alignTarget) {
              const tRect = alignTarget.getBoundingClientRect();
              if (tRect.top > stickyTop) offset = tRect.top - stickyTop;
            } else if (rect.top > stickyTop) {
              offset = rect.top - stickyTop;
            }
            break;
          }
        }
      } else {
        const floatingTop = host.getBoundingClientRect().top;

        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= floatingTop - HYSTERESIS && rect.bottom > floatingTop + HYSTERESIS) {
            activeEl = el;
            break;
          }
        }

        if (!activeEl) {
          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= floatingTop) activeEl = el;
            else break;
          }
        }
      }

      activeEl = activeEl || elements[0];

      if (offset !== targetOffsetRef.current) {
        setTargetOffset(offset);
      }
      if (activeEl) updateConfig(activeEl);
    };

    updateActiveElementRef.current = updateActiveElement;

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        readStickyTop();
        updateActiveElement();
      });
    };

    updateActiveElement();
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [readStickyTop, setTargetOffset]);

  // Use Framer Motion's scroll tracking instead of manual scroll listener
  // This is more reliable and doesn't cause re-renders
  useMotionValueEvent(scrollY, 'change', () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => updateActiveElementRef.current?.());
  });

  const style = {
    '--dash-color': config.color || DEFAULT_DASH,
  } as React.CSSProperties;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-40 z-10 hidden md:block">
      <div className="mx-auto max-w-404">
        <div
          aria-atomic="true"
          aria-live="polite"
          className={cn(
            'translate-y-[var(--offset)] space-y-2 pl-24 will-change-transform',
            config.title &&
              'before:absolute before:top-2 before:left-0 before:block before:h-px before:w-8 before:bg-nero-500 before:content-[""]',
            config.title &&
              'after:absolute after:top-2 after:left-12 after:block after:h-px after:w-8 after:bg-[var(--dash-color)] after:transition-colors after:content-[""]',
          )}
          ref={floatingRef}
          style={style}
        >
          {config.title && <h6 className="font-medium text-13/4 text-white">{config.title}</h6>}
          {config.description && (
            <p className="-tracking-[0.03em] max-w-45 font-medium text-12/5 text-dim-gray-100">
              {config.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
