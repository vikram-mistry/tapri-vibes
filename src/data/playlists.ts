import { Playlist } from '../types';
import { ALL_SONGS } from './songs';

export const PLAYLISTS: Playlist[] = [
  {
    id: 'bollywood',
    slug: 'bollywood-workout',
    hi: 'Bollywood Workout',
    en: 'Bollywood Workout',
    window: 'High Energy · Desi Pump',
    description: 'High-octane Hindi cinema anthems, battle cries, and timeless high-energy classics to power your heaviest sets and cardio sessions.',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdOEFt9ZX0dh',
    ytMusicUrl: 'https://music.youtube.com/watch?v=8afBXZawfQw&list=PL3-SrrJ3xkmRLwZ8B9Z1h3K5WpT7iN8s1',
    trackIds: ALL_SONGS.filter(s => s.playlistId === 'bollywood').map(s => s.id)
  },
  {
    id: 'hollywood',
    slug: 'hollywood-workout',
    hi: 'Hollywood Workout',
    en: 'Hollywood Workout',
    window: 'Beast Mode · Hip-Hop & Rock',
    description: 'The world’s most relentless hip-hop, electronic, and rock workout tracks to fuel cardio sprints, HIIT, and iron sessions.',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLw-VjHDlEOgs658kAcoGDqm6MTVTduDPE',
    trackIds: ALL_SONGS.filter(s => s.playlistId === 'hollywood').map(s => s.id)
  }
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://whatsapp.com/channel/0029Vb8VSzq5kg7FBQkurZ45',
  spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXdOEFt9ZX0dh',
  ytMusic: 'https://music.youtube.com/watch?v=8afBXZawfQw&list=PL3-SrrJ3xkmRLwZ8B9Z1h3K5WpT7iN8s1',
  contactEmail: 'mvikram43@gmail.com'
};
