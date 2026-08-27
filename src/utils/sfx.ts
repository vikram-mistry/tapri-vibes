// Procedural 90s Cassette Deck & Tapri Mechanical Sound Effects (Web Audio API)

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
      
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(140, t);
      osc1.frequency.exponentialRampToValueAtTime(30, t + 0.08);

      gain1.gain.setValueAtTime(0.35, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      osc1.start(t);
      osc1.stop(t + 0.09);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(380, t + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(60, t + 0.06);

      gain2.gain.setValueAtTime(0.25, t + 0.02);
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

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.36);
    } catch {}
  }

  // 🫖 Authentic Hot Chai Pouring Sound Effect (Liquid stream filling the glass)
  public playChaiPouringSound() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const t = this.ctx.currentTime;
      const dur = 1.6;

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.15;
        b6 = white * 0.115926;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(650, t);
      bandpass.frequency.linearRampToValueAtTime(1400, t + dur);
      bandpass.Q.setValueAtTime(3.5, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, t);
      noiseGain.gain.linearRampToValueAtTime(0.45, t + 0.15);
      noiseGain.gain.setValueAtTime(0.45, t + dur - 0.2);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + dur + 0.05);

      const oscCount = 8;
      for (let i = 0; i < oscCount; i++) {
        const osc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();

        const dropTime = t + 0.1 + Math.random() * (dur - 0.3);
        osc.type = 'sine';
        const startF = 300 + Math.random() * 400 + (i * 80);
        osc.frequency.setValueAtTime(startF, dropTime);
        osc.frequency.exponentialRampToValueAtTime(startF + 300, dropTime + 0.08);

        dropGain.gain.setValueAtTime(0.08, dropTime);
        dropGain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.09);

        osc.connect(dropGain);
        dropGain.connect(this.ctx.destination);

        osc.start(dropTime);
        osc.stop(dropTime + 0.1);
      }

      const finishTime = t + dur - 0.1;
      const clinkHarmonics = [2450, 4900, 7350];
      clinkHarmonics.forEach((f, idx) => {
        const oscClink = this.ctx!.createOscillator();
        const clinkGain = this.ctx!.createGain();

        oscClink.type = 'sine';
        oscClink.frequency.setValueAtTime(f, finishTime);

        clinkGain.gain.setValueAtTime(0.25 / (idx + 1), finishTime);
        clinkGain.gain.exponentialRampToValueAtTime(0.0001, finishTime + 0.8);

        oscClink.connect(clinkGain);
        clinkGain.connect(this.ctx!.destination);

        oscClink.start(finishTime);
        oscClink.stop(finishTime + 0.85);
      });
    } catch (err) {
      console.warn('Chai Pouring SFX Error:', err);
    }
  }

  public playChaiGlassClink() {
    this.playChaiPouringSound();
  }

  // 🔔 Vintage Hero Bicycle Bell ("Tring-Tring!")
  public playCycleBell() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;
      // Dual burst of rapid metallic rings
      const rings = [0, 0.14];

      rings.forEach(offset => {
        const ringTime = t + offset;
        const frequencies = [2640, 3180, 5280];

        frequencies.forEach((f, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ringTime);

          const initialGain = idx === 0 ? 0.35 : 0.15 / (idx + 1);
          gain.gain.setValueAtTime(initialGain, ringTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ringTime + 0.45);

          osc.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(ringTime);
          osc.stop(ringTime + 0.5);
        });
      });
    } catch {}
  }

  // 🏮 Mechanical Fairy Light Switch Click
  public playLightSwitch() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.04);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {}
  }

  // 📰 90s Newspaper Page Rustle
  public playPaperRustle() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, t);
      filter.Q.setValueAtTime(2.0, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + 0.3);
    } catch {}
  }

  // 🐈 Roadside Cat Purr & Soft Mrrp
  public playCatPurr() {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;
      // Gentle friendly meow tone + purr resonance
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.linearRampToValueAtTime(780, t + 0.15);
      osc.frequency.linearRampToValueAtTime(420, t + 0.4);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.48);
    } catch {}
  }

  // 🔔 Peaceful Timer Chime
  public playTimerChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const freqs = [528, 792, 1056];

      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.25 / (idx + 1), t);
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
