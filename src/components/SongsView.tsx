import React, { useState } from 'react';
import { ALL_SONGS } from '../data/songs';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Volume2, Search, Heart, Send } from 'lucide-react';
import { Song } from '../types';

interface SongsViewProps {
  onOpenDedication?: (song: Song) => void;
}

export const SongsView: React.FC<SongsViewProps> = ({ onOpenDedication }) => {
  const { currentSong, isPlaying, playSong, togglePlay, favorites, toggleFavorite, isFavorite } = useAudioPlayer();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const visibleSongs = activeTab === 'favorites'
    ? ALL_SONGS.filter(s => favorites.includes(s.id))
    : ALL_SONGS;

  const filteredSongs = visibleSongs.filter((s) => {
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
          124 Evergreen 90s Cassette Tracks
        </p>

        {/* Directory Tabs: All vs My Tapri Tape */}
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`saloon-chip text-xs py-1.5 px-3.5 ${activeTab === 'all' ? 'active' : ''}`}
          >
            All Tracks ({ALL_SONGS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`saloon-chip text-xs py-1.5 px-3.5 flex items-center gap-1.5 ${
              activeTab === 'favorites' ? 'active border-red-500/50 text-red-300' : 'text-sand/80'
            }`}
          >
            <Heart className={`size-3 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            <span>My Tapri Tape ({favorites.length})</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs text-sand/70">
            Showing {filteredSongs.length} tracks
          </span>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-sand/50" />
            <input
              type="text"
              placeholder="Search 90s songs, singers, movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72 rounded-full border border-cream/20 bg-cream/5 px-8 py-1.5 text-xs text-cream placeholder-sand/40 backdrop-blur-md focus:border-cream/50 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Empty State for Favorites */}
      {activeTab === 'favorites' && filteredSongs.length === 0 && (
        <div className="text-center py-12 saloon-glass rounded-2xl p-6 my-4 border border-cream/15">
          <Heart className="size-10 text-red-400/60 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-cream">
            Your Tapri Tape is Empty
          </h3>
          <p className="text-xs text-sand/70 mt-1 max-w-sm mx-auto">
            Click the heart icon beside any 90s track to record your personal cassette mixtape!
          </p>
        </div>
      )}

      {/* Song list */}
      <ol className="divide-y divide-cream/10">
        {filteredSongs.map((song, idx) => {
          const isCurrent = currentSong?.id === song.id;
          const isFav = isFavorite(song.id);

          return (
            <li key={song.id} className="group">
              <div
                className={`flex w-full items-center justify-between gap-2 py-2.5 px-2.5 rounded-xl transition-colors hover:bg-cream/5 cursor-pointer ${
                  isCurrent ? 'bg-cream/10 border border-cream/20' : ''
                }`}
                onClick={() => {
                  if (isCurrent) {
                    togglePlay();
                  } else {
                    playSong(song, activeTab === 'favorites' ? 'my-tapri-tape' : undefined);
                  }
                }}
              >
                {/* Left: Index / Play Icon & Track Details */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="grid w-7 shrink-0 place-items-center font-mono text-[0.7rem] text-sand/50 tabular-nums">
                    {isCurrent && isPlaying ? (
                      <Volume2 className="size-4 text-live animate-pulse" aria-hidden="true" />
                    ) : (
                      <>
                        <span className="group-hover:hidden">{String(idx + 1).padStart(2, '0')}</span>
                        <Play className="hidden size-3.5 text-cream group-hover:block fill-current ml-0.5" aria-hidden="true" />
                      </>
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className={`font-display text-sm sm:text-base leading-snug font-semibold truncate ${isCurrent ? 'text-cream font-bold' : 'text-cream/90'}`}>
                      {song.en}
                    </p>
                    <p className="truncate text-xs text-sand/70 mt-0.5">
                      {song.film ? `${song.film} · ` : ''}{song.artist}
                    </p>
                  </div>
                </div>

                {/* Right: Favorite, Dedicate & Duration */}
                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Favorite Button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(song.id)}
                    title={isFav ? 'Remove from My Tapri Tape' : 'Add to My Tapri Tape ❤️'}
                    className="saloon-icon-btn size-7 p-1 text-sand/60 hover:text-red-400"
                  >
                    <Heart
                      className={`size-3.5 transition-colors ${
                        isFav ? 'fill-red-500 text-red-500' : 'text-sand/50 group-hover:text-sand/90'
                      }`}
                    />
                  </button>

                  {/* Dedicate Postcard Button */}
                  {onOpenDedication && (
                    <button
                      type="button"
                      onClick={() => onOpenDedication(song)}
                      title="Send as Chai Postcard on WhatsApp"
                      className="saloon-icon-btn size-7 p-1 text-sand/50 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Send className="size-3.5" />
                    </button>
                  )}

                  <span className="font-mono text-[0.65rem] text-sand/50 hidden sm:inline w-10 text-right">
                    {song.duration}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
