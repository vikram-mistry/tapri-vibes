import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquareHeart } from 'lucide-react';

interface Note {
  id: string;
  author: string;
  city: string;
  message: string;
  timestamp: string;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: 'note-1',
    author: 'Vikram',
    city: 'Mumbai',
    message: 'Cutting chai + Saajan cassette on a rainy evening = pure bliss 🌧️☕',
    timestamp: 'Just now'
  },
  {
    id: 'note-2',
    author: 'Aakash',
    city: 'Delhi',
    message: 'Listening while studying. Kumar Sanu classics hit different at 1 AM!',
    timestamp: '10m ago'
  },
  {
    id: 'note-3',
    author: 'Priya',
    city: 'Bengaluru',
    message: 'Reminds me of our college tapri breaks back in the day ❤️',
    timestamp: '35m ago'
  },
  {
    id: 'note-4',
    author: 'Rohan',
    city: 'Pune',
    message: 'The rain sound + chai simmering in background is amazing! 🎧',
    timestamp: '1h ago'
  }
];

const STORAGE_KEY = 'tapri_guestbook_notes';

interface ChalkboardGuestbookProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChalkboardGuestbook: React.FC<ChalkboardGuestbookProps> = ({ isOpen, onClose }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  // Sync across tabs
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('tapri_guestbook_channel');
      bc.onmessage = (ev) => {
        if (Array.isArray(ev.data?.notes)) {
          setNotes(ev.data.notes);
        }
      };
    } catch {}

    return () => {
      bc?.close();
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      author: author.trim() || 'Tapri Regular',
      city: city.trim() || 'India',
      message: message.trim(),
      timestamp: 'Just now'
    };

    const updated = [newNote, ...notes.slice(0, 40)];
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const bc = new BroadcastChannel('tapri_guestbook_channel');
      bc.postMessage({ notes: updated });
      bc.close();
    } catch {}

    setMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="saloon-glass relative w-full max-w-lg rounded-3xl border-2 border-amber-900/30 bg-[#0e121a]/95 p-5 text-cream shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-cream/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <MessageSquareHeart className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-black text-cream sm:text-2xl">
                Tapri Chalkboard
              </h2>
              <p className="text-xs text-sand/70 font-mono">
                Roadside notes & memories from fellow listeners
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="saloon-icon-btn p-1.5"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Note Composer */}
        <form onSubmit={handleSubmit} className="mt-4 border-b border-cream/10 pb-4">
          <textarea
            rows={2}
            placeholder="Write a note on the tapri board (e.g., your chai mood, favourite 90s song, memory)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl border border-cream/20 bg-black/40 p-3 text-xs text-cream placeholder-sand/40 focus:border-amber-500/60 focus:outline-none"
            maxLength={180}
            required
          />
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Your Name (optional)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-32 rounded-lg border border-cream/15 bg-black/30 px-2.5 py-1 text-[0.7rem] text-cream placeholder-sand/40 focus:outline-none"
                maxLength={20}
              />
              <input
                type="text"
                placeholder="City (optional)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-28 rounded-lg border border-cream/15 bg-black/30 px-2.5 py-1 text-[0.7rem] text-cream placeholder-sand/40 focus:outline-none"
                maxLength={20}
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="saloon-chip active flex items-center justify-center gap-1.5 py-1 px-3 text-xs disabled:opacity-40"
            >
              <Send className="size-3" />
              <span>Post Note</span>
            </button>
          </div>
        </form>

        {/* Notes Feed */}
        <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2.5 pr-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-cream/10 bg-black/30 p-3 text-left transition-colors hover:border-cream/20"
            >
              <p className="text-xs text-cream/90 leading-relaxed font-sans">
                "{note.message}"
              </p>
              <div className="mt-2 flex items-center justify-between font-mono text-[0.65rem] text-sand/60">
                <span className="text-amber-400/90 font-medium">
                  {note.author} · {note.city}
                </span>
                <span>{note.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
