const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic =
  client_id && client_secret ? Buffer.from(`${client_id}:${client_secret}`).toString('base64') : '';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const getAccessToken = async () => {
  if (!refresh_token) {
    throw new Error('Spotify refresh token is not configured');
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
}
