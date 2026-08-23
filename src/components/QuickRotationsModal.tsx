import React from 'react';
import { X, Play, Pause, Radio, Heart } from 'lucide-react';
import { PLAYLISTS, getMyTapePlaylist } from '../data/playlists';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Playlist } from '../types';

interface QuickRotationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlaylistDetail?: (playlist: Playlist) => void;
}

export const QuickRotationsModal: React.FC<QuickRotationsModalProps> = ({
  isOpen,
  onClose,
  onSelectPlaylistDetail
}) => {
  const { activePlaylistId, switchPlaylist, isPlaying, togglePlay, favorites } = useAudioPlayer();

  if (!isOpen) return null;

  const allDisplayPlaylists: Playlist[] = [
    ...(favorites.length > 0 ? [getMyTapePlaylist(favorites)] : []),
    ...PLAYLISTS
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="saloon-glass relative w-full max-w-md rounded-3xl border-2 border-amber-900/30 bg-[#0e121a]/95 p-5 sm:p-6 text-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cream/15 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Radio className="size-4.5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-cream">
                Chai Time Rotations & Mixtapes
              </h2>
              <p className="text-[0.65rem] text-sand/70 font-mono">
                Switch 90s tape radio rotations instantly
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="saloon-icon-btn p-1 size-7"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Rotations List */}
        <div className="mt-4 max-h-[380px] overflow-y-auto space-y-2 pr-1">
          {allDisplayPlaylists.map((playlist) => {
            const isActive = activePlaylistId === playlist.id;
            const trackCount = playlist.id === 'my-tapri-tape' ? favorites.length : playlist.trackIds.length;

            return (
              <div
                key={playlist.id}
                onClick={() => {
                  if (onSelectPlaylistDetail) {
                    onClose();
                    onSelectPlaylistDetail(playlist);
                  }
                }}
                className={`saloon-glass group flex items-center justify-between rounded-2xl p-3 transition-all cursor-pointer hover:border-cream/30 ${
                  isActive ? 'border-amber-500/50 bg-cream/10 ring-1 ring-amber-500/30' : ''
                } ${playlist.isCustom ? 'border-red-500/30 bg-red-950/20' : ''}`}
              >
                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-bold text-cream truncate flex items-center gap-1.5">
                      {playlist.isCustom && <Heart className="size-3 fill-red-500 text-red-500 shrink-0" />}
                      <span>{playlist.en}</span>
                    </p>
                    {isActive && (
                      <span className="flex items-center gap-1 rounded-full bg-live/20 px-2 py-0.5 text-[0.6rem] font-semibold text-live border border-live/30 shrink-0">
                        <span className="size-1 rounded-full bg-live animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[0.65rem] text-sand/75 mt-0.5 truncate">
                    {trackCount} songs · {playlist.window}
                  </p>
                </div>

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
                  className={`saloon-chip text-xs shrink-0 py-1.5 px-3 ${isActive ? 'active' : ''} disabled:opacity-50`}
                >
                  {isActive && isPlaying ? (
                    <>
                      <Pause className="size-3" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="size-3 ml-0.5" />
                      <span>{isActive ? 'Resume' : 'Play'}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
