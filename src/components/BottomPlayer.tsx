import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1 } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/playlists';

export const BottomPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
    toggleMute
  } = useAudioPlayer();

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    seekTo(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto">
        <div className="relative z-30 mx-auto mb-[max(1.25rem,env(safe-area-inset-bottom))] w-full max-w-xl px-3 sm:mb-10">
          <div className="saloon-glass mb-3 flex items-center gap-3 rounded-full p-2 pr-3 sm:gap-4 sm:p-3 sm:pr-5">
            {/* Spinning Vinyl Album Art */}
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full sm:size-14 bg-black/50 border border-cream/25 shadow-md">
              <img
                src={currentSong?.coverUrl || `https://i.ytimg.com/vi/${currentSong?.videoId}/hqdefault.jpg`}
                alt={currentSong?.en || 'Tapri Track'}
                width={56}
                height={56}
                className="size-full object-cover animate-[spin_20s_linear_infinite]"
                style={{
                  animationPlayState: isPlaying ? 'running' : 'paused'
                }}
              />
              {/* Center Vinyl Spindle Hole Effect */}
              <div className="absolute inset-0 m-auto size-2.5 rounded-full bg-shade border border-cream/40" />
            </div>

            {/* Song Meta & Seek Bar */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream sm:text-base">
                {currentSong?.en || 'Tuning in…'}
              </p>
              <p className="truncate text-xs text-cream/60">
                {currentSong ? `${currentSong.artist} ${currentSong.film ? `· ${currentSong.film}` : ''}` : 'Tapri Vibes radio'}
              </p>

              {/* Progress Slider */}
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek track"
                  className="saloon-range h-1 w-full"
                  style={{ '--progress': `${progressPercent}%` } as React.CSSProperties}
                />
                <span className="shrink-0 font-mono text-[0.6rem] text-cream/60 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={playPrevious}
                aria-label="Previous track"
                className="saloon-icon-btn"
                title="Previous track"
              >
                <SkipBack className="size-4" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="saloon-play-btn"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="size-5 fill-current" />
                ) : (
                  <Play className="size-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={playNext}
                aria-label="Next track"
                className="saloon-icon-btn"
                title="Next track"
              >
                <SkipForward className="size-4" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="relative flex shrink-0 items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="saloon-icon-btn"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="size-4 text-cream/70" />
                ) : volume < 50 ? (
                  <Volume1 className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                aria-label="Volume"
                className="saloon-range hidden h-1 w-16 sm:block"
                style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Contact link */}
          <a
            href={`mailto:${SOCIAL_LINKS.contactEmail}`}
            className="block text-center font-mono text-[0.65rem] text-cream/50 transition-colors hover:text-cream/90 sm:text-xs"
          >
            contact: {SOCIAL_LINKS.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
