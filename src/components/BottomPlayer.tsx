import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, CloudRain, Clock, CassetteTape } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/playlists';
import { sfx } from '../utils/sfx';

interface BottomPlayerProps {
  onOpenAmbiance?: () => void;
  onOpenTimer?: () => void;
  isCassetteMode?: boolean;
  onToggleCassetteMode?: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({
  onOpenAmbiance,
  onOpenTimer,
  isCassetteMode = false,
  onToggleCassetteMode
}) => {
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

  const handlePlayToggle = () => {
    sfx.playCassetteClick();
    togglePlay();
  };

  const handleNext = () => {
    sfx.playTapeWhirr();
    playNext();
  };

  const handlePrev = () => {
    sfx.playTapeWhirr();
    playPrevious();
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto">
        <div className="relative z-30 mx-auto mb-[max(1rem,env(safe-area-inset-bottom))] w-full max-w-xl px-3 sm:mb-8">
          <div className="saloon-glass mb-2 flex items-center gap-2.5 rounded-full p-2 pr-3 sm:gap-3 sm:p-2.5 sm:pr-4">
            {/* Spinning Vinyl Album Art / Cassette Toggle */}
            <button
              type="button"
              onClick={onToggleCassetteMode}
              title={isCassetteMode ? 'Switch to Vinyl' : 'Switch to Cassette Tape'}
              className="relative size-12 shrink-0 overflow-hidden rounded-full sm:size-14 bg-black/50 border border-cream/25 shadow-md group cursor-pointer transition-transform hover:scale-105"
            >
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
            </button>

            {/* Song Meta & Seek Bar */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs sm:text-sm font-semibold text-cream">
                {currentSong?.en || 'Tuning in…'}
              </p>
              <p className="truncate text-[0.65rem] sm:text-xs text-cream/60">
                {currentSong ? `${currentSong.artist} ${currentSong.film ? `· ${currentSong.film}` : ''}` : 'Tapri Vibes radio'}
              </p>

              {/* Progress Slider */}
              <div className="mt-1 flex items-center gap-2">
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

            {/* Playback Controls with 90s SFX */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous track"
                className="saloon-icon-btn p-1.5"
                title="Previous track"
              >
                <SkipBack className="size-3.5 sm:size-4" />
              </button>

              <button
                type="button"
                onClick={handlePlayToggle}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="saloon-play-btn size-9 sm:size-10"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="size-4 sm:size-5 fill-current" />
                ) : (
                  <Play className="size-4 sm:size-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next track"
                className="saloon-icon-btn p-1.5"
                title="Next track"
              >
                <SkipForward className="size-3.5 sm:size-4" />
              </button>
            </div>

            {/* Feature Tools (Ambiance & Timer) */}
            <div className="flex shrink-0 items-center gap-1 border-l border-cream/15 pl-1.5 sm:gap-1.5">
              {onOpenAmbiance && (
                <button
                  type="button"
                  onClick={onOpenAmbiance}
                  aria-label="Ambient Soundscapes Mixer"
                  title="Rain, Kettle & Vinyl soundscapes"
                  className="saloon-icon-btn p-1.5"
                >
                  <CloudRain className="size-3.5 sm:size-4 text-blue-300" />
                </button>
              )}

              {onOpenTimer && (
                <button
                  type="button"
                  onClick={onOpenTimer}
                  aria-label="Cutting Chai Focus Timer"
                  title="Chai Focus & Sleep timer"
                  className="saloon-icon-btn p-1.5"
                >
                  <Clock className="size-3.5 sm:size-4 text-amber-300" />
                </button>
              )}

              {onToggleCassetteMode && (
                <button
                  type="button"
                  onClick={onToggleCassetteMode}
                  aria-label="Toggle Retro Cassette Deck"
                  title={isCassetteMode ? 'Hide Cassette Deck' : 'Show 90s Cassette Deck'}
                  className={`saloon-icon-btn p-1.5 ${isCassetteMode ? 'text-amber-400 border-amber-500/50' : ''}`}
                >
                  <CassetteTape className="size-3.5 sm:size-4" />
                </button>
              )}

              {/* Volume */}
              <div className="relative hidden sm:flex items-center gap-1">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="saloon-icon-btn p-1.5"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-3.5 text-cream/70" />
                  ) : volume < 50 ? (
                    <Volume1 className="size-3.5" />
                  ) : (
                    <Volume2 className="size-3.5" />
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
                  className="saloon-range h-1 w-14"
                  style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* Contact link */}
          <a
            href={`mailto:${SOCIAL_LINKS.contactEmail}`}
            className="block text-center font-mono text-[0.6rem] text-cream/50 transition-colors hover:text-cream/90 sm:text-xs"
          >
            contact: {SOCIAL_LINKS.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
