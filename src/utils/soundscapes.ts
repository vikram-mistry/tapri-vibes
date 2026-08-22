// Procedural Web Audio Ambient Soundscape Synthesizer
// Generates Rain on Tin Roof, Chai Kettle Simmer, and Vinyl Crackle with zero network assets

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  
  // Gain nodes
  private rainGain: GainNode | null = null;
  private kettleGain: GainNode | null = null;
  private vinylGain: GainNode | null = null;
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

  // 🌧️ 1. Rain Synthesizer (Pink Noise + Low-Pass Filter)
  private startRain() {
    if (!this.ctx || !this.masterGain) return;

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
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    whiteNoise.start(0);
  }

  // 🫖 2. Chai Kettle Simmer (Low Bubbling + Steam Hiss)
  private startKettle() {
    if (!this.ctx || !this.masterGain) return;

    // Steam Hiss
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const steam = this.ctx.createBufferSource();
    steam.buffer = noiseBuffer;
    steam.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(800, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(3.0, this.ctx.currentTime);

    this.kettleGain = this.ctx.createGain();
    this.kettleGain.gain.setValueAtTime(0, this.ctx.currentTime);

    steam.connect(bandpass);
    bandpass.connect(this.kettleGain);
    this.kettleGain.connect(this.masterGain);

    steam.start(0);
  }

  // 📻 3. Vintage Vinyl Crackle (Impulse Pop Generator)
  private startVinyl() {
    if (!this.ctx || !this.masterGain) return;

    this.vinylGain = this.ctx.createGain();
    this.vinylGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.vinylGain.connect(this.masterGain);

    // Random pops scheduler
    window.setInterval(() => {
      if (!this.ctx || !this.vinylGain || this.vinylGain.gain.value <= 0.01) return;

      const popCount = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < popCount; i++) {
        const osc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(Math.random() * 200 + 40, this.ctx.currentTime);

        popGain.gain.setValueAtTime(Math.random() * 0.15 + 0.05, this.ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

        osc.connect(popGain);
        popGain.connect(this.vinylGain);

        osc.start(this.ctx.currentTime + Math.random() * 0.3);
        osc.stop(this.ctx.currentTime + 0.04);
      }
    }, 400);
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    this.startRain();
    this.startKettle();
    this.startVinyl();
    this.isRunning = true;
  }

  public setRainVolume(vol: number) { // 0 to 100
    this.start();
    if (this.rainGain && this.ctx) {
      const normalized = Math.max(0, Math.min(1, vol / 100));
      this.rainGain.gain.setTargetAtTime(normalized * 0.8, this.ctx.currentTime, 0.1);
    }
  }

  public setKettleVolume(vol: number) { // 0 to 100
    this.start();
    if (this.kettleGain && this.ctx) {
      const normalized = Math.max(0, Math.min(1, vol / 100));
      this.kettleGain.gain.setTargetAtTime(normalized * 0.7, this.ctx.currentTime, 0.1);
    }
  }

  public setVinylVolume(vol: number) { // 0 to 100
    this.start();
    if (this.vinylGain && this.ctx) {
      const normalized = Math.max(0, Math.min(1, vol / 100));
      this.vinylGain.gain.setTargetAtTime(normalized * 0.6, this.ctx.currentTime, 0.1);
    }
  }

  public stopAll() {
    this.setRainVolume(0);
    this.setKettleVolume(0);
    this.setVinylVolume(0);
  }
}

export const soundscapes = new SoundscapeEngine();
