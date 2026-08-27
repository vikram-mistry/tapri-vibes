import React from 'react';

export type FairyLightMode = 'warm' | 'multicolor' | 'off';

interface FairyLightsProps {
  mode: FairyLightMode;
}

export const FairyLights: React.FC<FairyLightsProps> = ({ mode }) => {
  if (mode === 'off') return null;

  // 18 bulb positions draped across the top banner
  const bulbColorsMulticolor = [
    '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6',
    '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#ec4899',
    '#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'
  ];

  const bulbCount = 18;

  return (
    <div className="absolute top-0 inset-x-0 z-20 pointer-events-none overflow-hidden select-none">
      {/* Curved wire SVG */}
      <svg
        viewBox="0 0 1200 60"
        className="w-full h-10 sm:h-14 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        preserveAspectRatio="none"
      >
        {/* Catonary string wire */}
        <path
          d="M 0,10 Q 150,35 300,12 Q 450,38 600,14 Q 750,36 900,12 Q 1050,38 1200,10"
          fill="none"
          stroke="rgba(60, 45, 30, 0.75)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Bulbs positioned along the drape */}
      <div className="absolute top-1 inset-x-0 flex justify-between px-3 sm:px-8">
        {Array.from({ length: bulbCount }).map((_, i) => {
          const color = mode === 'warm' ? '#fbbf24' : bulbColorsMulticolor[i % bulbColorsMulticolor.length];
          const delay = (i * 0.15) % 1.2;
          const isOffset = i % 2 === 1;

          return (
            <div
              key={i}
              className={`flex flex-col items-center transition-all ${
                isOffset ? 'translate-y-2 sm:translate-y-3' : 'translate-y-0.5'
              }`}
            >
              {/* Bulb Socket Cap */}
              <div className="w-1.5 h-1 bg-[#261c14] rounded-t-sm" />

              {/* Glowing Bulb Glass */}
              <div
                className="w-2.5 sm:w-3.5 h-3.5 sm:h-4.5 rounded-full relative"
                style={{
                  backgroundColor: color,
                  boxShadow:
                    mode === 'warm'
                      ? `0 0 10px 3px rgba(251, 191, 36, 0.7), 0 0 20px 6px rgba(245, 158, 11, 0.4)`
                      : `0 0 12px 3px ${color}bb, 0 0 22px 6px ${color}66`,
                  animation: mode === 'multicolor' ? `fairyBlink 1.8s ${delay}s infinite ease-in-out` : `warmGlow 3s ${delay}s infinite ease-in-out`
                }}
              >
                {/* Inner Filament highlight */}
                <div className="absolute inset-x-0 top-1 mx-auto w-1 h-1.5 bg-white/80 rounded-full blur-[0.5px]" />
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes fairyBlink {
          0%, 100% { opacity: 0.95; filter: brightness(1.2); }
          50% { opacity: 0.35; filter: brightness(0.6); }
        }
        @keyframes warmGlow {
          0%, 100% { opacity: 0.9; filter: brightness(1.05); }
          50% { opacity: 0.75; filter: brightness(0.9); }
        }
      `}</style>
    </div>
  );
};
