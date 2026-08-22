import { Playlist } from '../types';
import { ALL_SONGS } from './songs';

export const PLAYLISTS: Playlist[] = [
  {
    id: 'bollywood',
    slug: 'tapri-classics',
    hi: 'Tapri Classics',
    en: 'Tapri Classics',
    window: '90s Hindi Melodies · Chai Tapri Radio',
    description: 'Nostalgic 90s Bollywood evergreen songs playing round the clock — the pure vibe of sipping cutting chai at a neighbourhood stall on a rainy evening.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.filter(s => s.playlistId === 'bollywood').map(s => s.id)
  }
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://whatsapp.com/channel/0029Vb8VSzq5kg7FBQkurZ45',
  spotify: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
  ytMusic: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
  contactEmail: 'mvikram43@gmail.com'
};
