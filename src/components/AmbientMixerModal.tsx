import React, { useState } from 'react';
import { X, CloudRain, Flame, Disc3, VolumeX } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

interface AmbientMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmbientMixerModal: React.FC<AmbientMixerModalProps> = ({ isOpen, onClose }) => {
  const [rainVol, setRainVol] = useState<number>(0);
  const [kettleVol, setKettleVol] = useState<number>(0);
  const [vinylVol, setVinylVol] = useState<number>(0);

  if (!isOpen) return null;

  const handleRain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setRainVol(val);
    soundscapes.setRainVolume(val);
  };

  const handleKettle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setKettleVol(val);
    soundscapes.setKettleVolume(val);
  };

  const handleVinyl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVinylVol(val);
    soundscapes.setVinylVolume(val);
  };

  const handleMuteAll = () => {
    setRainVol(0);
    setKettleVol(0);
    setVinylVol(0);
    soundscapes.stopAll();
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
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <CloudRain className="size-4.5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-cream">
                Tapri Soundscapes
              </h2>
              <p className="text-[0.65rem] text-sand/70 font-mono">
                Layer natural ambient sounds with your music
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

        {/* Ambient Controls */}
        <div className="mt-5 space-y-5">
          {/* Rain on Tin Roof */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-cream">
                <CloudRain className="size-4 text-blue-400" />
                Monsoon Rain on Tin Roof
              </span>
              <span className="font-mono text-[0.7rem] text-sand/70">{rainVol}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={rainVol}
              onChange={handleRain}
              className="saloon-range h-1.5 w-full cursor-pointer"
              style={{ '--progress': `${rainVol}%` } as React.CSSProperties}
            />
          </div>

          {/* Chai Kettle Simmer */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-cream">
                <Flame className="size-4 text-amber-400" />
                Tea Kettle Boiling Simmer
              </span>
              <span className="font-mono text-[0.7rem] text-sand/70">{kettleVol}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={kettleVol}
              onChange={handleKettle}
              className="saloon-range h-1.5 w-full cursor-pointer"
              style={{ '--progress': `${kettleVol}%` } as React.CSSProperties}
            />
          </div>

          {/* Vintage Vinyl Crackle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-cream">
                <Disc3 className="size-4 text-red-400" />
                Vintage Vinyl / Tape Hiss
              </span>
              <span className="font-mono text-[0.7rem] text-sand/70">{vinylVol}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={vinylVol}
              onChange={handleVinyl}
              className="saloon-range h-1.5 w-full cursor-pointer"
              style={{ '--progress': `${vinylVol}%` } as React.CSSProperties}
            />
          </div>

          {/* Bottom Action */}
          <div className="pt-2 flex items-center justify-between border-t border-cream/10">
            <span className="text-[0.65rem] text-sand/60 font-mono">
              Generates locally · 0 buffering
            </span>
            <button
              type="button"
              onClick={handleMuteAll}
              className="saloon-chip text-xs inline-flex items-center gap-1.5 py-1 px-3 hover:border-red-500/50 hover:text-red-400"
            >
              <VolumeX className="size-3.5" />
              <span>Mute Ambience</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
