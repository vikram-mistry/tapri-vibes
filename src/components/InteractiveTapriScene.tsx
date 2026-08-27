import React, { useState } from 'react';
import { Sparkles, Newspaper } from 'lucide-react';
import { sfx } from '../utils/sfx';
import { FairyLightMode } from './FairyLights';

interface InteractiveTapriSceneProps {
  fairyLightMode: FairyLightMode;
  onCycleFairyLights: () => void;
  onOpenNewspaper: () => void;
}

export const InteractiveTapriScene: React.FC<InteractiveTapriSceneProps> = ({
  fairyLightMode,
  onCycleFairyLights,
  onOpenNewspaper,
}) => {
  const [lightToast, setLightToast] = useState<string | null>(null);

  // Handle Fairy Lights Switch Click
  const handleLightsClick = () => {
    sfx.playLightSwitch();
    onCycleFairyLights();

    const nextMode =
      fairyLightMode === 'warm'
        ? 'Festive Multicolor 🌈'
        : fairyLightMode === 'multicolor'
        ? 'Lights Off ⚪'
        : 'Warm Golden Glow 🟡';

    setLightToast(`🏮 Mirchi Lights: ${nextMode}`);
    setTimeout(() => setLightToast(null), 2200);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
      
      {/* 🏮 1. Top Right Canopy: Mirchi Fairy Lights Switch Button */}
      <div className="absolute top-16 right-4 sm:right-8 pointer-events-auto">
        <div className="relative">
          <button
            type="button"
            onClick={handleLightsClick}
            aria-label="Toggle Tapri Fairy Lights"
            title="Click to toggle roof fairy lights (Warm / Festive / Off)"
            className="saloon-chip text-[0.68rem] sm:text-xs py-1 px-2.5 flex items-center gap-1.5 bg-black/50 border border-cream/20 hover:border-amber-400/60 shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 text-amber-300"
          >
            <Sparkles className="size-3 text-amber-400" />
            <span className="font-mono text-[0.62rem] sm:text-[0.68rem]">
              Lights: <strong className="text-cream capitalize">{fairyLightMode}</strong>
            </span>
          </button>

          {/* Light Toast */}
          {lightToast && (
            <div className="absolute top-full right-0 mt-1.5 whitespace-nowrap rounded-xl bg-amber-500 px-3 py-1 text-[0.68rem] font-bold text-shade shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 border border-amber-300 z-50">
              {lightToast}
            </div>
          )}
        </div>
      </div>

      {/* 📰 2. Top Left: 90s Daily Newspaper Stand */}
      <div className="absolute top-16 left-4 sm:left-8 pointer-events-auto">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              sfx.playPaperRustle();
              onOpenNewspaper();
            }}
            aria-label="Read 90s Tapri Times Newspaper"
            title="Click to read 90s Bollywood news & cassette charts!"
            className="group flex items-center gap-1.5 rounded-2xl bg-black/50 px-2.5 py-1 border border-cream/20 backdrop-blur-md shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95 text-sand hover:text-cream hover:border-amber-400/50"
          >
            <Newspaper className="size-3.5 sm:size-4 text-amber-300 group-hover:rotate-6 transition-transform" />
            <span className="font-mono text-[0.62rem] sm:text-[0.68rem] font-bold tracking-wider uppercase text-cream">
              90s Daily Gazette
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
