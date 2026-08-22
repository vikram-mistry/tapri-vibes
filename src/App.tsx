import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatsAppBanner } from './components/WhatsAppBanner';
import { BottomPlayer } from './components/BottomPlayer';
import { PlaylistsView } from './components/PlaylistsView';
import { PlaylistDetailView } from './components/PlaylistDetailView';
import { SongsView } from './components/SongsView';
import { Footer } from './components/Footer';
import { InstallModal } from './components/InstallModal';
import { PLAYLISTS } from './data/playlists';
import { Playlist } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'radio' | 'playlists' | 'songs' | 'playlist-detail'>('radio');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);

  const handleNavigate = (view: 'radio' | 'playlists' | 'songs' | 'playlist-detail') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlaylistDetail = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView('playlist-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlaylistFromFooter = (playlistId: 'bollywood' | 'hollywood') => {
    const pl = PLAYLISTS.find(p => p.id === playlistId);
    if (pl) {
      setSelectedPlaylist(pl);
      setCurrentView('playlist-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-[100dvh] w-full bg-shade text-cream overflow-x-hidden">
      {/* Fixed Ambient Illustrated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <picture>
          <source media="(min-width: 768px)" srcSet="./assets/workout-backdrop.jpg" />
          <img
            src="./assets/workout-backdrop-mobile.jpg"
            alt="Illustrated raw iron gym fitness workout atmosphere"
            width={1920}
            height={1088}
            className={`size-full object-cover transition-opacity duration-300 ${
              currentView !== 'radio' ? 'opacity-30' : 'opacity-100'
            }`}
          />
        </picture>

        {/* Dim overlay for subpages */}
        {currentView !== 'radio' && (
          <div className="absolute inset-0 bg-shade/75 backdrop-blur-[2px]" />
        )}

        {/* Deluxe Saloon Vignette & Analog Grain Overlays */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-vignette" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-grain" />
      </div>

      {/* App Container */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        {/* Top Header */}
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenInstall={() => setIsInstallOpen(true)}
        />

        {/* Views */}
        {currentView === 'radio' && (
          <div className="flex flex-1 flex-col justify-between">
            {/* Center Hero */}
            <Hero />

            {/* Spacer */}
            <div className="flex-1 min-h-[80px]" />

            {/* Floating Community Banner above dock */}
            <div className="mb-[10.5rem] sm:mb-[11rem]">
              <WhatsAppBanner />
            </div>
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

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onSelectPlaylist={handleSelectPlaylistFromFooter}
        />
      </div>

      {/* Bottom Floating Glassmorphism Player Dock */}
      <BottomPlayer />

      {/* PWA Install Sheet Modal */}
      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />
    </main>
  );
};
