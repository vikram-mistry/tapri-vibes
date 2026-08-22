import React, { useState } from 'react';
import { ALL_SONGS } from '../data/songs';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Volume2, Search } from 'lucide-react';

export const SongsView: React.FC = () => {
  const { currentSong, isPlaying, playSong, togglePlay } = useAudioPlayer();
  const [filter, setFilter] = useState<'all' | 'bollywood' | 'hollywood'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSongs = ALL_SONGS.filter((s) => {
    if (filter !== 'all' && s.playlistId !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.en.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        (s.film && s.film.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 pb-36 sm:px-8 sm:pt-6">
      {/* Header */}
      <header className="mt-4 mb-6 border-b border-cream/15 pb-6">
        <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-sand/70">
          Directory
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight font-extrabold sm:text-5xl text-cream tracking-tight">
          All Songs
        </h1>
        <p className="mt-1 text-sm tracking-[0.18em] uppercase text-sand/80">
          {ALL_SONGS.length} Curated Tracks
        </p>

        {/* Filter chips & Search */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`saloon-chip ${filter === 'all' ? 'active' : ''}`}
            >
              All ({ALL_SONGS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('bollywood')}
              className={`saloon-chip ${filter === 'bollywood' ? 'active' : ''}`}
            >
              Bollywood ({ALL_SONGS.filter(s => s.playlistId === 'bollywood').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('hollywood')}
              className={`saloon-chip ${filter === 'hollywood' ? 'active' : ''}`}
            >
              Hollywood ({ALL_SONGS.filter(s => s.playlistId === 'hollywood').length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-sand/50" />
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-60 rounded-full border border-cream/20 bg-cream/5 px-8 py-1.5 text-xs text-cream placeholder-sand/40 backdrop-blur-md focus:border-cream/50 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Song list */}
      <ol className="divide-y divide-cream/10">
        {filteredSongs.map((song, idx) => {
          const isCurrent = currentSong?.id === song.id;

          return (
            <li key={song.id}>
              <button
                type="button"
                onClick={() => {
                  if (isCurrent) {
                    togglePlay();
                  } else {
                    playSong(song);
                  }
                }}
                aria-label={`Play ${song.en}`}
                className={`group flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-cream/5 px-2.5 rounded-lg ${
                  isCurrent ? 'bg-cream/10' : ''
                }`}
              >
                {/* Index / Indicator */}
                <span className="grid w-8 shrink-0 place-items-center font-mono text-[0.7rem] text-sand/50 tabular-nums">
                  {isCurrent && isPlaying ? (
                    <Volume2 className="size-4 text-live animate-pulse" aria-hidden="true" />
                  ) : (
                    <>
                      <span className="group-hover:hidden">{String(idx + 1).padStart(3, '0')}</span>
                      <Play className="hidden size-3.5 text-cream group-hover:block fill-current ml-0.5" aria-hidden="true" />
                    </>
                  )}
                </span>

                {/* Title & Info */}
                <div className="min-w-0 flex-1">
                  <p className={`font-display text-base sm:text-lg leading-snug font-semibold ${isCurrent ? 'text-cream font-bold' : 'text-cream/90'}`}>
                    {song.en}
                  </p>
                  <p className="truncate text-xs text-sand/80">
                    {song.film ? `${song.film} · ` : ''}{song.artist}
                  </p>
                </div>

                {/* Tag & Year */}
                <div className="shrink-0 text-right">
                  <span className="inline-block rounded-full bg-cream/10 px-2 py-0.5 text-[0.65rem] text-sand/80 uppercase font-mono mb-0.5">
                    {song.playlistId}
                  </span>
                  <p className="font-mono text-[0.7rem] text-sand/50 tabular-nums">{song.year}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
