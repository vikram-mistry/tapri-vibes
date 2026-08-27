import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { sfx } from '../utils/sfx';

// ─── Audio singletons for instant zero-latency playback ───────────────
let chaiAudio: HTMLAudioElement | null = null;
let catAudio: HTMLAudioElement | null = null;

function getChaiAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!chaiAudio) {
    chaiAudio = new Audio('./audio/chai-pour.mp3');
    chaiAudio.preload = 'auto';
    chaiAudio.volume = 0.75;
  }
  return chaiAudio;
}

function getCatAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!catAudio) {
    catAudio = new Audio('./audio/cat-meow.mp3');
    catAudio.preload = 'auto';
    catAudio.volume = 0.85;
  }
  return catAudio;
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

export const TapriMicroInteractions: React.FC = () => {
  // Chai State
  const [isChaiShaking, setIsChaiShaking] = useState(false);
  const [showSteam, setShowSteam] = useState(false);
  const [slangText, setSlangText] = useState<string | null>(null);
  const [showSlang, setShowSlang] = useState(false);
  const lastSlangIdx = useRef(-1);

  // Bell State
  const [isBellShaking, setIsBellShaking] = useState(false);
  const [bellToast, setBellToast] = useState<string | null>(null);

  // Cat State
  const [isCatShaking, setIsCatShaking] = useState(false);
  const [catToast, setCatToast] = useState<string | null>(null);

  // Preload audio files on mount
  useEffect(() => {
    getChaiAudio();
    getCatAudio();
  }, []);

  // 1. Handle Chai Click
  const handleChaiClick = useCallback(() => {
    if (isChaiShaking) return;

    const available = TAPRI_SLANGS.filter((_, idx) => idx !== lastSlangIdx.current);
    const picked = available[Math.floor(Math.random() * available.length)];
    lastSlangIdx.current = TAPRI_SLANGS.indexOf(picked);

    setIsChaiShaking(true);
    setShowSteam(true);
    setSlangText(picked);
    setShowSlang(true);

    const audio = getChaiAudio();
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    setTimeout(() => setIsChaiShaking(false), 500);
    setTimeout(() => setShowSteam(false), 2200);
    setTimeout(() => setShowSlang(false), 3800);
  }, [isChaiShaking]);

  // 2. Handle Cycle Bell Click
  const handleBellClick = useCallback(() => {
    sfx.playCycleBell();
    setIsBellShaking(true);

    const toasts = [
      '🔔 Tring-Tring! Hero Cycle Bell',
      '🚲 Side do bhai, cutting chai aayi!',
      '🔔 Hero Cycle ki ghanti... 90s nostalgia!',
      '🚲 Chalo dost, tapri chalte hain!'
    ];
    setBellToast(toasts[Math.floor(Math.random() * toasts.length)]);

    setTimeout(() => setIsBellShaking(false), 500);
    setTimeout(() => setBellToast(null), 2500);
  }, []);

  // 3. Handle Tapri Billa Cat Click
  const handleCatClick = useCallback(() => {
    setIsCatShaking(true);

    const audio = getCatAudio();
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        sfx.playCatPurr();
      });
    } else {
      sfx.playCatPurr();
    }

    const thoughts = [
      'Meow! Yahan ki cutting best hai... 💤',
      'Mrrp... 90s gaane sunkar maza aa gaya 🐱',
      'Meow! Ek Parle-G biscuit milega kya? 🐾',
      'Main is tapri ka VIP customer hoon ❤️',
      'Purr... sukoon wali chai aur dhoop ☀️'
    ];
    setCatToast(thoughts[Math.floor(Math.random() * thoughts.length)]);

    setTimeout(() => setIsCatShaking(false), 600);
    setTimeout(() => setCatToast(null), 3000);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 select-none pointer-events-auto relative z-30">
      
      {/* 🔔 1. Hero Cycle Bell (Left) */}
      <div className="relative flex flex-col items-center">
        {/* Floating Bell Toast */}
        {bellToast && (
          <div
            style={{
              position: 'absolute',
              bottom: '125%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(28,18,8,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 8,
              padding: '0.4rem 0.75rem',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: '#FFF4DF',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              letterSpacing: '0.01em',
              zIndex: 50,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              animation: 'fadeSlideIn 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {bellToast}
          </div>
        )}

        {/* Bell Button Container */}
        <div
          style={{
            background: 'rgba(28, 18, 8, 0.35)',
            padding: 8,
            borderRadius: '50%',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 244, 223, 0.15)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={handleBellClick}
            aria-label="Ring Hero Cycle Bell"
            title="Click to ring Hero Cycle Bell (Tring-Tring!)"
            style={{
              width: 'clamp(38px, 5vw, 52px)',
              height: 'clamp(38px, 5vw, 52px)',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              transition: 'filter 0.3s, transform 0.2s',
              animation: isBellShaking ? 'bellWobble 0.45s ease-in-out' : undefined,
            }}
            onMouseEnter={(e) => {
              if (!isBellShaking) {
                (e.currentTarget as HTMLButtonElement).style.filter =
                  'drop-shadow(0 0 12px rgba(255,244,223,0.6))';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isBellShaking) {
                (e.currentTarget as HTMLButtonElement).style.filter =
                  'drop-shadow(0 2px 8px rgba(0,0,0,0.5))';
                (e.currentTarget as HTMLButtonElement).style.transform = 'none';
              }
            }}
          >
            {/* Bell Icon in Golden Metallic Disc */}
            <div className="size-8 sm:size-9 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1 flex items-center justify-center shadow-inner border border-white/50">
              <Bell className="size-4.5 sm:size-5 text-shade fill-shade" />
            </div>
          </button>
        </div>

        <span
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#FFF4DF',
            opacity: 0.9,
            fontWeight: 600,
            marginTop: '0.3rem',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          Cycle Bell
        </span>
      </div>

      {/* 🫖 2. Cutting Chai Glass (Center) */}
      <div className="relative flex flex-col items-center">
        {/* Hindi slang toast (appears above glass) */}
        {showSlang && slangText && (
          <div
            style={{
              position: 'absolute',
              bottom: '125%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(28,18,8,0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(212,168,86,0.25)',
              borderRadius: 8,
              padding: '0.4rem 0.75rem',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: '#FFF4DF',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              letterSpacing: '0.01em',
              zIndex: 50,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
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

        {/* Glass Container */}
        <div
          style={{
            background: 'rgba(28, 18, 8, 0.35)',
            padding: 8,
            borderRadius: '50%',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 244, 223, 0.15)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={handleChaiClick}
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
              animation: isChaiShaking ? 'glassShake 0.45s ease-in-out' : undefined,
            }}
            onMouseEnter={(e) => {
              if (!isChaiShaking) {
                (e.currentTarget as HTMLButtonElement).style.filter =
                  'drop-shadow(0 0 12px rgba(255,244,223,0.6))';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isChaiShaking) {
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
        </div>

        <span
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#FFF4DF',
            opacity: 0.9,
            fontWeight: 600,
            marginTop: '0.3rem',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          Ek Chai
        </span>
      </div>

      {/* 🐱 3. Tapri Billa Cat (Right) */}
      <div className="relative flex flex-col items-center">
        {/* Floating Cat Thought Bubble */}
        {catToast && (
          <div
            style={{
              position: 'absolute',
              bottom: '125%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255,244,223,0.95)',
              border: '2px solid rgba(160,82,22,0.5)',
              borderRadius: 10,
              padding: '0.4rem 0.75rem',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#2b190f',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              letterSpacing: '0.01em',
              zIndex: 50,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              animation: 'fadeSlideIn 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            🐱 {catToast}
          </div>
        )}

        {/* Cat Button Container */}
        <div
          style={{
            background: 'rgba(28, 18, 8, 0.35)',
            padding: 8,
            borderRadius: '50%',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255, 244, 223, 0.15)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={handleCatClick}
            aria-label="Pet Tapri Billa"
            title="Click to pet Tapri Billa (Roadside sleeping cat)"
            style={{
              width: 'clamp(38px, 5vw, 52px)',
              height: 'clamp(38px, 5vw, 52px)',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
              transition: 'filter 0.3s, transform 0.2s',
              animation: isCatShaking ? 'catPulse 0.45s ease-in-out' : undefined,
            }}
            onMouseEnter={(e) => {
              if (!isCatShaking) {
                (e.currentTarget as HTMLButtonElement).style.filter =
                  'drop-shadow(0 0 12px rgba(255,244,223,0.6))';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isCatShaking) {
                (e.currentTarget as HTMLButtonElement).style.filter =
                  'drop-shadow(0 2px 8px rgba(0,0,0,0.5))';
                (e.currentTarget as HTMLButtonElement).style.transform = 'none';
              }
            }}
          >
            {/* Sleeping Orange Cat Emoji / Badge */}
            <div className="text-2xl sm:text-3xl filter drop-shadow-md">
              🐱
            </div>
          </button>
        </div>

        <span
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#FFF4DF',
            opacity: 0.9,
            fontWeight: 600,
            marginTop: '0.3rem',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          Tapri Billa
        </span>
      </div>

      {/* Global Injected CSS Animations */}
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
        @keyframes bellWobble {
          0% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-18deg) scale(1.1); }
          40% { transform: rotate(15deg) scale(1.1); }
          60% { transform: rotate(-10deg) scale(1.05); }
          80% { transform: rotate(5deg) scale(1.02); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes catPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes fadeSlideIn {
          0%   { opacity: 0; transform: translate(-50%, 5px) scale(0.96); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
      `}</style>
    </div>
  );
};
