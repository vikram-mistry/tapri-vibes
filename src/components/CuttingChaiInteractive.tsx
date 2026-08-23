import React, { useState, useRef, useCallback, useEffect } from 'react';

// ─── Chai pouring audio singleton ────────────────────────────────────
let chaiAudio: HTMLAudioElement | null = null;

function getChaiAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!chaiAudio) {
    chaiAudio = new Audio('./audio/chai-pour.mp3');
    chaiAudio.preload = 'auto';
    chaiAudio.volume = 0.7;
  }
  return chaiAudio;
}

// ─── Desi tapri slangs ───────────────────────────────────────────────
const TAPRI_SLANGS = [
  'Ek cutting idhar bhi!',
  'Kadak banana bhai.',
  'Chai garam hai, dil sambhal ke.',
  'Ek aur bana dena bhai.',
  'Thoda adrak daalna.',
  'Ek sip aur...',
  'Sukoon ka order laga do.',
  'Aaj ki baat chai pe.',
  'Ek kam shakkar wali dena bhai',
  'Bhai, cutting ko full kar do!',
  'Chai ke sath ek maska bun bhi',
  'Subah ki pehli chai, seedha dil pe',
  'Bhai do cutting dena fatafat!',
  'Barish aur cutting chai... waah!',
  'Chai pe charcha shuru karo!',
  'Special elaichi wali tapri chai',
  'Ek adrak chai dena bhai',
];

const STEAM_PARTICLE_COUNT = 4;

export const CuttingChaiInteractive: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [showSteam, setShowSteam] = useState(false);
  const [slangText, setSlangText] = useState<string | null>(null);
  const [showSlang, setShowSlang] = useState(false);
  const lastSlangIdx = useRef(-1);

  // Preload the audio on mount
  useEffect(() => {
    getChaiAudio();
  }, []);

  const handleClick = useCallback(() => {
    if (isShaking) return; // cooldown

    // Pick a random slang (avoid repeating the same one)
    const available = TAPRI_SLANGS.filter((_, idx) => idx !== lastSlangIdx.current);
    const picked = available[Math.floor(Math.random() * available.length)];
    lastSlangIdx.current = TAPRI_SLANGS.indexOf(picked);

    setIsShaking(true);
    setShowSteam(true);
    setSlangText(picked);
    setShowSlang(true);

    // Play the chai pouring audio
    const audio = getChaiAudio();
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    // Timers matching chaikitapri.fun behavior
    setTimeout(() => setIsShaking(false), 500);
    setTimeout(() => setShowSteam(false), 2200);
    setTimeout(() => setShowSlang(false), 3800);
  }, [isShaking]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.3rem',
        position: 'relative',
      }}
    >
      {/* Hindi slang toast (appears above glass) */}
      {showSlang && slangText && (
        <div
          style={{
            position: 'absolute',
            bottom: '120%',
            right: 0,
            background: 'rgba(28,18,8,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(212,168,86,0.18)',
            borderRadius: 6,
            padding: '0.4rem 0.7rem',
            fontSize: '0.68rem',
            fontWeight: 300,
            color: '#FFF4DF',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '0.01em',
            animation: 'fadeSlideIn 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {slangText}
        </div>
      )}

      {/* Rising steam particles above glass */}
      <div
        style={{
          position: 'absolute',
          bottom: '95%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 44,
          height: 50,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        {showSteam &&
          [...Array(STEAM_PARTICLE_COUNT)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${18 + i * 8}%`,
                bottom: 0,
                width: 3,
                height: 14,
                borderRadius: 3,
                background: 'rgba(210,190,155,0.6)',
                filter: 'blur(2.5px)',
                animation: `steamRise 1.4s ${i * 0.18}s ease-out forwards`,
              }}
            />
          ))}
      </div>

      {/* Chai glass button */}
      <button
        onClick={handleClick}
        aria-label="Play chai sound"
        title="Click for cutting chai pouring sound & tapri slangs!"
        style={{
          width: 'clamp(38px, 5vw, 52px)',
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          padding: 0,
          display: 'block',
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
          transition: 'filter 0.3s, transform 0.2s',
          transform: isShaking ? undefined : 'none',
          animation: isShaking
            ? 'glassShake 0.45s ease-in-out'
            : undefined,
        }}
        onMouseEnter={(e) => {
          if (!isShaking) {
            (e.currentTarget as HTMLButtonElement).style.filter =
              'drop-shadow(0 0 12px rgba(255,244,223,0.6))';
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isShaking) {
            (e.currentTarget as HTMLButtonElement).style.filter =
              'drop-shadow(0 2px 8px rgba(0,0,0,0.5))';
            (e.currentTarget as HTMLButtonElement).style.transform = 'none';
          }
        }}
      >
        <svg
          viewBox="0 0 44 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Transparent glass body */}
          <path
            d="M9,16 L13,48 L31,48 L35,16 Z"
            fill="rgba(255,244,223,0.15)"
            stroke="rgba(255,244,223,0.8)"
            strokeWidth="1.2"
          />
          {/* Hot brewed chai liquid */}
          <path
            d="M10.5,26 L13,48 L31,48 L33.5,26 Z"
            fill="rgba(160,82,22,0.85)"
          />
          {/* Glass rim */}
          <line
            x1="9" y1="16" x2="35" y2="16"
            stroke="rgba(255,244,223,0.9)"
            strokeWidth="1.5"
          />
          {/* Base shadow */}
          <ellipse
            cx="22" cy="49.5" rx="14" ry="2.5"
            fill="rgba(70,38,10,0.6)"
            stroke="rgba(255,244,223,0.6)"
            strokeWidth="0.9"
          />
          {/* Reflection streak */}
          <line
            x1="12" y1="20" x2="12" y2="42"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
          />
        </svg>
      </button>

      {/* Label */}
      <span
        style={{
          fontSize: '0.5rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#FFF4DF',
          opacity: 0.9,
          fontWeight: 600,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}
      >
        Ek Chai
      </span>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes steamRise {
          0%   { opacity: 0; transform: translateY(0) scaleX(1); }
          15%  { opacity: 0.55; }
          60%  { opacity: 0.35; transform: translateY(-38px) scaleX(1.5); }
          100% { opacity: 0; transform: translateY(-38px) scaleX(0.8); }
        }
        @keyframes glassShake {
          0%   { transform: translateX(0) rotate(0); }
          15%  { transform: translateX(-2.5px) rotate(-1deg); }
          35%  { transform: translateX(2.5px) rotate(1deg); }
          55%  { transform: translateX(-1.5px) rotate(-0.5deg); }
          75%  { transform: translateX(1.5px) rotate(0.5deg); }
          100% { transform: translateX(0) rotate(0); }
        }
        @keyframes fadeSlideIn {
          0%   { opacity: 0; transform: translateY(5px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
