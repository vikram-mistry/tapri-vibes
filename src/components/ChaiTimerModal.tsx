import React, { useState, useEffect } from 'react';
import { X, Clock, Play, RotateCcw, Coffee } from 'lucide-react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { sfx } from '../utils/sfx';

interface ChaiTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChaiTimerModal: React.FC<ChaiTimerModalProps> = ({ isOpen, onClose }) => {
  const { togglePlay, isPlaying, setVolume, volume } = useAudioPlayer();

  const [, setSelectedMinutes] = useState<number>(25);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  // Timer Tick
  useEffect(() => {
    let timer: number | null = null;

    if (isActive && secondsLeft !== null && secondsLeft > 0) {
      timer = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            // Timer expired: Play chime and pause music
            sfx.playTimerChime();
            if (isPlaying) {
              togglePlay();
            }
            setIsActive(false);
            return 0;
          }

          // Gentle fade out in the last 15 seconds
          if (prev <= 15) {
            const fadedVol = Math.max(5, Math.round((prev / 15) * volume));
            setVolume(fadedVol);
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, secondsLeft, isPlaying, togglePlay, setVolume, volume]);

  if (!isOpen) return null;

  const startTimer = (mins: number) => {
    sfx.playCassetteClick();
    setSelectedMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsActive(true);
  };

  const cancelTimer = () => {
    sfx.playCassetteClick();
    setIsActive(false);
    setSecondsLeft(null);
  };

  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="saloon-glass relative w-full max-w-sm rounded-3xl border-2 border-amber-900/30 bg-[#0e121a]/95 p-6 text-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cream/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Clock className="size-4.5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-cream">
                Cutting Chai Timer
              </h2>
              <p className="text-[0.65rem] text-sand/70 font-mono">
                Focus session & sleep timer with audio fade
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

        {/* Active Countdown Display */}
        {isActive && secondsLeft !== null ? (
          <div className="my-6 text-center">
            <span className="font-mono text-4xl sm:text-5xl font-black text-amber-400 tabular-nums tracking-wider drop-shadow-md">
              {formatTimer(secondsLeft)}
            </span>
            <p className="mt-2 text-xs text-sand/80 flex items-center justify-center gap-1.5 font-mono">
              <Coffee className="size-3.5 text-amber-400 animate-pulse" />
              <span>Chai timer running · Audio will fade out smoothly</span>
            </p>

            <button
              type="button"
              onClick={cancelTimer}
              className="saloon-chip mt-6 inline-flex items-center gap-1.5 py-1.5 px-4 text-xs hover:border-red-500/50 hover:text-red-400"
            >
              <RotateCcw className="size-3.5" />
              <span>Cancel Timer</span>
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <p className="text-xs text-sand/80 leading-relaxed">
              Select a session duration. The music will gently fade out and chime when your time is up.
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => startTimer(15)}
                className="saloon-glass flex items-center justify-between rounded-xl p-3 text-left transition-all hover:border-amber-500/50 hover:bg-cream/5"
              >
                <div>
                  <p className="font-display text-sm font-bold text-cream">15 Mins — Ek Cutting Chai</p>
                  <p className="text-[0.65rem] text-sand/70">Quick reset & stretch break</p>
                </div>
                <Play className="size-4 text-amber-400 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => startTimer(25)}
                className="saloon-glass flex items-center justify-between rounded-xl p-3 text-left transition-all hover:border-amber-500/50 hover:bg-cream/5"
              >
                <div>
                  <p className="font-display text-sm font-bold text-cream">25 Mins — Chai Aur Samosa</p>
                  <p className="text-[0.65rem] text-sand/70">Classic Pomodoro focus block</p>
                </div>
                <Play className="size-4 text-amber-400 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => startTimer(45)}
                className="saloon-glass flex items-center justify-between rounded-xl p-3 text-left transition-all hover:border-amber-500/50 hover:bg-cream/5"
              >
                <div>
                  <p className="font-display text-sm font-bold text-cream">45 Mins — Barish Ki Lambi Tapri</p>
                  <p className="text-[0.65rem] text-sand/70">Deep coding session or sleep timer</p>
                </div>
                <Play className="size-4 text-amber-400 fill-current" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
