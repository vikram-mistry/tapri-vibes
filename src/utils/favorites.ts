// Favorites Management Utility for "My Tapri Tape"
const STORAGE_KEY = 'tapri_favorite_song_ids';

let favoritesChannel: BroadcastChannel | null = null;
try {
  favoritesChannel = new BroadcastChannel('tapri_favorites_sync');
} catch {}

export function getFavoriteSongIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavoriteSongIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    favoritesChannel?.postMessage({ favorites: ids });
  } catch {}
}

export function toggleFavoriteSongId(songId: string): string[] {
  const current = getFavoriteSongIds();
  const exists = current.includes(songId);
  const updated = exists ? current.filter(id => id !== songId) : [...current, songId];
  saveFavoriteSongIds(updated);
  return updated;
}

export function subscribeToFavoritesSync(onUpdate: (favorites: string[]) => void) {
  if (!favoritesChannel) return () => {};

  const handleMessage = (ev: MessageEvent) => {
    if (Array.isArray(ev.data?.favorites)) {
      onUpdate(ev.data.favorites);
    }
  };

  favoritesChannel.addEventListener('message', handleMessage);
  return () => {
    favoritesChannel?.removeEventListener('message', handleMessage);
  };
}
