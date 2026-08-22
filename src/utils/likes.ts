// Global Like Counter Utility (Server-synced with localStorage & BroadcastChannel)

const API_BASE = 'https://api.counterapi.dev/v1/taprivibes/likes';
const STORAGE_LIKED_KEY = 'tapri_has_liked';
const STORAGE_COUNT_KEY = 'tapri_likes_cache';
const BASE_LIKES = 148;

let bc: BroadcastChannel | null = null;
try {
  bc = new BroadcastChannel('tapri_likes_channel');
} catch {}

export async function fetchGlobalLikes(): Promise<number> {
  try {
    const res = await fetch(API_BASE);
    if (res.ok) {
      const data = await res.json();
      if (typeof data?.count === 'number') {
        const count = Math.max(BASE_LIKES, data.count);
        localStorage.setItem(STORAGE_COUNT_KEY, count.toString());
        return count;
      }
    }
  } catch (err) {
    console.warn('Like count sync notice (using cached baseline):', err);
  }

  const cached = localStorage.getItem(STORAGE_COUNT_KEY);
  return cached ? parseInt(cached, 10) : BASE_LIKES;
}

export async function incrementGlobalLikes(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/up`);
    if (res.ok) {
      const data = await res.json();
      if (typeof data?.count === 'number') {
        const count = Math.max(BASE_LIKES, data.count);
        localStorage.setItem(STORAGE_COUNT_KEY, count.toString());
        localStorage.setItem(STORAGE_LIKED_KEY, 'true');
        bc?.postMessage({ count, hasLiked: true });
        return count;
      }
    }
  } catch {}

  // Fallback increment
  const current = localStorage.getItem(STORAGE_COUNT_KEY);
  const newCount = (current ? parseInt(current, 10) : BASE_LIKES) + 1;
  localStorage.setItem(STORAGE_COUNT_KEY, newCount.toString());
  localStorage.setItem(STORAGE_LIKED_KEY, 'true');
  bc?.postMessage({ count: newCount, hasLiked: true });
  return newCount;
}

export function getUserLikedStatus(): boolean {
  return localStorage.getItem(STORAGE_LIKED_KEY) === 'true';
}

export function subscribeToLikesSync(onUpdate: (count: number, hasLiked: boolean) => void) {
  if (!bc) return () => {};

  const handleMessage = (ev: MessageEvent) => {
    if (typeof ev.data?.count === 'number') {
      onUpdate(ev.data.count, Boolean(ev.data.hasLiked));
    }
  };

  bc.addEventListener('message', handleMessage);
  return () => {
    bc?.removeEventListener('message', handleMessage);
  };
}
