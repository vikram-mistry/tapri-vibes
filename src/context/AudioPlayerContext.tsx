import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Song, Playlist } from '../types';
import { ALL_SONGS } from '../data/songs';
import { PLAYLISTS } from '../data/playlists';

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
  activePlaylistId: 'bollywood' | 'hollywood';
  activePlaylist: Playlist;
  currentQueue: Song[];
  playSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  switchPlaylist: (playlistId: 'bollywood' | 'hollywood', autoPlay?: boolean) => void;
  playQueue: (videoIds: string[], startIndex?: number) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* ------------------------------------------------------------------ */
/*  YouTube IFrame API loader (singleton promise, like Deluxe Salon)   */
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
  /* ---- mutable refs (match Deluxe Salon's pattern) ---- */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const queueRef = useRef<Song[]>([]);            // current queue of Song objects
  const indexRef = useRef<number>(0);              // current index in queue
  const tickRef = useRef<number | null>(null);     // progress interval id
  const mountedRef = useRef<boolean>(true);        // cleanup flag

  /* ---- React state ---- */
  const [state, setState] = useState<PlayerState>({
    ready: false,
    isPlaying: false,
    muted: false,
    volume: 100,
    currentTime: 0,
    duration: 0,
  });

  const bollywoodSongs = ALL_SONGS.filter(s => s.playlistId === 'bollywood');
  const [activePlaylistId, setActivePlaylistId] = useState<'bollywood' | 'hollywood'>('bollywood');
  const [currentSong, setCurrentSong] = useState<Song | null>(bollywoodSongs[0] || null);

  const currentQueue = ALL_SONGS.filter(s => s.playlistId === activePlaylistId);
  const activePlaylist = PLAYLISTS.find(p => p.id === activePlaylistId) || PLAYLISTS[0];

  /* ---- progress tick (starts/stops with play state) ---- */
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
      } catch { /* player not ready yet */ }
    }, 250);
  }, []);

  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  /* ---- goToIndex: the heart of playback (mirrors Deluxe Salon's `c` fn) ---- */
  const goToIndex = useCallback((idx: number) => {
    const queue = queueRef.current;
    if (queue.length === 0) return;

    const safeIdx = ((idx % queue.length) + queue.length) % queue.length;
    indexRef.current = safeIdx;
    const song = queue[safeIdx];

    setCurrentSong(song);
    setActivePlaylistId(song.playlistId);

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

    // Set initial queue to bollywood
    queueRef.current = bollywoodSongs;

    let destroyed = false;

    loadYTApi().then(() => {
      if (destroyed || !containerRef.current || !window.YT) return;

      const initialSong = queueRef.current[0];
      const initialVideoId = initialSong?.videoId || 'yexZf8g_dJw';

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: initialVideoId,
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
              // Update duration from video info
              try {
                const dur = playerRef.current?.getDuration() || 0;
                if (dur > 0 && dur < 7200) {
                  setState(prev => ({ ...prev, duration: dur }));
                }
              } catch { /* noop */ }
            } else if (event.data === PS.PAUSED) {
              setState(prev => ({ ...prev, isPlaying: false }));
              stopTick();
            } else if (event.data === PS.BUFFERING) {
              // keep isPlaying true during buffering
            }
          },

          onError: () => {
            // On any embed error, skip to next track (same as Deluxe Salon)
            if (!destroyed) advance();
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
        playerRef.current = null;
      } catch { /* noop */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advance, startTick, stopTick]);

  /* ---- user-interaction unlock for Safari/iOS ---- */
  useEffect(() => {
    if (!state.ready) return;

    // Safari blocks autoplay until a user gesture. On first pointer event,
    // attempt playVideo so subsequent programmatic calls work.
    const unlock = () => {
      playerRef.current?.playVideo();
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, [state.ready]);

  /* ---- Public API ---- */

  const playSong = useCallback((song: Song) => {
    // Ensure queue is set to the song's playlist
    const playlistSongs = ALL_SONGS.filter(s => s.playlistId === song.playlistId);
    queueRef.current = playlistSongs;
    setActivePlaylistId(song.playlistId);

    const idx = playlistSongs.findIndex(s => s.id === song.id);
    goToIndex(idx >= 0 ? idx : 0);
  }, [goToIndex]);

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
    // If > 3 seconds in, restart. Otherwise go to previous.
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

  const switchPlaylist = useCallback((playlistId: 'bollywood' | 'hollywood', autoPlay = true) => {
    const songs = ALL_SONGS.filter(s => s.playlistId === playlistId);
    queueRef.current = songs;
    setActivePlaylistId(playlistId);
    if (songs.length > 0) {
      if (autoPlay) {
        goToIndex(0);
      } else {
        setCurrentSong(songs[0]);
        indexRef.current = 0;
      }
    }
  }, [goToIndex]);

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
      {children}

      {/*
        YouTube Player container — positioned off-screen but with real
        dimensions so browsers (esp. Safari/Firefox) treat it as a
        legitimate media element and allow audio playback.
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: '-300px',
          left: '-300px',
          width: '200px',
          height: '200px',
          opacity: 0.01,
          pointerEvents: 'none',
          zIndex: -9999,
        }}
      >
        <div ref={containerRef} />
      </div>
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
