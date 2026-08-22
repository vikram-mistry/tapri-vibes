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
import { TapriAtmosphere } from './components/TapriAtmosphere';
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
      {/* Animated Tapri Atmosphere (Rain, Candle Flame, Steaming Chai, Moody Night Counter) */}
      <TapriAtmosphere dimmed={currentView !== 'radio'} />

      {/* Dim overlay for subpages */}
      {currentView !== 'radio' && (
        <div className="fixed inset-0 z-0 bg-shade/80 backdrop-blur-[3px] pointer-events-none" />
      )}

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
