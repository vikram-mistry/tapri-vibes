export type WeatherMode = 'monsoon' | 'winter-mist' | 'sunset-glow';

export interface Song {
  id: string;
  slug: string;
  hi: string;         // Title in English / stylized
  en: string;         // Title in English
  artist: string;     // Artist / Singer
  film?: string;      // Film / Album
  year: number;       // Release Year
  duration: string;   // MM:SS
  videoId: string;    // YouTube Video ID for direct audio stream
  playlistId: string;
  coverUrl?: string;  // Thumbnail URL
}

export interface Playlist {
  id: string;
  slug: string;
  hi: string;
  en: string;
  window: string;     // e.g. "6 AM – 11 AM · Morning Calm"
  description: string;
  spotifyUrl: string;
  ytMusicUrl: string;
  trackIds: string[];
  isCustom?: boolean;
}

export interface PlayerState {
  ready: boolean;
  isPlaying: boolean;
  muted: boolean;
  volume: number;       // 0 to 100
  currentTime: number;  // In seconds
  duration: number;     // In seconds
}
