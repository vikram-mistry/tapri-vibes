// Procedural 90s Cassette Deck Mechanical Sound Effects (Web Audio API)

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 📼 Mechanical Cassette Deck Button Click ("Ka-Chunk")
  public playCassetteClick() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      
      // Impact 1: Sharp mechanical spring latch
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(140, t);
      osc1.frequency.exponentialRampToValueAtTime(30, t + 0.08);

      gain1.gain.setValueAtTime(0.3, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(t);
      osc1.stop(t + 0.09);

      // Impact 2: Plastic casing body resonance
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(380, t + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(60, t + 0.06);

      gain2.gain.setValueAtTime(0.2, t + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc2.start(t + 0.02);
      osc2.stop(t + 0.08);
    } catch {}
  }

  // ⏩ Fast Tape Rewind / Motor Whirr
  public playTapeWhirr() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, t);
      osc.frequency.linearRampToValueAtTime(750, t + 0.15);
      osc.frequency.linearRampToValueAtTime(200, t + 0.35);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.36);
    } catch {}
  }

  // 🔔 Peaceful Timer Chime
  public playTimerChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const freqs = [528, 792, 1056]; // Harmonics

      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.2 / (idx + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 2.6);
      });
    } catch {}
  }
}

export const sfx = new SoundEffectsEngine();
