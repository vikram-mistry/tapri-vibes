import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BottomPlayer } from './components/BottomPlayer';
import { CassetteDeck } from './components/CassetteDeck';
import { PlaylistsView } from './components/PlaylistsView';
import { PlaylistDetailView } from './components/PlaylistDetailView';
import { SongsView } from './components/SongsView';
import { Footer } from './components/Footer';
import { AmbientMixerModal } from './components/AmbientMixerModal';
import { ChaiTimerModal } from './components/ChaiTimerModal';
import { ChalkboardGuestbook } from './components/ChalkboardGuestbook';
import { QuickRotationsModal } from './components/QuickRotationsModal';
import { HowToUseModal } from './components/HowToUseModal';
import { SharePostcardModal } from './components/SharePostcardModal';
import { CuttingChaiInteractive } from './components/CuttingChaiInteractive';
import { TapriAtmosphere } from './components/TapriAtmosphere';
import { PLAYLISTS, getMyTapePlaylist } from './data/playlists';
import { Playlist, Song, WeatherMode } from './types';
import { useAudioPlayer } from './context/AudioPlayerContext';
import { sfx } from './utils/sfx';

export const App: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, toggleMute, favorites } = useAudioPlayer();

  const [currentView, setCurrentView] = useState<'radio' | 'playlists' | 'songs' | 'playlist-detail'>('radio');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  
  // Modals & Feature states
  const [weatherMode, setWeatherMode] = useState<WeatherMode>('monsoon');
  const [isAmbianceOpen, setIsAmbianceOpen] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isChalkboardOpen, setIsChalkboardOpen] = useState<boolean>(false);
  const [isRotationsOpen, setIsRotationsOpen] = useState<boolean>(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState<boolean>(false);
  const [isPostcardOpen, setIsPostcardOpen] = useState<boolean>(false);
  const [postcardSong, setPostcardSong] = useState<Song | null>(null);

  // Desktop Global Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        sfx.playCassetteClick();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        sfx.playTapeWhirr();
        playNext();
      } else if (e.code === 'ArrowLeft') {
        sfx.playTapeWhirr();
        playPrevious();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'r' || e.key === 'R') {
        setIsRotationsOpen(prev => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        setIsAmbianceOpen(prev => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        setIsTimerOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, playNext, playPrevious, toggleMute]);

  const handleNavigate = (view: 'radio' | 'playlists' | 'songs' | 'playlist-detail') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlaylistDetail = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView('playlist-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDedication = (song: Song) => {
    setPostcardSong(song);
    setIsPostcardOpen(true);
  };

  const handleSelectPlaylistFromFooter = (playlistId: string) => {
    if (playlistId === 'my-tapri-tape') {
      setSelectedPlaylist(getMyTapePlaylist(favorites));
    } else {
      const pl = PLAYLISTS.find(p => p.id === playlistId || p.slug === playlistId);
      if (pl) setSelectedPlaylist(pl);
    }
    setCurrentView('playlist-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-[100dvh] w-full bg-shade text-cream overflow-x-hidden">
      {/* Animated Tapri Atmosphere (Illustrated 90s Street Backdrop + Dynamic Weather Engine) */}
      <TapriAtmosphere dimmed={currentView !== 'radio'} weatherMode={weatherMode} />

      {/* Dim overlay for subpages (Playlists / Songs directory) */}
      {currentView !== 'radio' && (
        <div className="fixed inset-0 z-0 bg-shade/85 backdrop-blur-[3px] pointer-events-none" />
      )}

      {/* App Container */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        {/* Top Header */}
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenChalkboard={() => setIsChalkboardOpen(true)}
          onOpenHowToUse={() => setIsHowToUseOpen(true)}
        />

        {/* Radio Home View (Full 100vh viewport - Clean & Unobstructed) */}
        {currentView === 'radio' && (
          <div className="flex min-h-[calc(100dvh-5.5rem)] flex-col justify-between pb-36">
            {/* Center: Hero Title or Cassette Deck */}
            {isPlaying ? (
              <div className="pt-2 sm:pt-4 select-none animate-in fade-in zoom-in-95 duration-300">
                {/* Compact Hero Title shifted above Tape Deck */}
                <div className="text-center mb-3 sm:mb-4">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-cream tracking-widest uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    TAPRI VIBES
                  </h2>
                  <p className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.3em] text-sand/75 uppercase mt-0.5">
                    Cutting Chai & 90s Radio
                  </p>
                </div>

                {/* Animated 90s Cassette Deck */}
                <CassetteDeck />
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <Hero />
              </div>
            )}

            {/* Authentic Cutting Chai Glass Interactive Hotspot (Pouring sound + Desi Tapri Slangs) */}
            <div className="my-auto py-2 flex justify-center z-30 pointer-events-auto">
              <div
                style={{
                  pointerEvents: 'auto',
                  background: 'rgba(28, 18, 8, 0.3)',
                  padding: 8,
                  borderRadius: '50%',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255, 244, 223, 0.15)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CuttingChaiInteractive />
              </div>
            </div>

            {/* Spacer allowing full view of the illustrated 90s Tapri */}
            <div className="flex-1" />
          </div>
        )}

        {currentView === 'playlists' && (
          <PlaylistsView
            onSelectPlaylistDetail={handleOpenPlaylistDetail}
            onBackToRadio={() => handleNavigate('radio')}
          />
        )}

        {currentView === 'playlist-detail' && selectedPlaylist && (
          <PlaylistDetailView
            playlist={selectedPlaylist}
            onBackToPlaylists={() => handleNavigate('playlists')}
            onBackToRadio={() => handleNavigate('radio')}
            onOpenDedication={handleOpenDedication}
          />
        )}

        {currentView === 'songs' && (
          <SongsView onOpenDedication={handleOpenDedication} />
        )}

        {/* Footer (Placed below the fold / bottom of the page) */}
        <Footer
          onNavigate={handleNavigate}
          onSelectPlaylist={handleSelectPlaylistFromFooter}
        />
      </div>

      {/* Bottom Floating Glassmorphism Player Dock */}
      <BottomPlayer
        onOpenRotations={() => setIsRotationsOpen(true)}
        onOpenAmbiance={() => setIsAmbianceOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenSharePostcard={() => currentSong && handleOpenDedication(currentSong)}
      />

      {/* Feature Modals */}
      <QuickRotationsModal
        isOpen={isRotationsOpen}
        onClose={() => setIsRotationsOpen(false)}
        onSelectPlaylistDetail={handleOpenPlaylistDetail}
      />

      <AmbientMixerModal
        isOpen={isAmbianceOpen}
        onClose={() => setIsAmbianceOpen(false)}
        weatherMode={weatherMode}
        onSelectWeatherMode={(mode) => setWeatherMode(mode)}
      />

      <SharePostcardModal
        isOpen={isPostcardOpen}
        onClose={() => setIsPostcardOpen(false)}
        song={postcardSong}
      />

      <HowToUseModal
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />

      <ChaiTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      <ChalkboardGuestbook
        isOpen={isChalkboardOpen}
        onClose={() => setIsChalkboardOpen(false)}
      />
    </main>
  );
};
