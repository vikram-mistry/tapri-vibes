import React from 'react';
import { X, Newspaper, Sparkles, Coffee } from 'lucide-react';
import { sfx } from '../utils/sfx';

interface NewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewspaperModal: React.FC<NewspaperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    sfx.playPaperRustle();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border-4 border-[#2b2219] bg-[#f5ebd7] p-5 sm:p-7 text-[#22170d] shadow-[0_25px_60px_rgba(0,0,0,0.9)] font-serif selection:bg-amber-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Newspaper Masthead */}
        <div className="border-b-2 border-[#2b2219] pb-3 text-center relative">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close Newspaper"
            className="absolute right-0 top-0 rounded-full p-1 text-[#2b2219]/70 hover:bg-[#2b2219]/10 hover:text-[#2b2219] cursor-pointer transition-colors"
          >
            <X className="size-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[#664b31] font-bold">
              ★ 90s Nostalgia Daily Edition ★
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#1a120b] uppercase font-display border-y-2 border-[#2b2219] py-1 my-1">
            THE TAPRI TIMES
          </h1>

          <div className="flex items-center justify-between text-[0.65rem] font-mono uppercase tracking-widest text-[#523d28] border-b border-[#2b2219]/30 pt-1">
            <span>Vol. 90 · No. 1995</span>
            <span>Bombay · Delhi · Calcutta</span>
            <span>Price: 50 Paise</span>
          </div>
        </div>

        {/* Top News Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-2 border-[#2b2219] pb-4">
          
          {/* Main Headline (2 Cols) */}
          <div className="sm:col-span-2 space-y-2">
            <span className="inline-block bg-[#1a120b] text-[#f5ebd7] px-2 py-0.5 text-[0.62rem] font-mono font-bold uppercase tracking-wider">
              Box Office Dhamaka
            </span>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight text-[#1a120b]">
              Single Screens Packed As 90s Melodies Rule Every Roadside Radio!
            </h2>
            <p className="text-xs text-[#3b2b1d] leading-relaxed text-justify">
              From Maratha Mandir to Regal Cinema, advance booking queues stretch across lanes. 
              Music directors note that tea stalls and cassette shops blaring Kumar Sanu, Udit Narayan, 
              and Alka Yagnik on high-bass decks remain the true barometer of a blockbuster soundtrack.
            </p>
          </div>

          {/* Side Column: Cassette Bazaar */}
          <div className="border-t sm:border-t-0 sm:border-l-2 border-[#2b2219]/40 pt-3 sm:pt-0 sm:pl-3 space-y-2 bg-[#ece1cb]/50 p-2.5 rounded-lg">
            <div className="flex items-center gap-1 text-[0.65rem] font-bold text-amber-900 uppercase">
              <Sparkles className="size-3 text-amber-800" />
              <span>Cassette Bazaar</span>
            </div>
            <h3 className="font-bold text-sm leading-snug">
              T-Series & Tips Blank Tapes at ₹25!
            </h3>
            <p className="text-[0.7rem] text-[#4a3725] leading-normal">
              Cassette recording stalls report non-stop demand for side-A/side-B custom mixtapes. 
              Top requests include <em>Aashiqui</em>, <em>Mohra</em>, and <em>Qayamat Se Qayamat Tak</em>.
            </p>
          </div>
        </div>

        {/* Bottom 2 Columns: Tapri Wisdom & 90s Trivia */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Chai Column */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#332212]">
              <Coffee className="size-3.5 text-amber-900" />
              <span>Chai Pe Charcha Special</span>
            </div>
            <p className="text-xs text-[#3b2b1d] leading-relaxed italic bg-white/40 p-2.5 rounded border border-[#2b2219]/20">
              "Bhai, zindagi mein chahe kitni bhi bhaag-daud ho, ek garma-garam cutting chai aur 
              radio par bajta purana 90s gaana... saare gham bhula deta hai."
            </p>
          </div>

          {/* Trivia Column */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#332212]">
              <Newspaper className="size-3.5 text-amber-900" />
              <span>Today's 90s Trivia</span>
            </div>
            <p className="text-xs text-[#3b2b1d] leading-relaxed bg-white/40 p-2.5 rounded border border-[#2b2219]/20">
              Did you know? In 1994, <em>Tip Tip Barsa Paani</em> was rehearsed on a Mumbai terrace 
              during real monsoon rains before the studio filming!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#2b2219]/40 flex items-center justify-between text-[0.65rem] font-mono text-[#664b31]">
          <span>Tapri Vibes Daily Gazette</span>
          <button
            type="button"
            onClick={handleClose}
            className="underline hover:text-black font-bold uppercase cursor-pointer"
          >
            Fold & Close Newspaper (✕)
          </button>
        </div>
      </div>
    </div>
  );
};
