'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const transition = { duration: 0.25, ease: [0.33, 1, 0.68, 1] as const };

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  if (!text) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.span key={text} className={className}>
        {text.split('').map((char, index) => {
          const displayChar = char === ' ' ? '\u00A0' : char;
          return (
            <span
              className="relative inline-block overflow-hidden align-bottom"
              key={`${index}-${char}`}
            >
              <motion.span
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                className="inline-block"
                exit={{ filter: 'blur(4px)', opacity: 0, y: '50%' }}
                initial={
                  isFirstRender
                    ? { filter: 'blur(0px)', opacity: 1, y: 0 }
                    : { filter: 'blur(4px)', opacity: 0, y: '-100%' }
                }
                transition={{ ...transition, delay: index * 0.008 }}
              >
                {displayChar}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </AnimatePresence>
  );
}

