import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../data/playlists';
import { Download } from 'lucide-react';
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

  return (
    <header className="relative z-20 flex items-center justify-between gap-3 px-4 pt-4 text-sand sm:px-8 sm:pt-6">
      {/* Time */}
      <span className="min-w-[4.5rem] font-mono text-xs tracking-[0.2em] uppercase sm:text-sm text-sand/80">
        {timeStr || '\u00A0'}
      </span>

      {/* Online indicator */}
      <span className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-70"></span>
          <span className="relative inline-flex size-2 rounded-full bg-live"></span>
        </span>
        <span className="font-semibold tabular-nums text-cream">{listenerCount}</span>
        <span className="text-sand/70">online</span>
      </span>

      {/* Nav & External Links */}
      <nav className="flex flex-col items-end gap-1.5 sm:gap-2">
        {/* Social / External streaming chips */}
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={SOCIAL_LINKS.spotify}
            target="_blank"
            rel="noreferrer noopener"
            className="saloon-chip"
            aria-label="Open workout playlist on Spotify"
            title="Listen on Spotify"
          >
            {/* Spotify SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#1ED760]">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="hidden sm:inline">Spotify</span>
          </a>

          <a
            href={SOCIAL_LINKS.ytMusic}
            target="_blank"
            rel="noreferrer noopener"
            className="saloon-chip"
            aria-label="Open workout playlist on YouTube Music"
            title="Listen on YouTube Music"
          >
            {/* YouTube Music SVG */}
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#FF0033]">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
            </svg>
            <span className="hidden sm:inline">YT Music</span>
          </a>
        </div>

        {/* In-app navigation chips */}
        <div className="flex items-center gap-1 sm:gap-2">
          {currentView !== 'radio' && (
            <button
              onClick={() => onNavigate('radio')}
              className="saloon-chip"
            >
              ← Radio
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
