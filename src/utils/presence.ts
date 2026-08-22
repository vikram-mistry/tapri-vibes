import { createClient } from '@supabase/supabase-js';

// If valid Supabase credentials are provided in env, use live Supabase presence
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient: any = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('dummy')) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    });
  } catch (e) {
    console.warn('Realtime client init notice:', e);
  }
}

/**
 * Calculates a realistic time-of-day listener baseline:
 * - Morning Chai (7am - 10am): 24 - 45 listeners
 * - Afternoon (12pm - 4pm): 15 - 30 listeners
 * - Evening Prime Chai Tapri Hours (5pm - 11pm): 48 - 85 listeners
 * - Late Night (12am - 5am): 12 - 25 listeners
 */
function getOrganicBaseCount(): number {
  const hour = new Date().getHours();
  if (hour >= 17 && hour <= 23) {
    // Evening prime tea time
    return 54 + (hour % 5) * 4;
  } else if (hour >= 7 && hour <= 10) {
    // Morning chai time
    return 32 + (hour % 4) * 3;
  } else if (hour >= 11 && hour <= 16) {
    // Afternoon
    return 22 + (hour % 3) * 3;
  } else {
    // Late night
    return 14 + (hour % 3) * 2;
  }
}

export function subscribeToLobbyPresence(onCountChange: (count: number) => void) {
  const visitorId = `visitor-${Math.random().toString(36).substring(2, 9)}`;

  // Tab & Window sync using Web BroadcastChannel
  let broadcastChannel: BroadcastChannel | null = null;
  try {
    broadcastChannel = new BroadcastChannel('tapri_vibes_presence');
    broadcastChannel.onmessage = (ev) => {
      if (typeof ev.data?.count === 'number') {
        onCountChange(ev.data.count);
      }
    };
  } catch {}

  // 1. If real Supabase configured, use live multi-device presence
  if (supabaseClient) {
    try {
      const channel = supabaseClient.channel('tapri-lobby', {
        config: {
          presence: {
            key: visitorId
          }
        }
      });

      channel
        .on('presence', { event: 'sync' }, () => {
          const state = channel.presenceState();
          const activeCount = Object.keys(state).length;
          const total = Math.max(1, activeCount);
          onCountChange(total);
          try {
            broadcastChannel?.postMessage({ count: total });
          } catch {}
        })
        .subscribe(async (status: string) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({
              online_at: new Date().toISOString(),
              visitor: visitorId
            });
          }
        });

      return () => {
        try {
          channel.untrack();
          supabaseClient.removeChannel(channel);
          broadcastChannel?.close();
        } catch {}
      };
    } catch (err) {
      console.warn('Realtime presence fallback to organic count:', err);
    }
  }

  // 2. Dynamic Live Organic Presence Engine (Active heartbeat with micro-fluctuations)
  let currentCount = getOrganicBaseCount() + Math.floor(Math.random() * 5);
  onCountChange(currentCount);

  // Periodically fluctuate subtly to simulate real listeners joining and leaving
  const intervalId = setInterval(() => {
    const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
    const base = getOrganicBaseCount();
    currentCount = Math.max(base - 8, Math.min(base + 12, currentCount + delta));
    onCountChange(currentCount);

    try {
      broadcastChannel?.postMessage({ count: currentCount });
    } catch {}
  }, 4500);

  return () => {
    clearInterval(intervalId);
    broadcastChannel?.close();
  };
}
