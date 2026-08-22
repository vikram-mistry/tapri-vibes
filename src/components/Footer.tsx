import React from 'react';
import { SOCIAL_LINKS } from '../data/playlists';

interface FooterProps {
  onNavigate: (view: 'radio' | 'playlists' | 'songs' | 'playlist-detail') => void;
  onSelectPlaylist: (playlistId: 'bollywood' | 'hollywood') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectPlaylist }) => {
  return (
    <footer className="relative z-20 border-t border-cream/10 bg-shade/80 px-5 pt-10 pb-44 text-sand backdrop-blur-sm sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-cream/10 border border-cream/20 text-cream font-display font-black text-sm">
            WV
          </div>
          <div>
            <p className="font-display text-2xl leading-none font-extrabold text-cream tracking-tight">
              Workout Vibes
            </p>
            <p className="mt-1 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-sand/70">
              Sweat It Out
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/80">
          High-energy workout anthems and timeless gym beats, playing round the clock. Designed to fuel heavy lifts, sprint sets, and relentless motivation.
        </p>

        {/* Quick links */}
        <p className="mt-8 font-mono text-[0.65rem] tracking-[0.28em] uppercase text-sand/60">
          Rotations
        </p>
        <nav className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <button
            type="button"
            onClick={() => onSelectPlaylist('bollywood')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline cursor-pointer"
          >
            Bollywood Workout
          </button>
          <button
            type="button"
            onClick={() => onSelectPlaylist('hollywood')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline cursor-pointer"
          >
            Hollywood Workout
          </button>
          <button
            type="button"
            onClick={() => onNavigate('playlists')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline cursor-pointer"
          >
            All Playlists
          </button>
          <button
            type="button"
            onClick={() => onNavigate('songs')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-cream hover:underline cursor-pointer"
          >
            All Songs (144)
          </button>
        </nav>

        {/* Social chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
          <a
            href={SOCIAL_LINKS.spotify}
            target="_blank"
            rel="noreferrer noopener"
            className="saloon-chip"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#1ED760]">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span>Spotify</span>
          </a>
          <a
            href={SOCIAL_LINKS.ytMusic}
            target="_blank"
            rel="noreferrer noopener"
            className="saloon-chip"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#FF0033]">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
            </svg>
            <span>YT Music</span>
          </a>
        </div>

        {/* Legal notice & Credits */}
        <div className="mt-8 space-y-3 text-xs leading-relaxed text-sand/55">
          <p>
            Audio streams via YouTube's official embedded player. Nothing is hosted on this server, and all rights remain with the respective record labels, composers, and artists.
          </p>
          <p>
            If you hold rights to any music track and want it removed, contact{' '}
            <a
              href={`mailto:${SOCIAL_LINKS.contactEmail}`}
              className="text-sand/80 underline underline-offset-4 hover:text-cream"
            >
              {SOCIAL_LINKS.contactEmail}
            </a>{' '}
            and it will be removed promptly.
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sand/40">
            © {new Date().getFullYear()} Workout Vibes
          </p>
        </div>
      </div>
    </footer>
  );
};
