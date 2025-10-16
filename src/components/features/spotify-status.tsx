'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Note } from '@/components/icons/note';
import type { SpotifyData } from '@/lib/spotify';

export function SpotifyStatus() {
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
        <Link className="transition-opacity hover:opacity-80" href="/">
          <div className="font-semibold text-13/4 text-white">Kristaps Krūze</div>
        </Link>
        <div className="-tracking-[0.03em] font-medium text-12/4 text-dim-gray-100">Designer</div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-0.5">
      <Link className="transition-opacity hover:opacity-80" href="/">
        <div className="font-semibold text-13/4 text-white">Kristaps Krūze</div>
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
