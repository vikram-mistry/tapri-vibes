import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Song, Playlist } from '../types';
import { ALL_SONGS } from '../data/songs';
import { PLAYLISTS, getMyTapePlaylist } from '../data/playlists';
import { getFavoriteSongIds, toggleFavoriteSongId, subscribeToFavoritesSync } from '../utils/favorites';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PlayerState {
  ready: boolean;
  isPlaying: boolean;
  muted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
}

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  activePlaylistId: string;
  activePlaylist: Playlist;
  currentQueue: Song[];
  favorites: string[];
  isShuffled: boolean;
  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  toggleShuffle: () => void;
  playSong: (song: Song, playlistId?: string) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  switchPlaylist: (playlistId: string, autoPlay?: boolean) => void;
  playQueue: (videoIds: string[], startIndex?: number) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* ------------------------------------------------------------------ */
/*  YouTube IFrame API loader (singleton promise)                      */
/* ------------------------------------------------------------------ */

let ytReadyPromise: Promise<void> | null = null;

function loadYTApi(): Promise<void> {
  if (ytReadyPromise) return ytReadyPromise;

  ytReadyPromise = new Promise<void>((resolve) => {
    if (window.YT?.Player) { resolve(); return; }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);
  });

  return ytReadyPromise;
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const AudioPlayerContext = createContext<AudioContextType | null>(null);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /* ---- mutable refs ---- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const queueRef = useRef<Song[]>(ALL_SONGS);
  const indexRef = useRef<number>(0);
  const tickRef = useRef<number | null>(null);
  const mountedRef = useRef<boolean>(true);

  /* ---- React state ---- */
  const [state, setState] = useState<PlayerState>({
    ready: false,
    isPlaying: false,
    muted: false,
    volume: 100,
    currentTime: 0,
    duration: 0,
  });

  const [favorites, setFavorites] = useState<string[]>([]);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [activePlaylistId, setActivePlaylistId] = useState<string>(PLAYLISTS[0]?.id || 'all-tapri-classics');
  const [currentSong, setCurrentSong] = useState<Song | null>(ALL_SONGS[0] || null);

  // Sync favorites on mount and cross-tabs
  useEffect(() => {
    setFavorites(getFavoriteSongIds());
    const unsubscribe = subscribeToFavoritesSync((favs) => {
      setFavorites(favs);
    });
    return () => unsubscribe();
  }, []);

  const activePlaylist = activePlaylistId === 'my-tapri-tape'
    ? getMyTapePlaylist(favorites)
    : PLAYLISTS.find(p => p.id === activePlaylistId) || PLAYLISTS[0];

  const currentQueue = queueRef.current;

  /* ---- progress tick ---- */
  const startTick = useCallback(() => {
    if (tickRef.current) return;
    tickRef.current = window.setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== 'function') return;
      try {
        const cur = p.getCurrentTime() || 0;
        const dur = p.getDuration() || 0;
        if (mountedRef.current) {
          setState(prev => ({
            ...prev,
            currentTime: cur,
            ...(dur > 0 && dur < 7200 ? { duration: dur } : {}),
          }));
        }
      } catch {}
    }, 250);
  }, []);

  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  /* ---- goToIndex: playback heart ---- */
  const goToIndex = useCallback((idx: number) => {
    const queue = queueRef.current;
    if (queue.length === 0) return;

    const safeIdx = ((idx % queue.length) + queue.length) % queue.length;
    indexRef.current = safeIdx;
    const song = queue[safeIdx];

    setCurrentSong(song);

    setState(prev => ({
      ...prev,
      currentTime: 0,
      duration: 0,
    }));

    const p = playerRef.current;
    if (p && typeof p.loadVideoById === 'function') {
      p.loadVideoById(song.videoId);
      p.playVideo();
    }
  }, []);

  /* ---- advance / rewind ---- */
  const advance = useCallback(() => goToIndex(indexRef.current + 1), [goToIndex]);
  const rewind = useCallback(() => goToIndex(indexRef.current - 1), [goToIndex]);

  /* ---- Initialize YouTube Player (once) ---- */
  useEffect(() => {
    mountedRef.current = true;
    
    // Check URL search params for deep linking (e.g. ?song=tapri-10 or ?rotation=subah-ki-chai)
    const params = new URLSearchParams(window.location.search);
    const paramSongId = params.get('song');
    const paramRotationId = params.get('rotation');

    let initialSong = ALL_SONGS[0];

    if (paramRotationId) {
      const targetPl = PLAYLISTS.find(p => p.id === paramRotationId || p.slug === paramRotationId);
      if (targetPl && targetPl.trackIds.length > 0) {
        const plSongs = targetPl.trackIds.map(id => ALL_SONGS.find(s => s.id === id)).filter((s): s is Song => Boolean(s));
        if (plSongs.length > 0) {
          queueRef.current = plSongs;
          setActivePlaylistId(paramRotationId);
          initialSong = plSongs[0];
        }
      }
    }

    if (paramSongId) {
      const matched = ALL_SONGS.find(s => s.id === paramSongId || s.videoId === paramSongId);
      if (matched) {
        initialSong = matched;
        const idx = queueRef.current.findIndex(s => s.id === matched.id);
        if (idx >= 0) indexRef.current = idx;
      }
    }

    setCurrentSong(initialSong);

    let destroyed = false;

    loadYTApi().then(() => {
      if (destroyed || !containerRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: initialSong.videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (destroyed) return;
            setState(prev => ({ ...prev, ready: true }));
            playerRef.current?.setVolume(100);
          },

          onStateChange: (event: any) => {
            if (destroyed) return;
            const PS = window.YT?.PlayerState;
            if (!PS) return;

            if (event.data === PS.ENDED) {
              advance();
              return;
            }

            if (event.data === PS.PLAYING) {
              setState(prev => ({ ...prev, isPlaying: true }));
              startTick();
            } else if (event.data === PS.PAUSED) {
              setState(prev => ({ ...prev, isPlaying: false }));
              stopTick();
            } else if (event.data === PS.BUFFERING) {
              // keep ticking or waiting
            }
          },

          onError: (event: any) => {
            console.warn('[Tapri Player] YT Error code:', event.data, 'Skipping to next track…');
            advance();
          },
        },
      });
    });

    return () => {
      destroyed = true;
      mountedRef.current = false;
      stopTick();
      try {
        playerRef.current?.destroy();
      } catch {}
      playerRef.current = null;
    };
  }, [advance, startTick, stopTick]);

  // Media Session API integration
  useEffect(() => {
    if (!('mediaSession' in navigator) || !currentSong) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.en,
      artist: currentSong.artist,
      album: currentSong.film || 'Tapri Vibes',
      artwork: [
        {
          src: currentSong.coverUrl || `https://i.ytimg.com/vi/${currentSong.videoId}/hqdefault.jpg`,
          sizes: '512x512',
          type: 'image/jpeg',
        },
      ],
    });

    navigator.mediaSession.setActionHandler('play', () => {
      playerRef.current?.playVideo();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      playerRef.current?.pauseVideo();
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      rewind();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      advance();
    });
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.seekTime !== undefined && details.seekTime !== null) {
        playerRef.current?.seekTo(details.seekTime, true);
        setState(prev => ({ ...prev, currentTime: details.seekTime! }));
      }
    });
  }, [currentSong, advance, rewind]);

  /* ---- Safari user-gesture unlock ---- */
  useEffect(() => {
    if (!state.ready) return;
    const unlock = () => {
      playerRef.current?.playVideo();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, [state.ready]);

  /* ---- Public API ---- */

  const toggleFavorite = useCallback((songId: string) => {
    const updated = toggleFavoriteSongId(songId);
    setFavorites(updated);

    // If currently playing My Tapri Tape and removed currently playing queue
    if (activePlaylistId === 'my-tapri-tape') {
      const favSongs = updated.map(id => ALL_SONGS.find(s => s.id === id)).filter((s): s is Song => Boolean(s));
      queueRef.current = favSongs.length > 0 ? favSongs : ALL_SONGS;
    }
  }, [activePlaylistId]);

  const isFavorite = useCallback((songId: string) => {
    return favorites.includes(songId);
  }, [favorites]);

  const toggleShuffle = useCallback(() => {
    setIsShuffled(prev => {
      const nextState = !prev;
      if (nextState) {
        // Shuffle current queue keeping currentSong at index 0
        const cur = currentSong;
        const rest = queueRef.current.filter(s => s.id !== cur?.id);
        for (let i = rest.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [rest[i], rest[j]] = [rest[j], rest[i]];
        }
        queueRef.current = cur ? [cur, ...rest] : rest;
        indexRef.current = 0;
      }
      return nextState;
    });
  }, [currentSong]);

  const playSong = useCallback((song: Song, playlistId?: string) => {
    if (playlistId) {
      if (playlistId === 'my-tapri-tape') {
        const favSongs = favorites.map(id => ALL_SONGS.find(s => s.id === id)).filter((s): s is Song => Boolean(s));
        queueRef.current = favSongs.length > 0 ? favSongs : ALL_SONGS;
        setActivePlaylistId('my-tapri-tape');
      } else {
        const pl = PLAYLISTS.find(p => p.id === playlistId || p.slug === playlistId);
        if (pl && pl.trackIds.length > 0) {
          const playlistSongs = pl.trackIds.map(id => ALL_SONGS.find(s => s.id === id)).filter((s): s is Song => Boolean(s));
          queueRef.current = playlistSongs.length > 0 ? playlistSongs : ALL_SONGS;
          setActivePlaylistId(playlistId);
        }
      }
      const idx = queueRef.current.findIndex(s => s.id === song.id);
      goToIndex(idx >= 0 ? idx : 0);
      return;
    }

    let idx = queueRef.current.findIndex(s => s.id === song.id);
    if (idx < 0) {
      queueRef.current = ALL_SONGS;
      idx = ALL_SONGS.findIndex(s => s.id === song.id);
    }
    goToIndex(idx >= 0 ? idx : 0);
  }, [goToIndex, favorites]);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (state.isPlaying) {
      p.pauseVideo();
    } else {
      p.playVideo();
    }
  }, [state.isPlaying]);

  const playNext = useCallback(() => {
    advance();
  }, [advance]);

  const playPrevious = useCallback(() => {
    if (state.currentTime > 3) {
      const p = playerRef.current;
      if (p && typeof p.seekTo === 'function') {
        p.seekTo(0, true);
        setState(prev => ({ ...prev, currentTime: 0 }));
        return;
      }
    }
    rewind();
  }, [state.currentTime, rewind]);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
    setState(prev => ({ ...prev, currentTime: seconds }));
  }, []);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(val)));
    const p = playerRef.current;
    if (p) {
      p.setVolume(clamped);
      if (clamped > 0 && p.isMuted?.()) p.unMute();
    }
    setState(prev => ({ ...prev, volume: clamped, muted: clamped === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted?.()) {
      p.unMute();
      setState(prev => ({ ...prev, muted: false }));
    } else {
      p.mute();
      setState(prev => ({ ...prev, muted: true }));
    }
  }, []);

  const switchPlaylist = useCallback((playlistId: string, autoPlay = true) => {
    if (playlistId === 'my-tapri-tape') {
      const favSongs = favorites.map(id => ALL_SONGS.find(s => s.id === id)).filter((s): s is Song => Boolean(s));
      queueRef.current = favSongs.length > 0 ? favSongs : ALL_SONGS;
      setActivePlaylistId('my-tapri-tape');
    } else {
      const pl = PLAYLISTS.find(p => p.id === playlistId || p.slug === playlistId);
      const songs = pl && pl.trackIds.length > 0
        ? pl.trackIds.map(id => ALL_SONGS.find(s => s.id === id)).filter((s): s is Song => Boolean(s))
        : ALL_SONGS;

      queueRef.current = songs.length > 0 ? songs : ALL_SONGS;
      setActivePlaylistId(playlistId);
    }

    if (queueRef.current.length > 0) {
      if (autoPlay) {
        goToIndex(0);
      } else {
        setCurrentSong(queueRef.current[0]);
        indexRef.current = 0;
      }
    }
  }, [goToIndex, favorites]);

  const playQueue = useCallback((ids: string[], startIndex = 0) => {
    const song = ALL_SONGS.find(s => s.id === ids[startIndex] || s.videoId === ids[startIndex]);
    if (song) playSong(song);
  }, [playSong]);

  /* ---- Render ---- */
  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying: state.isPlaying,
        isMuted: state.muted,
        volume: state.volume,
        currentTime: state.currentTime,
        duration: state.duration,
        activePlaylistId,
        activePlaylist,
        currentQueue,
        favorites,
        isShuffled,
        toggleFavorite,
        isFavorite,
        toggleShuffle,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        seekTo,
        setVolume,
        toggleMute,
        switchPlaylist,
        playQueue,
      }}
    >
      {/* Hidden YouTube IFrame container */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
