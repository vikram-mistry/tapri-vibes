import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center px-6 pt-14 text-center sm:pt-20 select-none">
      {/* English Hero Title */}
      <h1 className="font-display text-6xl leading-[0.9] font-black text-cream drop-shadow-[0_6px_24px_rgba(0,0,0,0.9)] sm:text-8xl lg:text-9xl tracking-tight uppercase">
        <span className="block">TAPRI</span>
        <span className="block text-sand">VIBES</span>
      </h1>

      {/* Subtitle / Eyebrow (Bold & clearly styled) */}
      <p className="mt-5 font-mono text-[0.75rem] font-extrabold tracking-[0.45em] text-cream uppercase sm:text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        TAPRI VIBES · CUTTING CHAI & 90s RADIO
      </p>
    </div>
  );
};
