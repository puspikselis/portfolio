'use client';

import { motion, type SpringOptions } from 'framer-motion';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface CursorPreviewState {
  color: string;
  height: number;
  image?: string;
  isVisible: boolean;
  width: number;
  x: number;
  y: number;
}

interface CursorPreviewContextValue {
  hidePreview: () => void;
  showPreview: (color: string, image?: string, width?: number, height?: number) => void;
}

const CursorPreviewContext = createContext<CursorPreviewContextValue | null>(null);

const SPRING_CONFIG: SpringOptions = {
  bounce: 0.15,
  damping: 25,
  stiffness: 800,
};

export function CursorPreviewProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorPreviewState>({
    color: '#1d1d1d',
    height: 156,
    isVisible: false,
    width: 248,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    const handleClick = () => {
      setState((prev) => ({ ...prev, isVisible: false }));
    };

    const handleScroll = () => {
      setState((prev) => ({ ...prev, isVisible: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const showPreview = useCallback((color: string, image?: string, width = 248, height = 156) => {
    // Disable cursor preview on mobile/touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }
    setState((prev) => ({ ...prev, color, height, image, isVisible: true, width }));
  }, []);

  const hidePreview = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const contextValue = useMemo(() => ({ hidePreview, showPreview }), [hidePreview, showPreview]);

  const isVideo = state.image?.endsWith('.webm');

  return (
    <CursorPreviewContext.Provider value={contextValue}>
      {children}
      <motion.div
        animate={{
          opacity: state.isVisible ? 1 : 0,
          scale: state.isVisible ? 1 : 0.85,
          x: state.x + 12,
          y: state.y + 12,
        }}
        className="pointer-events-none fixed top-0 left-0 z-50 overflow-hidden rounded-2xl shadow-2xl"
        initial={{ opacity: 0, scale: 0.85 }}
        style={{
          backgroundColor: state.color,
          height: state.height,
          width: state.width,
        }}
        transition={{
          opacity: { damping: 20, stiffness: 400 },
          scale: { damping: 20, stiffness: 400 },
          x: SPRING_CONFIG,
          y: SPRING_CONFIG,
        }}
      >
        {state.image &&
          (isVideo ? (
            <video
              autoPlay
              className="size-full object-cover"
              loop
              muted
              playsInline
              src={state.image}
            />
          ) : (
            <img
              alt="Preview"
              className="size-full object-cover"
              src={state.image}
              srcSet={`${state.image} 1x, ${state.image.replace(/\.avif$/, '@2x.avif')} 2x, ${state.image.replace(/\.avif$/, '@3x.avif')} 3x`}
            />
          ))}
      </motion.div>
    </CursorPreviewContext.Provider>
  );
}

export function useCursorPreview() {
  const context = useContext(CursorPreviewContext);
  if (!context) {
    throw new Error('useCursorPreview must be used within CursorPreviewProvider');
  }
  return context;
}
