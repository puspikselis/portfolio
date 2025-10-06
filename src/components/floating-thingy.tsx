'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type Config = { color: string; description: string; title: string };

const DEFAULT_STICKY_TOP_FALLBACK = 160;
const DEFAULT_DASH = '#5f5f5f';
const HYSTERESIS = 4;

export function FloatingThingy() {
  const [config, setConfig] = useState<Config>({
    color: '',
    description: '',
    title: '',
  });

  const floatingRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastSigRef = useRef('');
  const lastOffsetRef = useRef(0);
  const stickyTopRef = useRef<number>(DEFAULT_STICKY_TOP_FALLBACK);
  const elementsRef = useRef<HTMLElement[]>([]);
  const updateActiveElementRef = useRef<() => void>(() => {});

  const readStickyTop = useCallback(() => {
    const el = floatingRef.current;
    if (!el) return;
    const topPx = parseFloat(getComputedStyle(el).top || `${DEFAULT_STICKY_TOP_FALLBACK}`);
    if (!Number.isNaN(topPx)) stickyTopRef.current = topPx;
  }, []);

  const collectElements = useCallback(() => {
    elementsRef.current = Array.from(document.querySelectorAll<HTMLElement>('[data-title]'));
  }, []);

  useLayoutEffect(() => {
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
      const atBottom = Math.ceil(scrollBottom) >= Math.floor(docH);

      let activeEl: HTMLElement | null = null;
      let offset = 0;

      if (atBottom) {
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

      if (offset !== lastOffsetRef.current) {
        host.style.transform = `translate3d(0, ${offset}px, 0)`;
        lastOffsetRef.current = offset;
      }
      if (activeEl) updateConfig(activeEl);
    };

    updateActiveElementRef.current = updateActiveElement;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActiveElement);
    };

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        readStickyTop();
        updateActiveElement();
      });
    };

    updateActiveElement();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [readStickyTop]);

  interface CSSVars extends React.CSSProperties {
    ['--dash-color']?: string;
  }
  const style: CSSVars = { '--dash-color': config.color || DEFAULT_DASH };

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={cn(
        'sticky top-40 z-10 max-w-[16rem] space-y-2 pl-24 transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none',
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
        <p className="font-medium text-12/5 text-dim-gray-100">{config.description}</p>
      )}
    </div>
  );
}
