import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, CloudRain, Clock, CassetteTape, Radio, Heart } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/playlists';
import { sfx } from '../utils/sfx';
import { fetchGlobalLikes, incrementGlobalLikes, getUserLikedStatus, subscribeToLikesSync } from '../utils/likes';

interface BottomPlayerProps {
  onOpenAmbiance?: () => void;
  onOpenTimer?: () => void;
  onOpenRotations?: () => void;
  isCassetteMode?: boolean;
  onToggleCassetteMode?: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({
  onOpenAmbiance,
  onOpenTimer,
  onOpenRotations,
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

  // Global Likes state
  const [likeCount, setLikeCount] = useState<number>(148);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  useEffect(() => {
    setHasLiked(getUserLikedStatus());
    fetchGlobalLikes().then(count => setLikeCount(count));

    const unsubscribe = subscribeToLikesSync((count, liked) => {
      setLikeCount(count);
      if (liked) setHasLiked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);
    sfx.playCassetteClick();
    
    // Immediate optimistic update
    setHasLiked(true);
    setLikeCount(prev => prev + 1);

    try {
      const updated = await incrementGlobalLikes();
      setLikeCount(updated);
    } catch {} finally {
      setIsLiking(false);
    }
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
          
          {/* Top Floating Feature Toolbar (Above the main player) */}
          <div className="mb-2 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {onOpenRotations && (
              <button
                type="button"
                onClick={onOpenRotations}
                aria-label="Chai Time Rotations"
                title="Switch 90s tape radio rotations"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 hover:border-amber-400/60 transition-all hover:scale-105"
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
                title="Rain, Kettle & Vinyl soundscapes"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 hover:border-blue-400/60 transition-all hover:scale-105"
              >
                <CloudRain className="size-3.5 text-blue-300" />
                <span>Soundscapes</span>
              </button>
            )}

            {onOpenTimer && (
              <button
                type="button"
                onClick={onOpenTimer}
                aria-label="Cutting Chai Focus Timer"
                title="Chai Focus & Sleep timer"
                className="saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 hover:border-amber-400/60 transition-all hover:scale-105"
              >
                <Clock className="size-3.5 text-amber-300" />
                <span>Chai Timer</span>
              </button>
            )}

            {onToggleCassetteMode && (
              <button
                type="button"
                onClick={onToggleCassetteMode}
                aria-label="Toggle Retro Cassette Deck"
                title={isCassetteMode ? 'Switch to Vinyl View' : 'Switch to 90s Tape View'}
                className={`saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 transition-all hover:scale-105 ${
                  isCassetteMode ? 'active border-amber-500/60 text-amber-300' : ''
                }`}
              >
                <CassetteTape className="size-3.5" />
                <span>{isCassetteMode ? 'Vinyl View' : 'Tape Deck'}</span>
              </button>
            )}

            {/* Live Global Like Counter Button */}
            <button
              type="button"
              onClick={handleLikeClick}
              aria-label="Like Tapri Vibes"
              title="Show some love for Tapri Vibes"
              className={`saloon-chip text-xs py-1 px-2.5 sm:px-3 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer ${
                hasLiked ? 'border-red-500/60 bg-red-500/15 text-red-300' : 'hover:border-red-400/60'
              }`}
            >
              <Heart
                className={`size-3.5 transition-transform duration-200 ${
                  hasLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-red-400 group-hover:scale-110'
                }`}
              />
              <span className="font-mono text-[0.7rem] tabular-nums font-semibold">{likeCount}</span>
            </button>
          </div>

          {/* Main Floating Glassmorphic Player Card */}
          <div className="saloon-glass rounded-3xl p-3 sm:p-4 shadow-2xl border border-cream/20">
            
            {/* Top Row: Track Artwork, Metadata & Playback Controls */}
            <div className="flex items-center justify-between gap-3">
              
              {/* Left: Spinning Vinyl Disc & Song Info */}
              <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={onToggleCassetteMode}
                  title="Toggle Visual Player Mode"
                  className="relative size-11 sm:size-13 shrink-0 overflow-hidden rounded-full bg-black/60 border border-cream/30 shadow-md group cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src={currentSong?.coverUrl || `https://i.ytimg.com/vi/${currentSong?.videoId}/hqdefault.jpg`}
                    alt={currentSong?.en || 'Tapri Track'}
                    width={52}
                    height={52}
                    className="size-full object-cover animate-[spin_20s_linear_infinite]"
                    style={{
                      animationPlayState: isPlaying ? 'running' : 'paused'
                    }}
                  />
                  {/* Center Vinyl Hole */}
                  <div className="absolute inset-0 m-auto size-2.5 rounded-full bg-[#0e121a] border border-cream/50" />
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs sm:text-sm font-bold text-cream">
                    {currentSong?.en || 'Tuning into 90s Tapri…'}
                  </p>
                  <p className="truncate text-[0.65rem] sm:text-xs text-sand/75">
                    {currentSong ? `${currentSong.artist} ${currentSong.film ? `· ${currentSong.film}` : ''}` : 'Timeless evergreen melodies'}
                  </p>
                </div>
              </div>

              {/* Right: Playback Buttons & Volume */}
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous track"
                  className="saloon-icon-btn size-8 sm:size-9"
                  title="Previous track"
                >
                  <SkipBack className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={handlePlayToggle}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="saloon-play-btn size-10 sm:size-11"
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
                  className="saloon-icon-btn size-8 sm:size-9"
                  title="Next track"
                >
                  <SkipForward className="size-4" />
                </button>

                {/* Desktop Volume Slider */}
                <div className="relative hidden md:flex items-center gap-1 border-l border-cream/15 pl-2 ml-1">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="saloon-icon-btn size-8"
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
                    className="saloon-range h-1.5 w-16"
                    style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Dedicated Full-Width Seek Bar (Spans 100% width) */}
            <div className="mt-2.5 flex items-center gap-2.5 pt-1 border-t border-cream/10">
              <span className="shrink-0 font-mono text-[0.65rem] sm:text-xs text-sand/80 tabular-nums">
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

              <span className="shrink-0 font-mono text-[0.65rem] sm:text-xs text-sand/80 tabular-nums">
                {formatTime(duration || 0)}
              </span>
            </div>
          </div>

          {/* Contact link */}
          <a
            href={`mailto:${SOCIAL_LINKS.contactEmail}`}
            className="block mt-1.5 text-center font-mono text-[0.6rem] text-cream/50 transition-colors hover:text-cream/90 sm:text-xs"
          >
            contact: {SOCIAL_LINKS.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
