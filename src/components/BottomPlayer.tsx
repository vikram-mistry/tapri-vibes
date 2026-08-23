import React, { useState } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, CloudRain, Clock, Radio, Heart, Shuffle, Send } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/playlists';
import { sfx } from '../utils/sfx';

interface BottomPlayerProps {
  onOpenAmbiance?: () => void;
  onOpenTimer?: () => void;
  onOpenRotations?: () => void;
  onOpenSharePostcard?: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({
  onOpenAmbiance,
  onOpenTimer,
  onOpenRotations,
  onOpenSharePostcard
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
    toggleMute,
    toggleFavorite,
    isFavorite,
    isShuffled,
    toggleShuffle
  } = useAudioPlayer();

  const [showMobileVolume, setShowMobileVolume] = useState<boolean>(false);
  const [shuffleToast, setShuffleToast] = useState<string | null>(null);

  const isCurrentFav = currentSong ? isFavorite(currentSong.id) : false;

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentSong) return;
    sfx.playCassetteClick();
    toggleFavorite(currentSong.id);
  };

  const handleShuffleToggle = () => {
    sfx.playCassetteClick();
    const nextState = !isShuffled;
    toggleShuffle();
    setShuffleToast(nextState ? '🔀 Shuffle is ON (Queue Randomized)' : '🔁 Shuffle is OFF (Normal Order)');
    setTimeout(() => setShuffleToast(null), 2500);
  };

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
        <div className="relative z-30 mx-auto mb-[max(0.75rem,env(safe-area-inset-bottom))] w-full max-w-2xl px-3 sm:mb-6">
          
          {/* Small Desktop Hotkey Indicator Banner */}
          <div className="hidden sm:flex items-center justify-center gap-2 mb-1 text-[0.62rem] text-sand/65 font-mono select-none">
            <span>⌨️ Hotkeys:</span>
            <span><strong className="text-cream">Space</strong> (Play)</span>
            <span>·</span>
            <span><strong className="text-cream">M</strong> (Mute)</span>
            <span>·</span>
            <span><strong className="text-cream">←/→</strong> (Skip)</span>
            <span>·</span>
            <span><strong className="text-cream">R</strong> (Rotations)</span>
            <span>·</span>
            <span><strong className="text-cream">S</strong> (Atmosphere)</span>
          </div>

          {/* Top Floating Feature Toolbar (Above the main player) */}
          <div className="mb-2 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {onOpenRotations && (
              <button
                type="button"
                onClick={onOpenRotations}
                aria-label="Chai Time Rotations"
                title="Switch 90s tape radio rotations"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 hover:border-amber-400/60 transition-all hover:scale-105 cursor-pointer bg-black/40 backdrop-blur-md"
              >
                <Radio className="size-3.5 text-amber-300" />
                <span>Rotations</span>
              </button>
            )}

            {onOpenAmbiance && (
              <button
                type="button"
                onClick={onOpenAmbiance}
                aria-label="Ambient Soundscapes Mixer"
                title="Monsoon rain on tin roof & weather"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 hover:border-blue-400/60 transition-all hover:scale-105 cursor-pointer bg-black/40 backdrop-blur-md"
              >
                <CloudRain className="size-3.5 text-blue-300" />
                <span>Atmosphere</span>
              </button>
            )}

            {onOpenTimer && (
              <button
                type="button"
                onClick={onOpenTimer}
                aria-label="Cutting Chai Focus Timer"
                title="Chai Focus & Sleep timer"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 hover:border-amber-400/60 transition-all hover:scale-105 cursor-pointer bg-black/40 backdrop-blur-md"
              >
                <Clock className="size-3.5 text-amber-300" />
                <span>Chai Timer</span>
              </button>
            )}

            {/* Dedicate Song Postcard Button */}
            {onOpenSharePostcard && (
              <button
                type="button"
                onClick={onOpenSharePostcard}
                aria-label="Send Chai Postcard"
                title="Dedicate this song on WhatsApp"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 text-emerald-400 hover:border-emerald-500/60 transition-all hover:scale-105 cursor-pointer bg-black/40 backdrop-blur-md"
              >
                <Send className="size-3.5" />
                <span>Dedicate</span>
              </button>
            )}
          </div>

          {/* Main Floating 75% Transparent Glassmorphic Player Card */}
          <div className="rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/20 bg-black/25 sm:bg-[#0e121a]/30 backdrop-blur-xl relative">
            
            {/* Shuffle Toast Notification */}
            {shuffleToast && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-amber-500 px-3 py-1 text-xs font-bold text-shade shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 border border-amber-300 z-50">
                {shuffleToast}
              </div>
            )}

            {/* Mobile Expandable Volume Popover */}
            {showMobileVolume && (
              <div className="md:hidden absolute -top-12 right-4 rounded-2xl px-3 py-1.5 flex items-center gap-2 border border-cream/20 bg-black/80 backdrop-blur-lg shadow-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                <span className="text-[0.65rem] font-mono text-sand/80 font-bold">{isMuted ? 0 : volume}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  aria-label="Volume"
                  className="saloon-range h-1.5 w-24 cursor-pointer"
                  style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
                />
              </div>
            )}

            {/* Top Row: Track Artwork, Metadata & Playback Controls */}
            <div className="flex items-center justify-between gap-2.5 sm:gap-3">
              
              {/* Left: Spinning Vinyl Disc & Song Info (100% Solid & Non-transparent) */}
              <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                <div className="relative size-10 sm:size-12 shrink-0 overflow-hidden rounded-full bg-black border-2 border-cream/40 shadow-lg">
                  <img
                    src={currentSong?.coverUrl || `https://i.ytimg.com/vi/${currentSong?.videoId}/hqdefault.jpg`}
                    alt={currentSong?.en || 'Tapri Track'}
                    width={48}
                    height={48}
                    className="size-full object-cover animate-[spin_20s_linear_infinite]"
                    style={{
                      animationPlayState: isPlaying ? 'running' : 'paused'
                    }}
                  />
                  {/* Center Vinyl Hole */}
                  <div className="absolute inset-0 m-auto size-2 rounded-full bg-[#0e121a] border border-cream/60" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs sm:text-sm font-bold text-cream drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {currentSong?.en || 'Tuning into 90s Tapri…'}
                    </p>
                    {/* Heart to Favorite Current Track */}
                    {currentSong && (
                      <button
                        type="button"
                        onClick={handleToggleFav}
                        title={isCurrentFav ? 'Remove from My Tapri Tape' : 'Add to My Tapri Tape ❤️'}
                        className="saloon-icon-btn size-5 p-0.5 shrink-0 text-sand/70 hover:text-red-400 cursor-pointer"
                      >
                        <Heart
                          className={`size-3.5 transition-colors ${
                            isCurrentFav ? 'fill-red-500 text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]' : 'hover:text-red-400'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  <p className="truncate text-[0.65rem] sm:text-xs text-sand font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {currentSong ? `${currentSong.artist} ${currentSong.film ? `· ${currentSong.film}` : ''}` : 'Timeless evergreen melodies'}
                  </p>
                </div>
              </div>

              {/* Right: Playback Buttons & Volume (100% Solid & Crisp Controls) */}
              <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                {/* Shuffle Button (Enhanced with clear active state & toast) */}
                <button
                  type="button"
                  onClick={handleShuffleToggle}
                  aria-label="Toggle Shuffle"
                  title={isShuffled ? 'Shuffle is ON' : 'Shuffle is OFF'}
                  className={`size-7 sm:size-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    isShuffled
                      ? 'bg-amber-500 text-shade font-bold border-amber-300 ring-2 ring-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-105'
                      : 'bg-black/50 text-sand/80 border-cream/20 hover:text-cream hover:border-cream/40'
                  }`}
                >
                  <Shuffle className="size-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous track"
                  className="saloon-icon-btn size-8 sm:size-9 bg-black/50 border-cream/20"
                  title="Previous track"
                >
                  <SkipBack className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={handlePlayToggle}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="saloon-play-btn size-10 sm:size-11 shadow-lg"
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
                  onClick={handleNext}
                  aria-label="Next track"
                  className="saloon-icon-btn size-8 sm:size-9 bg-black/50 border-cream/20"
                  title="Next track"
                >
                  <SkipForward className="size-4" />
                </button>

                {/* Volume Controller (Both Desktop and Mobile) */}
                <div className="relative flex items-center gap-1 border-l border-cream/20 pl-1.5 ml-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setShowMobileVolume(!showMobileVolume);
                      } else {
                        toggleMute();
                      }
                    }}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="saloon-icon-btn size-7 sm:size-8 bg-black/50 border-cream/20"
                    title={isMuted ? 'Unmute' : 'Mute / Adjust Volume'}
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
                    className="saloon-range h-1.5 w-14 hidden md:inline-block cursor-pointer"
                    style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Dedicated Full-Width Seek Bar (100% Solid & Crisp) */}
            <div className="mt-2 flex items-center gap-2.5 pt-1.5 border-t border-cream/15">
              <span className="shrink-0 font-mono text-[0.65rem] sm:text-xs text-sand font-bold tabular-nums drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 flex items-center py-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.5}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek track"
                  className="saloon-range w-full cursor-pointer"
                  style={{ '--progress': `${progressPercent}%` } as React.CSSProperties}
                />
              </div>

              <span className="shrink-0 font-mono text-[0.65rem] sm:text-xs text-sand font-bold tabular-nums drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {formatTime(duration || 0)}
              </span>
            </div>
          </div>

          {/* Contact link */}
          <a
            href={`mailto:${SOCIAL_LINKS.contactEmail}`}
            className="block mt-1 text-center font-mono text-[0.6rem] text-cream/60 transition-colors hover:text-cream sm:text-xs drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
          >
            contact: {SOCIAL_LINKS.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
