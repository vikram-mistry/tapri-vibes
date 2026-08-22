import React from 'react';
import { SOCIAL_LINKS } from '../data/playlists';

interface FooterProps {
  onNavigate: (view: 'radio' | 'playlists' | 'songs' | 'playlist-detail') => void;
  onSelectPlaylist: (playlistId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectPlaylist }) => {
  return (
    <footer className="relative z-20 border-t border-cream/10 bg-shade/80 px-5 pt-10 pb-44 text-sand backdrop-blur-sm sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-cream/10 border border-cream/20 text-cream font-display font-black text-sm">
            ☕
          </div>
          <div>
            <p className="font-display text-2xl leading-none font-extrabold text-cream tracking-tight">
              Tapri Vibes
            </p>
            <p className="mt-1 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-sand/70">
              Cutting Chai & 90s Radio
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/80">
          90s Hindi film songs, playing round the clock — the kind of tape that never stops at a neighbourhood tea stall on a rainy evening.
        </p>

        {/* Quick links */}
        <p className="mt-8 font-mono text-[0.65rem] tracking-[0.28em] uppercase text-sand/60">
          Chai Time Rotations
        </p>
        <nav className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => onSelectPlaylist('all-tapri-classics')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-amber-300 hover:underline cursor-pointer"
          >
            All Tapri Classics (124 Songs)
          </button>
          <button
            type="button"
            onClick={() => onSelectPlaylist('subah-ki-chai')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-amber-300 hover:underline cursor-pointer"
          >
            Subah Ki Chai (6 AM – 11 AM)
          </button>
          <button
            type="button"
            onClick={() => onSelectPlaylist('dophar-ki-susti')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-amber-300 hover:underline cursor-pointer"
          >
            Dophar Ki Susti (11 AM – 4 PM)
          </button>
          <button
            type="button"
            onClick={() => onSelectPlaylist('shaam-ki-cutting')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-amber-300 hover:underline cursor-pointer"
          >
            Shaam Ki Cutting (4 PM – 9 PM)
          </button>
          <button
            type="button"
            onClick={() => onSelectPlaylist('raat-ki-tapri')}
            className="text-left text-cream/90 underline-offset-4 transition-colors hover:text-amber-300 hover:underline cursor-pointer"
          >
            Raat Ki Tapri (9 PM – 4 AM)
          </button>
          <button
            type="button"
            onClick={() => onNavigate('songs')}
            className="text-left text-sand/80 underline-offset-4 transition-colors hover:text-cream hover:underline cursor-pointer"
          >
            All Songs Directory (124)
          </button>
        </nav>

        {/* Social chips & Community */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="saloon-chip border-[#25D366]/40 hover:border-[#25D366]/80 text-white font-medium"
            title="Join Tapri WhatsApp Community"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.67-.51-.173 0-.372-.025-.571-.025-.198 0-.522.074-.796.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.929L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp Community</span>
          </a>

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

        {/* Creator Note */}
        <div className="mt-8 pt-6 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-sand/80">
          <p className="font-medium text-cream flex items-center gap-1.5">
            <span>Created with ☕ & nostalgia by</span>
            <span className="font-bold text-amber-400">Vikram Mistry</span>
          </p>
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sand/50">
            © {new Date().getFullYear()} Tapri Vibes
          </p>
        </div>

        {/* Legal notice & Credits */}
        <div className="mt-4 space-y-2 text-[0.7rem] leading-relaxed text-sand/50">
          <p>
            Audio streams via YouTube's official embedded player. Nothing is hosted on this server, and all rights remain with the respective record labels, composers, and performers.
          </p>
          <p>
            If you hold rights to any music track and want it removed, contact{' '}
            <a
              href={`mailto:${SOCIAL_LINKS.contactEmail}`}
              className="text-sand/80 underline underline-offset-4 hover:text-cream"
            >
              {SOCIAL_LINKS.contactEmail}
            </a>{' '}
            and it will be taken down promptly.
          </p>
        </div>
      </div>
    </footer>
  );
};
