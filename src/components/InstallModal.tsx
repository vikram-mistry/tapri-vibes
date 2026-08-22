import React from 'react';
import { X, Share, PlusSquare } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && 'ontouchend' in document);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="How to install Workout Vibes"
      onClick={onClose}
    >
      <div
        className="saloon-glass w-full max-w-sm rounded-3xl p-6 text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl font-bold">Add to Home Screen</p>
            <p className="mt-1 text-xs text-cream/60">
              Opens like a native app with zero app store downloads.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="saloon-icon-btn"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {isIos ? (
          <ol className="mt-5 space-y-3 text-sm text-cream/85">
            <li className="flex items-center gap-2.5">
              <Share className="size-4 shrink-0 text-cream/70" />
              <span>Tap the <strong>Share</strong> button in Safari</span>
            </li>
            <li className="flex items-center gap-2.5">
              <PlusSquare className="size-4 shrink-0 text-cream/70" />
              <span>Choose <strong>“Add to Home Screen”</strong></span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-live">✓</span>
              <span>Tap <strong>“Add”</strong> — ready to pump!</span>
            </li>
          </ol>
        ) : (
          <ol className="mt-5 space-y-3 text-sm text-cream/85">
            <li className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-cream/60">1.</span>
              <span>Open browser menu (⋮)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-cream/60">2.</span>
              <span>Select <strong>“Install app”</strong> or <strong>“Add to Home screen”</strong></span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-live">✓</span>
              <span>Confirm install</span>
            </li>
          </ol>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-cream py-2.5 text-center text-xs font-bold text-shade uppercase tracking-wider transition hover:bg-white"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
