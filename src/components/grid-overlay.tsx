'use client';

import { useEffect, useState } from 'react';

export function GridOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+G (Mac) or Ctrl+G (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'g') {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 min-h-full">
      {/* Rows grid - 4px height, 4px gap - red 10% */}
      <div
        className="absolute inset-0 min-h-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgb(239 68 68 / 0.1) 0px, rgb(239 68 68 / 0.1) 4px, transparent 4px, transparent 8px)',
        }}
      />

      {/* 12 columns (64px width, 32px gutter) - red 10% centered */}
      <div className="absolute inset-0 flex min-h-full justify-center">
        <div
          className="h-full bg-[length:1120px_100%]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgb(239 68 68 / 0.1) 0px, rgb(239 68 68 / 0.1) 64px, transparent 64px, transparent 96px)',
            width: '1120px',
          }}
        />
      </div>
    </div>
  );
}
