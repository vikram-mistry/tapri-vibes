import React from 'react';
import { Playlist } from '../types';
import { PLAYLISTS, getMyTapePlaylist } from '../data/playlists';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, ChevronRight, Heart } from 'lucide-react';

interface PlaylistsViewProps {
  onSelectPlaylistDetail: (playlist: Playlist) => void;
  onBackToRadio: () => void;
}

export const PlaylistsView: React.FC<PlaylistsViewProps> = ({
  onSelectPlaylistDetail
}) => {
  const { activePlaylistId, switchPlaylist, isPlaying, togglePlay, favorites } = useAudioPlayer();

  const allDisplayPlaylists: Playlist[] = [
    ...(favorites.length > 0 ? [getMyTapePlaylist(favorites)] : []),
    ...PLAYLISTS
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 pb-36 sm:px-8 sm:pt-6">
      {/* Header section */}
      <header className="mt-4 mb-8 border-b border-cream/15 pb-6">
        <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-sand/70">
          Chai Time Rotations & Mixtapes
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight font-extrabold sm:text-5xl text-cream tracking-tight">
          Playlists
        </h1>
        <p className="mt-1 text-sm tracking-[0.18em] uppercase text-sand/80">
          Curated Soundtracks
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/80">
          Evergreen 90s Bollywood cassettes playing round the clock — timeless melodies from old neighbourhood tea stalls and roadside corners.
        </p>
      </header>

      {/* Playlists Grid */}
      <div className="grid gap-4 sm:grid-cols-1">
        {allDisplayPlaylists.map((playlist) => {
          const isActive = activePlaylistId === playlist.id;
          const trackCount = playlist.id === 'my-tapri-tape' ? favorites.length : playlist.trackIds.length;

          return (
            <div
              key={playlist.id}
              onClick={() => onSelectPlaylistDetail(playlist)}
              className={`saloon-glass group relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 cursor-pointer ${
                isActive ? 'border-cream/40 shadow-xl ring-1 ring-cream/20' : ''
              } ${playlist.isCustom ? 'border-red-500/40 bg-gradient-to-br from-red-950/20 to-black/40' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-sand/70 flex items-center gap-1.5">
                    {playlist.isCustom && <Heart className="size-3 fill-red-500 text-red-500" />}
                    <span>{trackCount} songs · {playlist.window}</span>
                  </p>
                  {isActive && (
                    <span className="flex items-center gap-1.5 rounded-full bg-live/20 px-2.5 py-0.5 text-[0.65rem] font-semibold text-live border border-live/30">
                      <span className="size-1.5 rounded-full bg-live animate-pulse" />
                      Active Queue
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
                  disabled={trackCount === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isActive) {
                      togglePlay();
                    } else {
                      switchPlaylist(playlist.id, true);
                    }
                  }}
                  className={`saloon-chip ${isActive ? 'active' : ''} disabled:opacity-50`}
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

                <span className="flex items-center text-xs font-mono text-sand/70 group-hover:text-cream transition-colors">
                  <span>View Tracklist</span>
                  <ChevronRight className="size-4 ml-0.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
