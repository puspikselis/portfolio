'use client';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface RollingTextProps {
  text: string;
  className?: string;
}

const transition = { duration: 0.3, ease: [0.33, 1, 0.68, 1] as const };

export function RollingText({ text, className }: RollingTextProps) {
  return (
    <motion.span className={cn('inline-block', className)} initial="initial" whileHover="hover">
      {text.split('').map((char, index) => {
        const displayChar = char === ' ' ? '\u00A0' : char;
        return (
          <span
            className="relative inline-block overflow-hidden align-bottom"
            key={`${index}-${char}`}
          >
            <motion.span
              className="inline-block"
              transition={{ ...transition, delay: index * 0.015 }}
              variants={{
                hover: { filter: 'blur(4px)', opacity: 0, y: '100%' },
                initial: { filter: 'blur(0px)', opacity: 1, y: 0 },
              }}
            >
              {displayChar}
            </motion.span>
            <motion.span
              className="absolute inset-0 inline-block"
              transition={{ ...transition, delay: index * 0.015 }}
              variants={{
                hover: { filter: 'blur(0px)', opacity: 1, y: 0 },
                initial: { filter: 'blur(4px)', opacity: 0, y: '-100%' },
              }}
            >
              {displayChar}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
