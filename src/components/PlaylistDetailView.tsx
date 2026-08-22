import React from 'react';
import { Playlist, Song } from '../types';
import { ALL_SONGS } from '../data/songs';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, Volume2, ArrowLeft } from 'lucide-react';

interface PlaylistDetailViewProps {
  playlist: Playlist;
  onBackToPlaylists: () => void;
  onBackToRadio: () => void;
}

export const PlaylistDetailView: React.FC<PlaylistDetailViewProps> = ({
  playlist,
  onBackToPlaylists
}) => {
  const { currentSong, isPlaying, playSong, togglePlay, switchPlaylist, activePlaylistId } = useAudioPlayer();

  // Filter songs matching this playlist's specific trackIds
  const songs: Song[] = playlist.trackIds && playlist.trackIds.length > 0
    ? playlist.trackIds
        .map((id) => ALL_SONGS.find((s) => s.id === id))
        .filter((s): s is Song => Boolean(s))
    : ALL_SONGS;

  const isPlaylistActive = activePlaylistId === playlist.id;

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song, playlist.id);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 pb-36 sm:px-8 sm:pt-6">
      {/* Back button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={onBackToPlaylists}
          className="saloon-chip inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="size-3.5" />
          <span>All Playlists</span>
        </button>
      </div>

      {/* Playlist Header in English */}
      <header className="mt-2 mb-8 border-b border-cream/15 pb-6">
        <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-sand/70">
          {songs.length} songs · {playlist.window}
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl leading-tight font-extrabold sm:text-5xl text-cream tracking-tight">
              {playlist.en}
            </h1>
            <p className="mt-1 text-sm tracking-[0.18em] uppercase text-sand/80 font-mono">
              {playlist.window}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => {
                if (isPlaylistActive) {
                  togglePlay();
                } else {
                  switchPlaylist(playlist.id, true);
                }
              }}
              className="saloon-play-btn"
              title={isPlaylistActive && isPlaying ? 'Pause Rotation' : 'Play Rotation'}
            >
              {isPlaylistActive && isPlaying ? (
                <Pause className="size-5 fill-current" />
              ) : (
                <Play className="size-5 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand/80">
          {playlist.description}
        </p>

        {/* Streaming links */}
        <div className="mt-4 flex items-center gap-2 text-xs">
          <a
            href={playlist.spotifyUrl}
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
            href={playlist.ytMusicUrl}
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
      </header>

      {/* Song list in clean English */}
      <div className="space-y-1">
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id;

          return (
            <div
              key={song.id}
              onClick={() => handlePlaySong(song)}
              className={`group flex items-center justify-between rounded-xl px-3 py-3 sm:px-4 sm:py-3 transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-cream/15 border border-cream/25'
                  : 'hover:bg-cream/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Index / Playing Indicator */}
                <span className="w-6 text-center font-mono text-xs text-sand/60">
                  {isCurrent && isPlaying ? (
                    <Volume2 className="size-4 text-live mx-auto animate-pulse" />
                  ) : (
                    String(index + 1).padStart(2, '0')
                  )}
                </span>

                {/* Song Meta */}
                <div className="min-w-0">
                  <p className={`truncate text-sm sm:text-base font-semibold ${isCurrent ? 'text-white' : 'text-cream'}`}>
                    {song.en}
                  </p>
                  <p className="truncate text-xs text-sand/70 mt-0.5">
                    {song.artist} {song.film ? `· ${song.film}` : ''} {song.year ? `(${song.year})` : ''}
                  </p>
                </div>
              </div>

              {/* Right Side: Duration & Play Action */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-sand/60 hidden sm:inline">
                  {song.duration}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySong(song);
                  }}
                  className={`saloon-icon-btn size-8 ${
                    isCurrent ? 'opacity-100 text-live' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label={isCurrent && isPlaying ? `Pause ${song.en}` : `Play ${song.en}`}
                >
                  {isCurrent && isPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="size-4 fill-current ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
