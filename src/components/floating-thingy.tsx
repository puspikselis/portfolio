'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export function FloatingThingy() {
  const [config, setConfig] = useState({
    color: '',
    description: '',
    title: '',
  });
  const floatingRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<Element[]>([]);

  useEffect(() => {
    // Find all elements with data-title attribute
    const elements = Array.from(document.querySelectorAll('[data-title]'));
    elementsRef.current = elements;

    if (elements.length === 0) {
      return;
    }

    // If only one element, set it and return
    if (elements.length === 1) {
      const element = elements[0];
      setConfig({
        color: element.getAttribute('data-color') || '',
        description: element.getAttribute('data-description') || '',
        title: element.getAttribute('data-title') || '',
      });
      return;
    }

    // Multiple elements - track scroll position
    const updateActiveElement = () => {
      if (!floatingRef.current) return;

      const floatingTop = floatingRef.current.getBoundingClientRect().top;

      // Find element that most recently crossed the top
      // We want the last element whose top is above or at the FloatingThingy position
      let activeElement: Element | null = null;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();

        // If element's top is above or at the FloatingThingy top
        if (rect.top <= floatingTop) {
          activeElement = element;
        } else {
          // Once we find an element below, we stop
          break;
        }
      }

      // Use first element as default if none crossed yet
      if (!activeElement && elements.length > 0) {
        activeElement = elements[0];
      }

      if (activeElement) {
        setConfig({
          color: activeElement.getAttribute('data-color') || '',
          description: activeElement.getAttribute('data-description') || '',
          title: activeElement.getAttribute('data-title') || '',
        });
      }
    };

    // Initial update
    updateActiveElement();

    // Listen to scroll events
    window.addEventListener('scroll', updateActiveElement, { passive: true });
    window.addEventListener('resize', updateActiveElement, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveElement);
      window.removeEventListener('resize', updateActiveElement);
    };
  }, []);

  return (
    <div
      className={cn(
        'color-white sticky top-40 z-1 max-w-64 space-y-2 pl-24',
        config.title &&
          'before:absolute before:top-2 before:left-0 before:block before:h-px before:w-8 before:bg-nero-500 before:content-[""]',
        config.title &&
          'after:absolute after:top-2 after:left-12 after:block after:h-px after:w-8 after:bg-(--dash-color) after:transition-colors after:content-[""]',
      )}
      ref={floatingRef}
      style={{ '--dash-color': config.color || '#5f5f5f' } as React.CSSProperties}
    >
      {config.title && <h6 className="font-medium text-13/4 text-white">{config.title}</h6>}
      {config.description && (
        <p className="font-medium text-12/5 text-dim-gray-100">{config.description}</p>
      )}
    </div>
  );
}
