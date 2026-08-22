import React, { useState, useEffect, useRef } from 'react';
import { SOCIAL_LINKS } from '../data/playlists';
import { Download, Headphones, ArrowLeft, X } from 'lucide-react';
import { subscribeToLobbyPresence } from '../utils/presence';

interface HeaderProps {
  currentView: 'radio' | 'playlists' | 'songs' | 'playlist-detail';
  onNavigate: (view: 'radio' | 'playlists' | 'songs' | 'playlist-detail') => void;
  onOpenInstall: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenInstall }) => {
  // Live clock
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      let hours = d.getHours();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      const mins = String(d.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${mins} ${ampm}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time live online listeners count
  const [listenerCount, setListenerCount] = useState<number | string>('—');

  useEffect(() => {
    const unsubscribe = subscribeToLobbyPresence((count) => {
      setListenerCount(count);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Popover state for Streams (Spotify / YT Music) and WhatsApp
  const [isStreamsOpen, setIsStreamsOpen] = useState<boolean>(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);

  const streamsRef = useRef<HTMLDivElement | null>(null);
  const whatsappRef = useRef<HTMLDivElement | null>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (streamsRef.current && !streamsRef.current.contains(event.target as Node)) {
        setIsStreamsOpen(false);
      }
      if (whatsappRef.current && !whatsappRef.current.contains(event.target as Node)) {
        setIsWhatsAppOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsStreamsOpen(false);
        setIsWhatsAppOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="relative z-20 flex items-start justify-between gap-3 px-4 pt-4 text-sand sm:px-8 sm:pt-6">
      {/* Left Column: Time & WhatsApp Quick Chip */}
      <div className="flex flex-col items-start gap-1.5">
        {/* Time */}
        <span className="min-w-[4.5rem] font-mono text-xs tracking-[0.2em] uppercase sm:text-sm text-sand/80">
          {timeStr || '\u00A0'}
        </span>

        {/* Compact WhatsApp Chip */}
        <div className="relative" ref={whatsappRef}>
          <button
            type="button"
            onClick={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
            className={`saloon-chip flex items-center gap-1.5 text-xs py-1 px-2.5 transition-all ${
              isWhatsAppOpen ? 'active border-[#25D366]/60 text-white' : 'hover:border-[#25D366]/40'
            }`}
            title="Join WhatsApp Community"
            aria-label="Open WhatsApp Community Modal"
          >
            {/* WhatsApp Icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5 text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.67-.51-.173 0-.372-.025-.571-.025-.198 0-.522.074-.796.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.929L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-medium text-[0.7rem] sm:text-xs">WhatsApp</span>
          </button>

          {/* WhatsApp Popover Card */}
          {isWhatsAppOpen && (
            <div className="absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 rounded-2xl saloon-glass p-4 text-cream shadow-2xl border border-cream/25 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.67-.51-.173 0-.372-.025-.571-.025-.198 0-.522.074-.796.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.929L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold leading-tight">Tapri Vibes Crew</p>
                    <p className="text-[0.65rem] text-cream/70">WhatsApp Channel</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWhatsAppOpen(false)}
                  className="saloon-icon-btn p-1 size-6"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-sand/85">
                Join the Tapri crew for daily 90s Bollywood evergreen songs, new playlist drops, and updates.
              </p>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2 px-3 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Join Free on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Center Column: Online indicator */}
      <span className="flex items-center gap-2 text-xs sm:text-sm pt-0.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-70"></span>
          <span className="relative inline-flex size-2 rounded-full bg-live"></span>
        </span>
        <span className="font-semibold tabular-nums text-cream">{listenerCount}</span>
        <span className="text-sand/70">online</span>
      </span>

      {/* Right Column: Nav & Grouped Music Streams */}
      <nav className="flex flex-col items-end gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Grouped Music Streams Trigger */}
          <div className="relative" ref={streamsRef}>
            <button
              type="button"
              onClick={() => setIsStreamsOpen(!isStreamsOpen)}
              className={`saloon-chip flex items-center gap-1.5 ${isStreamsOpen ? 'active' : ''}`}
              aria-label="Open streaming links"
              title="Listen on Spotify or YouTube Music"
            >
              <Headphones className="size-3.5 text-sand" />
              <span className="text-xs">Listen</span>
            </button>

            {/* Floating Streams Dropdown */}
            {isStreamsOpen && (
              <div className="absolute top-full right-0 mt-2 z-50 w-44 rounded-2xl saloon-glass p-2 shadow-2xl border border-cream/25 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-1">
                <a
                  href={SOCIAL_LINKS.spotify}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setIsStreamsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-cream hover:bg-cream/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#1ED760]">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span>Spotify</span>
                </a>

                <a
                  href={SOCIAL_LINKS.ytMusic}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setIsStreamsOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-cream hover:bg-cream/10 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#FF0033]">
                    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
                  </svg>
                  <span>YT Music</span>
                </a>
              </div>
            )}
          </div>

          {/* In-app navigation chips */}
          {currentView !== 'radio' && (
            <button
              onClick={() => onNavigate('radio')}
              className="saloon-chip inline-flex items-center gap-1"
            >
              <ArrowLeft className="size-3" />
              <span>Radio</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('playlists')}
            className={`saloon-chip ${currentView === 'playlists' || currentView === 'playlist-detail' ? 'active' : ''}`}
          >
            Playlists
          </button>

          <button
            onClick={() => onNavigate('songs')}
            className={`saloon-chip ${currentView === 'songs' ? 'active' : ''}`}
          >
            Songs
          </button>

          <button
            onClick={onOpenInstall}
            className="saloon-chip hidden sm:inline-flex"
            title="Install Web App"
          >
            <Download className="size-3.5" />
            <span>Install</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
