import { createClient } from '@supabase/supabase-js';

// Public Realtime configuration for anonymous presence synchronization
const SUPABASE_URL = 'https://yjvjrqkydlqrqmubjhql.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdmpycWt5ZGxxcnFtdWJqaHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NTYwMDAsImV4cCI6MjAyNTQzMjAwMH0.dummy_sign';

let supabaseClient: any = null;

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

export function subscribeToLobbyPresence(onCountChange: (count: number) => void) {
  const visitorId = `visitor-${Math.random().toString(36).substring(2, 9)}`;

  // Multi-tab synchronization using Web BroadcastChannel
  let broadcastChannel: BroadcastChannel | null = null;
  try {
    broadcastChannel = new BroadcastChannel('workout_vibes_presence');
    broadcastChannel.onmessage = (ev) => {
      if (typeof ev.data?.count === 'number') {
        onCountChange(ev.data.count);
      }
    };
  } catch {}

  if (!supabaseClient) {
    onCountChange(1);
    return () => {
      broadcastChannel?.close();
    };
  }

  try {
    const channel = supabaseClient.channel('workout-lobby', {
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
    console.warn('Realtime presence connection notice:', err);
    onCountChange(1);
    return () => {
      broadcastChannel?.close();
    };
  }
}
