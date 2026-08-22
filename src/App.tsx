import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BottomPlayer } from './components/BottomPlayer';
import { CassetteDeck } from './components/CassetteDeck';
import { PlaylistsView } from './components/PlaylistsView';
import { PlaylistDetailView } from './components/PlaylistDetailView';
import { SongsView } from './components/SongsView';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';
import { AmbientMixerModal } from './components/AmbientMixerModal';
import { ChaiTimerModal } from './components/ChaiTimerModal';
import { ChalkboardGuestbook } from './components/ChalkboardGuestbook';
import { QuickRotationsModal } from './components/QuickRotationsModal';
import { HowToUseModal } from './components/HowToUseModal';
import { TapriAtmosphere } from './components/TapriAtmosphere';
import { PLAYLISTS } from './data/playlists';
import { Playlist } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'radio' | 'playlists' | 'songs' | 'playlist-detail'>('radio');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  
  // Modals & Feature states
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);
  const [isAmbianceOpen, setIsAmbianceOpen] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [isChalkboardOpen, setIsChalkboardOpen] = useState<boolean>(false);
  const [isRotationsOpen, setIsRotationsOpen] = useState<boolean>(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState<boolean>(false);
  const [isCassetteMode, setIsCassetteMode] = useState<boolean>(false);

  const handleNavigate = (view: 'radio' | 'playlists' | 'songs' | 'playlist-detail') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlaylistDetail = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView('playlist-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlaylistFromFooter = (playlistId: string) => {
    const pl = PLAYLISTS.find(p => p.id === playlistId || p.slug === playlistId);
    if (pl) {
      setSelectedPlaylist(pl);
      setCurrentView('playlist-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-[100dvh] w-full bg-shade text-cream overflow-x-hidden">
      {/* Animated Tapri Atmosphere (Illustrated 90s Street Backdrop + Rain Engine) */}
      <TapriAtmosphere dimmed={currentView !== 'radio'} />

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
          onOpenInstall={() => setIsInstallOpen(true)}
          onOpenChalkboard={() => setIsChalkboardOpen(true)}
          onOpenHowToUse={() => setIsHowToUseOpen(true)}
        />

        {/* Radio Home View (Full 100vh viewport - Clean & Unobstructed) */}
        {currentView === 'radio' && (
          <div className="flex min-h-[calc(100dvh-5.5rem)] flex-col justify-between pb-36">
            {/* Center Hero or Compact Hero with Retro Cassette Deck */}
            {isCassetteMode ? (
              <div className="pt-2 sm:pt-4 select-none animate-in fade-in zoom-in-95 duration-200">
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
              <Hero />
            )}

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
          />
        )}

        {currentView === 'songs' && (
          <SongsView />
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
        isCassetteMode={isCassetteMode}
        onToggleCassetteMode={() => setIsCassetteMode(!isCassetteMode)}
      />

      {/* Feature Modals */}
      <QuickRotationsModal
        isOpen={isRotationsOpen}
        onClose={() => setIsRotationsOpen(false)}
        onSelectPlaylistDetail={handleOpenPlaylistDetail}
      />

      <HowToUseModal
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />

      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />

      <AmbientMixerModal
        isOpen={isAmbianceOpen}
        onClose={() => setIsAmbianceOpen(false)}
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
