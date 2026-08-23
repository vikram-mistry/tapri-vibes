import React, { useState } from 'react';
import { X, CloudRain, VolumeX, Sun, CloudFog } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';
import { WeatherMode } from '../types';

interface AmbientMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  weatherMode?: WeatherMode;
  onSelectWeatherMode?: (mode: WeatherMode) => void;
}

export const AmbientMixerModal: React.FC<AmbientMixerModalProps> = ({
  isOpen,
  onClose,
  weatherMode = 'monsoon',
  onSelectWeatherMode
}) => {
  const [rainVol, setRainVol] = useState<number>(0);

  if (!isOpen) return null;

  const handleRain = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setRainVol(val);
    soundscapes.setRainVolume(val);
  };

  const handleMuteAll = () => {
    setRainVol(0);
    soundscapes.stopAll();
  };

  const weatherOptions: Array<{ id: WeatherMode; label: string; icon: React.ReactNode; desc: string }> = [
    {
      id: 'monsoon',
      label: 'Monsoon Rain',
      icon: <CloudRain className="size-4 text-blue-400" />,
      desc: 'Rainy roadside atmosphere with tin roof reflections'
    },
    {
      id: 'winter-mist',
      label: 'Winter Mist (Dhund)',
      icon: <CloudFog className="size-4 text-sky-300" />,
      desc: 'Dense morning fog & cool atmospheric mist'
    },
    {
      id: 'sunset-glow',
      label: 'Sunset (Gulabi Shaam)',
      icon: <Sun className="size-4 text-amber-400" />,
      desc: 'Warm golden hour dusk lighting & twilight dust'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="saloon-glass relative w-full max-w-sm rounded-3xl border-2 border-amber-900/30 bg-[#0e121a]/95 p-5 sm:p-6 text-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cream/15 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <CloudRain className="size-4.5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-cream">
                Tapri Atmosphere
              </h2>
              <p className="text-[0.65rem] text-sand/70 font-mono">
                Weather scene & ambient sound effects
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

        {/* Dynamic Weather Mode Selector */}
        <div className="mt-4 pb-4 border-b border-cream/10">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sand/70 mb-2.5">
            Weather & Lighting Scene
          </p>
          <div className="grid grid-cols-3 gap-2">
            {weatherOptions.map((opt) => {
              const isActive = weatherMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectWeatherMode?.(opt.id)}
                  className={`flex flex-col items-center justify-center text-center p-2.5 rounded-2xl border transition-all text-xs cursor-pointer ${
                    isActive
                      ? 'border-amber-500/80 bg-amber-500/20 text-cream font-semibold ring-1 ring-amber-500/40 shadow-lg'
                      : 'border-cream/10 bg-black/30 text-sand/75 hover:border-cream/25'
                  }`}
                  title={opt.desc}
                >
                  <span className="mb-1.5">{opt.icon}</span>
                  <span className="text-[0.65rem] leading-tight font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ambient Rain Synthesizer */}
        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-cream">
                <CloudRain className="size-4 text-blue-400" />
                Monsoon Rain on Tin Roof
              </span>
              <span className="font-mono text-[0.7rem] text-sand/80 font-bold">{rainVol}%</span>
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
            <p className="text-[0.62rem] text-sand/60 font-mono">
              Adjust realistic rain sounds layered over 90s radio
            </p>
          </div>

          {/* Bottom Action */}
          <div className="pt-3 flex items-center justify-between border-t border-cream/10">
            <span className="text-[0.62rem] text-sand/60 font-mono">
              Procedural Web Audio
            </span>
            <button
              type="button"
              onClick={handleMuteAll}
              className="saloon-chip text-[0.7rem] inline-flex items-center gap-1 py-1 px-3 hover:border-red-500/50 hover:text-red-400 cursor-pointer"
            >
              <VolumeX className="size-3.5" />
              <span>Mute Rain</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
