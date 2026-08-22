import React from 'react';
import { X, HelpCircle, Radio, CloudRain, Clock, CassetteTape, MessageSquareHeart, Download } from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    {
      icon: <Radio className="size-4.5 text-amber-400" />,
      title: 'Chai Time Rotations',
      desc: 'Browse and play curated 90s tape slots (Subah Ki Chai, Dophar Ki Susti, Shaam Ki Cutting, Raat Ki Tapri, or All 124 Classics) directly from the bottom player or Playlists tab.'
    },
    {
      icon: <CloudRain className="size-4.5 text-blue-400" />,
      title: 'Tapri Soundscapes Mixer',
      desc: 'Click "Soundscapes" in the bottom dock to mix real-time ambient sounds — Monsoon Rain on Tin Roof, Tea Kettle Boiling Simmer, and Vinyl Crackle.'
    },
    {
      icon: <Clock className="size-4.5 text-amber-300" />,
      title: 'Cutting Chai Focus & Sleep Timer',
      desc: 'Set 15m, 25m Pomodoro, or 45m deep focus timers. Music gently fades out in the final 15 seconds followed by a peaceful chime.'
    },
    {
      icon: <CassetteTape className="size-4.5 text-red-400" />,
      title: '90s Retro Cassette Player',
      desc: 'Tap "Tape Deck" to transform the radio into an animated vintage TDK/T-Series cassette deck with spinning geared spools and realistic mechanical click/whirr sounds.'
    },
    {
      icon: <MessageSquareHeart className="size-4.5 text-emerald-400" />,
      title: 'Roadside Chalkboard Guestbook',
      desc: 'Click "Notes" in the top bar to share anonymous thoughts, chai memories, and favourite 90s songs with fellow listeners worldwide.'
    },
    {
      icon: <Download className="size-4.5 text-cream" />,
      title: 'Add to Home Screen (PWA)',
      desc: 'Tap "Install" (or Share > Add to Home Screen in Safari) to install Tapri Vibes as a standalone app with the official vinyl record icon on your phone and Mac Dock.'
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
        className="saloon-glass relative w-full max-w-lg rounded-3xl border-2 border-amber-900/30 bg-[#0e121a]/95 p-5 sm:p-7 text-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cream/15 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <HelpCircle className="size-4.5" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-cream">
                How to Use Tapri Vibes
              </h2>
              <p className="text-[0.65rem] text-sand/70 font-mono">
                Guide to all nostalgic 90s features & shortcuts
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

        {/* Features List */}
        <div className="mt-4 max-h-[420px] overflow-y-auto space-y-3 pr-1">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-cream/10 bg-black/30 p-3.5 flex items-start gap-3 transition-colors hover:border-cream/20"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-cream/5 border border-cream/10">
                {f.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm font-bold text-cream">
                  {f.title}
                </h3>
                <p className="mt-1 text-xs text-sand/80 leading-relaxed font-sans">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
