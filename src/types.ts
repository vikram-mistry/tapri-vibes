export interface Song {
  id: string;
  slug: string;
  hi: string;         // Title in Devanagari or stylized script
  en: string;         // Title in English
  artist: string;     // Artist / Singer
  film?: string;      // Film / Album
  year: number;       // Release Year
  duration: string;   // MM:SS
  videoId: string;    // YouTube Video ID for direct audio stream
  playlistId: 'bollywood' | 'hollywood';
  coverUrl?: string;  // Thumbnail URL
}

export interface Playlist {
  id: 'bollywood' | 'hollywood';
  slug: string;
  hi: string;
  en: string;
  window: string;     // e.g. "High BPM · Power Workout"
  description: string;
  spotifyUrl: string;
  ytMusicUrl: string;
  trackIds: string[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;       // 0 to 100
  currentTime: number;  // In seconds
  duration: number;     // In seconds
  activePlaylistId: 'bollywood' | 'hollywood';
  currentTrackIndex: number;
}
