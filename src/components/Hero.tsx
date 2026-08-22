import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center px-6 pt-10 text-center sm:pt-14 select-none">
      {/* English Hero Title */}
      <h1 className="font-display text-6xl leading-[0.9] font-black text-cream drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)] sm:text-8xl lg:text-9xl tracking-tight uppercase">
        <span className="block">TAPRI</span>
        <span className="block text-sand">VIBES</span>
      </h1>

      {/* Subtitle / Eyebrow */}
      <p className="mt-4 font-mono text-[0.7rem] tracking-[0.45em] text-cream/80 uppercase sm:text-xs">
        Tapri Vibes · Cutting Chai & 90s Radio
      </p>
    </div>
  );
};
