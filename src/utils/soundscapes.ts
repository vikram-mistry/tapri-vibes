// Procedural Web Audio Ambient Soundscape Synthesizer
// Generates realistic Monsoon Rain on Tin Roof with zero network assets

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private rainGain: GainNode | null = null;
  private roofPatterGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 🌧️ Rain on Tin Roof Synthesizer (Pink Noise + Metallic Resonance Filter)
  private startRain() {
    if (!this.ctx || !this.masterGain) return;

    // Pink noise buffer
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
      output[i] *= 0.14;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter for deep steady rain body
    const lowFilter = this.ctx.createBiquadFilter();
    lowFilter.type = 'lowpass';
    lowFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    // Highpass filter for tin roof metallic splatter
    const tinFilter = this.ctx.createBiquadFilter();
    tinFilter.type = 'highpass';
    tinFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0, this.ctx.currentTime);

    whiteNoise.connect(lowFilter);
    lowFilter.connect(tinFilter);
    tinFilter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    whiteNoise.start(0);

    // Dynamic metallic droplet drops hitting tin shed
    this.roofPatterGain = this.ctx.createGain();
    this.roofPatterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.roofPatterGain.connect(this.masterGain);

    window.setInterval(() => {
      if (!this.ctx || !this.roofPatterGain || this.roofPatterGain.gain.value <= 0.01) return;
      const count = Math.floor(Math.random() * 3) + 1;
      for (let k = 0; k < count; k++) {
        const osc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(Math.random() * 800 + 1200, this.ctx.currentTime);
        dropGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
        osc.connect(dropGain);
        dropGain.connect(this.roofPatterGain);
        osc.start(this.ctx.currentTime + Math.random() * 0.1);
        osc.stop(this.ctx.currentTime + 0.06);
      }
    }, 200);
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    this.startRain();
    this.isRunning = true;
  }

  public setRainVolume(vol: number) { // 0 to 100
    this.start();
    const normalized = Math.max(0, Math.min(1, vol / 100));
    if (this.rainGain && this.ctx) {
      this.rainGain.gain.setTargetAtTime(normalized * 0.85, this.ctx.currentTime, 0.1);
    }
    if (this.roofPatterGain && this.ctx) {
      this.roofPatterGain.gain.setTargetAtTime(normalized * 0.5, this.ctx.currentTime, 0.1);
    }
  }

  public stopAll() {
    this.setRainVolume(0);
  }
}

export const soundscapes = new SoundscapeEngine();
