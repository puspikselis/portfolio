import { NextResponse } from 'next/server';

import { getNowPlaying, type SpotifyData } from '@/lib/spotify';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ');
    const songUrl = song.item.external_urls.spotify;

    const data: SpotifyData = {
      artist,
      isPlaying,
      songUrl,
      title,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ isPlaying: false });
  }
}
