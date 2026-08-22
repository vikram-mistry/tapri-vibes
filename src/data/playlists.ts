import { Playlist } from '../types';
import { ALL_SONGS } from './songs';

export const PLAYLISTS: Playlist[] = [
  {
    id: 'bollywood',
    slug: 'all-tapri-classics',
    hi: 'Tapri Classics',
    en: 'All Tapri Classics (90s)',
    window: 'Full 124 Tape Cassette Archive',
    description: 'The complete uncut catalogue of 90s Hindi evergreen songs playing round the clock — timeless melodies from old neighbourhood tea stalls.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.map(s => s.id)
  },
  {
    id: 'bollywood',
    slug: 'subah-ki-chai',
    hi: 'सुबह की चाय',
    en: 'Subah Ki Chai',
    window: '6 AM – 11 AM · Morning Calm',
    description: 'Gentle, soulful acoustic 90s melodies and soothing vocals to accompany your first hot cup of morning chai.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.slice(0, 32).map(s => s.id)
  },
  {
    id: 'bollywood',
    slug: 'dophar-ki-susti',
    hi: 'दोपहर की सुस्ती',
    en: 'Dophar Ki Susti',
    window: '11 AM – 4 PM · Mid-Day Melodies',
    description: 'Relaxing 90s romantic duets and melodious radio tunes to beat the afternoon work slump.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.slice(32, 64).map(s => s.id)
  },
  {
    id: 'bollywood',
    slug: 'shaam-ki-cutting',
    hi: 'शाम की कटिंग',
    en: 'Shaam Ki Cutting',
    window: '4 PM – 9 PM · Peak Tapri Energy',
    description: 'High-octane 90s street hits, foot-tapping beats, and iconic dance tracks for evening chai gatherings.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.slice(64, 96).map(s => s.id)
  },
  {
    id: 'bollywood',
    slug: 'raat-ki-tapri',
    hi: 'रात की टपरी',
    en: 'Raat Ki Tapri',
    window: '9 PM – 4 AM · Late Night Ghazals',
    description: 'Nostalgic late-night ballads, ghazals, and acoustic nostalgia under the cool midnight breeze.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.slice(96).map(s => s.id)
  }
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://whatsapp.com/channel/0029Vb8VSzq5kg7FBQkurZ45',
  spotify: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
  ytMusic: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
  contactEmail: 'mvikram43@gmail.com'
};
