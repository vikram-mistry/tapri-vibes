import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';

export const CassetteDeck: React.FC = () => {
  const { currentSong, isPlaying } = useAudioPlayer();

  return (
    <div className="relative mx-auto w-full max-w-sm px-4 select-none">
      {/* 90s Cassette Shell (TDK / T-Series Retro Style) */}
      <div className="saloon-glass relative rounded-2xl border-2 border-cream/25 bg-[#121620]/90 p-4 shadow-2xl backdrop-blur-md">
        {/* Screw details at 4 corners */}
        <div className="absolute top-2 left-2 size-2 rounded-full border border-cream/30 bg-black/50" />
        <div className="absolute top-2 right-2 size-2 rounded-full border border-cream/30 bg-black/50" />
        <div className="absolute bottom-2 left-2 size-2 rounded-full border border-cream/30 bg-black/50" />
        <div className="absolute bottom-2 right-2 size-2 rounded-full border border-cream/30 bg-black/50" />

        {/* Cassette Label Area */}
        <div className="rounded-xl border border-cream/20 bg-gradient-to-b from-[#e8decb] via-[#dcd0b9] to-[#c8ba9f] p-3 text-shade shadow-inner">
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-shade/20 pb-1.5 font-mono text-[0.65rem] tracking-wider text-shade/80">
            <span className="font-bold text-red-700">SIDE A · STEREO</span>
            <span className="font-extrabold tracking-[0.2em]">TAPRI-90</span>
            <span>HIGH BIAS</span>
          </div>

          {/* Handwritten Song Title */}
          <div className="my-2.5 min-h-[34px] px-1 text-center">
            <p className="font-display text-sm sm:text-base font-black leading-tight text-shade truncate">
              {currentSong?.en || 'Tapri Classics 90s'}
            </p>
            <p className="font-mono text-[0.65rem] text-shade/75 truncate mt-0.5">
              {currentSong?.artist || 'Evergreen Melodies'}
            </p>
          </div>

          {/* Central Tape Spool Window */}
          <div className="relative mx-auto my-1 flex h-14 w-44 items-center justify-between rounded-lg border-2 border-shade/30 bg-[#06080c] px-3 shadow-inner">
            {/* Left Tape Reel */}
            <div className="relative size-9 rounded-full border border-cream/30 bg-black">
              {/* Geared Sprocket */}
              <div
                className="size-full rounded-full border-2 border-white/20 animate-[spin_4s_linear_infinite]"
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              >
                <div className="absolute inset-0 m-auto size-3 rounded-full bg-cream/80" />
                <div className="absolute inset-x-0 top-0 m-auto h-full w-0.5 bg-cream/40" />
                <div className="absolute inset-y-0 left-0 m-auto h-0.5 w-full bg-cream/40" />
              </div>
            </div>

            {/* Magnetic Tape Window with Center Guide */}
            <div className="flex flex-col items-center justify-center">
              <div className="h-0.5 w-16 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 shadow-sm" />
              <div className="mt-1 font-mono text-[0.55rem] text-cream/40 tracking-widest uppercase">
                {isPlaying ? 'PLAY ▶' : 'PAUSE ❚❚'}
              </div>
            </div>

            {/* Right Tape Reel */}
            <div className="relative size-9 rounded-full border border-cream/30 bg-black">
              <div
                className="size-full rounded-full border-2 border-white/20 animate-[spin_4s_linear_infinite]"
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              >
                <div className="absolute inset-0 m-auto size-3 rounded-full bg-cream/80" />
                <div className="absolute inset-x-0 top-0 m-auto h-full w-0.5 bg-cream/40" />
                <div className="absolute inset-y-0 left-0 m-auto h-0.5 w-full bg-cream/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Tape Head Cutout Trapeze at Bottom */}
        <div className="mx-auto mt-2 h-3 w-28 rounded-t-sm border-t border-cream/20 bg-black/60" />
      </div>
    </div>
  );
};
