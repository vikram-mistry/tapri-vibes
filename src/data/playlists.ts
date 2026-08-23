import { Playlist } from '../types';
import { ALL_SONGS } from './songs';

export const PLAYLISTS: Playlist[] = [
  {
    id: 'all-tapri-classics',
    slug: 'all-tapri-classics',
    hi: 'Tapri Classics',
    en: 'All Tapri Classics (90s)',
    window: 'Full 124 Tape Archive',
    description: 'The complete uncut catalogue of 124 timeless 90s Bollywood cassettes playing round the clock.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: ALL_SONGS.map(s => s.id)
  },
  {
    id: 'subah-ki-chai',
    slug: 'subah-ki-chai',
    hi: 'Subah Ki Chai',
    en: 'Subah Ki Chai',
    window: '6 AM – 11 AM · Morning Calm',
    description: 'Gentle, soulful acoustic 90s melodies and soothing vocals to accompany your first hot cup of morning tea.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: [
      'tapri-1', 'tapri-2', 'tapri-3', 'tapri-6', 'tapri-7', 'tapri-8', 'tapri-9',
      'tapri-11', 'tapri-12', 'tapri-14', 'tapri-15', 'tapri-18', 'tapri-20',
      'tapri-22', 'tapri-24', 'tapri-27', 'tapri-30', 'tapri-34', 'tapri-38',
      'tapri-42', 'tapri-45', 'tapri-48', 'tapri-52', 'tapri-56', 'tapri-60'
    ]
  },
  {
    id: 'dophar-ki-susti',
    slug: 'dophar-ki-susti',
    hi: 'Dophar Ki Susti',
    en: 'Dophar Ki Susti',
    window: '11 AM – 4 PM · Mid-Day Romance',
    description: 'Relaxing 90s romantic duets and melodious radio tunes to beat the afternoon work slump.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: [
      'tapri-10', 'tapri-13', 'tapri-16', 'tapri-17', 'tapri-19', 'tapri-21',
      'tapri-23', 'tapri-25', 'tapri-26', 'tapri-28', 'tapri-29', 'tapri-31',
      'tapri-32', 'tapri-33', 'tapri-35', 'tapri-36', 'tapri-37', 'tapri-39',
      'tapri-40', 'tapri-41', 'tapri-43', 'tapri-44', 'tapri-46', 'tapri-47',
      'tapri-127'
    ]
  },
  {
    id: 'shaam-ki-cutting',
    slug: 'shaam-ki-cutting',
    hi: 'Shaam Ki Cutting',
    en: 'Shaam Ki Cutting',
    window: '4 PM – 9 PM · Peak Tapri Energy',
    description: 'High-octane 90s street hits, foot-tapping beats, and iconic dance tracks for evening chai gatherings.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: [
      'tapri-4', 'tapri-5', 'tapri-49', 'tapri-50', 'tapri-51', 'tapri-53',
      'tapri-54', 'tapri-55', 'tapri-57', 'tapri-58', 'tapri-59', 'tapri-61',
      'tapri-62', 'tapri-63', 'tapri-64', 'tapri-65', 'tapri-66', 'tapri-67',
      'tapri-68', 'tapri-69', 'tapri-70', 'tapri-71', 'tapri-72', 'tapri-73'
    ]
  },
  {
    id: 'raat-ki-tapri',
    slug: 'raat-ki-tapri',
    hi: 'Raat Ki Tapri',
    en: 'Raat Ki Tapri',
    window: '9 PM – 4 AM · Late Night Ghazals',
    description: 'Nostalgic late-night ballads, ghazals, and acoustic nostalgia under the cool midnight breeze.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: [
      'tapri-1', 'tapri-74', 'tapri-75', 'tapri-76', 'tapri-77', 'tapri-78',
      'tapri-79', 'tapri-80', 'tapri-81', 'tapri-82', 'tapri-83', 'tapri-84',
      'tapri-85', 'tapri-86', 'tapri-87', 'tapri-88', 'tapri-89', 'tapri-90',
      'tapri-91', 'tapri-92', 'tapri-93', 'tapri-94', 'tapri-95', 'tapri-96'
    ]
  }
];

export function getMyTapePlaylist(favoriteTrackIds: string[]): Playlist {
  return {
    id: 'my-tapri-tape',
    slug: 'my-tapri-tape',
    hi: 'My Tapri Tape',
    en: 'My Tapri Tape ❤️',
    window: 'Your Personal Mixtape',
    description: 'Your hand-picked 90s favourites recorded onto a custom cassette. Click the heart on any song to add or remove it.',
    spotifyUrl: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
    ytMusicUrl: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
    trackIds: favoriteTrackIds,
    isCustom: true
  };
}

export const SOCIAL_LINKS = {
  whatsapp: 'https://whatsapp.com/channel/0029Vb8VSzq5kg7FBQkurZ45',
  spotify: 'https://open.spotify.com/playlist/2AVjI8Z57bqMJVtU3V9X1Q',
  ytMusic: 'https://music.youtube.com/playlist?list=PLTJ1PnzCWyFw',
  contactEmail: 'mvikram43@gmail.com'
};
