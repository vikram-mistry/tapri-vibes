import React, { useState, useRef, useEffect } from 'react';
import { X, Heart, MessageCircle, Copy, Check, Send, Download, Share2 } from 'lucide-react';
import { Song } from '../types';

interface SharePostcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
}

export const SharePostcardModal: React.FC<SharePostcardModalProps> = ({
  isOpen,
  onClose,
  song
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [dedicationMessage, setDedicationMessage] = useState<string>(
    'Bhai/Dost, ek garma-garam cutting chai aur yeh evergreen 90s gaana tere liye ☕🎶'
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const shareUrl = song ? `${window.location.origin}${window.location.pathname}?song=${song.id}` : '';
  const fullWhatsAppText = song
    ? `${dedicationMessage}\n\n📻 *${song.en}* (${song.film || '90s Classic'})\n🎙️ Singer: ${song.artist}\n\n▶️ Listen with Chai on Tapri Vibes:\n${shareUrl}`
    : '';
  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullWhatsAppText)}`;

  // Generate Postcard Image onto Canvas
  useEffect(() => {
    if (!isOpen || !song) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 500;

    // Background: Vintage Aged Postcard
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 500);
    bgGrad.addColorStop(0, '#1c1510');
    bgGrad.addColorStop(1, '#0e0b09');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Decorative Postcard Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 460);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, 744, 444);

    // Header Stamp
    ctx.fillStyle = '#f5e6d3';
    ctx.font = 'bold 22px Georgia, serif';
    ctx.fillText('☕ TAPRI VIBES · 90s RADIO POSTCARD', 50, 70);

    ctx.fillStyle = '#d4af37';
    ctx.font = '14px monospace';
    ctx.fillText('SPECIAL CHAI & MUSIC DEDICATION', 50, 95);

    // Divider Line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    ctx.beginPath();
    ctx.moveTo(50, 115);
    ctx.lineTo(750, 115);
    ctx.stroke();

    // Song details
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText(`"${song.en}"`, 50, 170);

    ctx.fillStyle = '#e6c894';
    ctx.font = '18px sans-serif';
    const subText = `${song.artist} ${song.film ? `· ${song.film}` : ''} (${song.year || '90s'})`;
    ctx.fillText(subText, 50, 205);

    // Dedication Note Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(50, 240, 700, 110);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.strokeRect(50, 240, 700, 110);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'italic 20px Georgia, serif';
    // Wrap text if needed
    ctx.fillText(`"${dedicationMessage}"`, 70, 300);

    // Bottom Footer info
    ctx.fillStyle = 'rgba(245, 230, 211, 0.6)';
    ctx.font = '14px monospace';
    ctx.fillText(`▶️ Tapri Vibes Radio · ${window.location.host}`, 50, 420);

    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Garma-Garam Cutting Chai + 90s Bollywood', 50, 445);
  }, [isOpen, song, dedicationMessage]);

  if (!isOpen || !song) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download Postcard Image
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `tapri-postcard-${song.slug || '90s-song'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Native Web Share (with Image attached if supported)
  const handleShareWithImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          window.open(whatsappHref, '_blank');
          setIsGenerating(false);
          return;
        }

        const file = new File([blob], `tapri-postcard-${song.slug}.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Chai & 90s Song Dedication: ${song.en}`,
            text: fullWhatsAppText
          });
        } else {
          // Fallback: download image and open WhatsApp
          handleDownloadImage();
          window.open(whatsappHref, '_blank');
        }
        setIsGenerating(false);
      }, 'image/png');
    } catch {
      window.open(whatsappHref, '_blank');
      setIsGenerating(false);
    }
  };

  const presetMessages = [
    'Bhai/Dost, ek garma-garam cutting chai aur yeh evergreen 90s gaana tere liye ☕🎶',
    'Purane din yaad aa gaye... yeh gaana sunte hi roadside tapri ki chai yaad aa gayi! 📻',
    'Barish, cutting chai, aur yeh 90s cassette melody... sit back and enjoy! 🌧️☕',
    'Special 90s Bollywood song dedication for you. Chai peete peete suno! ❤️'
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="saloon-glass relative w-full max-w-md rounded-3xl border-2 border-amber-900/30 bg-[#0e121a]/95 p-5 sm:p-6 text-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden Canvas used for generating downloadable & shareable image */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-cream/15 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Send className="size-4" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-cream">
                Send Chai Postcard ☕💌
              </h2>
              <p className="text-[0.65rem] text-sand/70 font-mono">
                Dedicate song + postcard image on WhatsApp
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

        {/* Vintage Postcard Card Visual Preview */}
        <div className="mt-3.5 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-[#231a14] to-[#120d0a] p-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-amber-600/30 pb-2">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-amber-400 font-bold flex items-center gap-1">
              ☕ Tapri Radio Dedication Postcard
            </span>
            <Heart className="size-3.5 text-red-400 fill-red-400" />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <img
              src={song.coverUrl || `https://i.ytimg.com/vi/${song.videoId}/hqdefault.jpg`}
              alt={song.en}
              className="size-13 rounded-xl object-cover border border-amber-500/40 shadow-md shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-sm font-bold text-cream truncate">
                {song.en}
              </h3>
              <p className="text-xs text-sand/80 truncate mt-0.5">
                {song.artist} {song.film ? `· ${song.film}` : ''}
              </p>
              <p className="font-mono text-[0.62rem] text-amber-400/90 mt-0.5">
                Auto-plays with Garma-Garam Chai
              </p>
            </div>
          </div>

          {/* Dedication text */}
          <div className="mt-3 pt-2.5 border-t border-amber-600/20">
            <p className="text-xs text-amber-100/90 italic leading-relaxed font-serif">
              "{dedicationMessage}"
            </p>
          </div>
        </div>

        {/* Quick Message Options */}
        <div className="mt-3">
          <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-sand/60 mb-1">
            Choose Dedication Note
          </p>
          <div className="space-y-1">
            {presetMessages.slice(0, 3).map((msg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setDedicationMessage(msg)}
                className={`w-full text-left text-xs p-1.5 px-2.5 rounded-xl border transition-all truncate ${
                  dedicationMessage === msg
                    ? 'border-amber-500/60 bg-amber-500/15 text-cream font-medium'
                    : 'border-cream/10 bg-black/20 text-sand/75 hover:border-cream/20'
                }`}
              >
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons: Share with Image + Download + Copy */}
        <div className="mt-3.5 pt-3 border-t border-cream/10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {/* Direct Share with Image / WhatsApp */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleShareWithImage}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 px-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Share2 className="size-4" />
              <span>Share Postcard Image</span>
            </button>

            {/* Download Postcard Image */}
            <button
              type="button"
              onClick={handleDownloadImage}
              title="Download Postcard Image"
              className="saloon-chip text-xs py-2.5 px-3 flex items-center gap-1.5 shrink-0 hover:border-amber-400/60 text-amber-300"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Save Image</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.7rem] text-sand/80 underline underline-offset-4 hover:text-white flex items-center gap-1"
            >
              <MessageCircle className="size-3.5 text-[#25D366]" />
              <span>Share Text Link to WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="text-[0.7rem] text-sand/70 hover:text-white flex items-center gap-1"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
