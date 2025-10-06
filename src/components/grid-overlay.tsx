'use client';

import { useEffect, useState } from 'react';

// Helper to create square grid gradient
const createGridGradient = (color: string, size: number) =>
  `repeating-linear-gradient(0deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size}px), repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size}px)`;

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
      {/* 96px grid - black 40% */}
      <div
        className="absolute inset-0 min-h-full bg-[length:theme(spacing.24)_theme(spacing.24)]"
        style={{ backgroundImage: createGridGradient('rgb(0 0 0 / 0.4)', 96) }}
      />

      {/* 4px grid - red 10% */}
      <div
        className="absolute inset-0 min-h-full bg-[length:theme(spacing.1)_theme(spacing.1)]"
        style={{ backgroundImage: createGridGradient('rgb(239 68 68 / 0.1)', 4) }}
      />

      {/* Rows grid - 64px height, 16px offset, 32px gutter - red 10% */}
      <div
        className="absolute inset-0 min-h-full bg-[length:100%_theme(spacing.24)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 16px, rgb(239 68 68 / 0.1) 16px, rgb(239 68 68 / 0.1) 80px, transparent 80px, transparent 112px, rgb(239 68 68 / 0.1) 112px)',
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

      {/* 16px grid - green 20% */}
      <div
        className="absolute inset-0 min-h-full bg-[length:theme(spacing.4)_theme(spacing.4)]"
        style={{ backgroundImage: createGridGradient('rgb(34 197 94 / 0.2)', 16) }}
      />
    </div>
  );
}
