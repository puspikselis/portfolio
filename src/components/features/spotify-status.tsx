'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Note } from '@/components/icons/note';
import type { SpotifyData } from '@/lib/spotify';

interface SpotifyStatusProps {
  isHovered?: boolean;
}

const transition = { duration: 0.3, ease: [0.33, 1, 0.68, 1] as const };

function RollingName({ isHovered }: { isHovered: boolean }) {
  const text = 'Kristaps Krūze';
  return (
    <motion.div
      animate={isHovered ? 'hover' : 'initial'}
      className="font-semibold text-13/4 text-white"
      initial="initial"
    >
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
    </motion.div>
  );
}

export function SpotifyStatus({ isHovered = false }: SpotifyStatusProps) {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify');
        const spotifyData = await response.json();
        setData(spotifyData.isPlaying ? spotifyData : null);
      } catch (error) {
        console.error('Error fetching Spotify status:', error);
      }
    };

    fetchNowPlaying();
    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <>
        <Link href="/">
          <RollingName isHovered={isHovered} />
        </Link>
        <div className="-tracking-[0.03em] font-medium text-12/4 text-dim-gray-100">Designer</div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <Link href="/">
        <RollingName isHovered={isHovered} />
      </Link>
      <a
        aria-label={`Currently listening to ${data.title} by ${data.artist} on Spotify`}
        className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
        href={data.songUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="text-dim-gray-100">
          <Note />
        </div>
        <div className="relative max-w-20 overflow-hidden">
          <div className="-tracking-[0.03em] animate-marquee whitespace-nowrap font-medium text-12/4">
            <span className="pr-6">
              <span className="text-nobel-100">Listening to </span>
              <span className="text-dim-gray-100">
                {data.title} - {data.artist}
              </span>
            </span>
            <span className="pr-6">
              <span className="text-nobel-100">Listening to </span>
              <span className="text-dim-gray-100">
                {data.title} - {data.artist}
              </span>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
