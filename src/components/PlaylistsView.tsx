import React from 'react';
import { Playlist } from '../types';
import { PLAYLISTS } from '../data/playlists';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, ChevronRight } from 'lucide-react';

interface PlaylistsViewProps {
  onSelectPlaylistDetail: (playlist: Playlist) => void;
  onBackToRadio: () => void;
}

export const PlaylistsView: React.FC<PlaylistsViewProps> = ({
  onSelectPlaylistDetail
}) => {
  const { activePlaylistId, switchPlaylist, isPlaying, togglePlay } = useAudioPlayer();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 pb-36 sm:px-8 sm:pt-6">
      {/* Header section in English */}
      <header className="mt-4 mb-8 border-b border-cream/15 pb-6">
        <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-sand/70">
          Rotations
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight font-extrabold sm:text-5xl text-cream tracking-tight">
          Playlists
        </h1>
        <p className="mt-1 text-sm tracking-[0.18em] uppercase text-sand/80">
          Curated Soundtracks
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/80">
          Dedicated workout rotations designed for heavy lifting, cardio sprints, and high-energy workout sessions. Select either playlist to explore all songs and start listening.
        </p>
      </header>

      {/* Playlists Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {PLAYLISTS.map((playlist) => {
          const isActive = activePlaylistId === playlist.id;

          return (
            <div
              key={playlist.id}
              onClick={() => onSelectPlaylistDetail(playlist)}
              className={`saloon-glass group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 cursor-pointer ${
                isActive ? 'border-cream/40 shadow-xl ring-1 ring-cream/20' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-sand/70">
                    {playlist.trackIds.length} songs · {playlist.window}
                  </p>
                  {isActive && (
                    <span className="flex items-center gap-1.5 rounded-full bg-live/20 px-2.5 py-0.5 text-[0.65rem] font-semibold text-live border border-live/30">
                      <span className="size-1.5 rounded-full bg-live animate-pulse" />
                      Live Now
                    </span>
                  )}
                </div>

                <h2 className="mt-3 font-display text-2xl font-bold text-cream sm:text-3xl group-hover:text-white transition-colors">
                  {playlist.en}
                </h2>
                <p className="text-xs tracking-[0.18em] uppercase text-sand/80 mt-0.5 font-mono">
                  {playlist.window}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-sand/80">
                  {playlist.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-cream/10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isActive) {
                      togglePlay();
                    } else {
                      switchPlaylist(playlist.id, true);
                    }
                  }}
                  className={`saloon-chip ${isActive ? 'active' : ''}`}
                >
                  {isActive && isPlaying ? (
                    <>
                      <Pause className="size-3.5" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 ml-0.5" />
                      <span>{isActive ? 'Resume' : 'Play Rotation'}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1 text-xs text-sand/70 group-hover:text-cream transition-colors">
                  <span>View songs ({playlist.trackIds.length})</span>
                  <ChevronRight className="size-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
