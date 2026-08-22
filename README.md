# ☕ Tapri Vibes — 90s Bollywood & Cutting Chai Radio

[![Netlify Status](https://api.netlify.com/api/v1/badges/e814030d-2713-43cf-8302-d9f7ee763138/deploy-status)](https://taprivibes.netlify.app)
[![Live on Netlify](https://img.shields.io/badge/Live%20App-Netlify-00C7B7?style=flat&logo=netlify)](https://taprivibes.netlify.app)
[![Live on GitHub Pages](https://img.shields.io/badge/Live%20App-GitHub%20Pages-D48637?style=flat&logo=github)](https://vikram-mistry.github.io/tapri-vibes/)

An ambient, always-on web radio playing timeless 1990s Hindi cinema melodies over a nostalgic rainy roadside tea stall, complete with real-time listener counts, procedural soundscapes, interactive 90s tape deck, focus timers, and a roadside chalkboard guestbook.

---

## 🌟 Key Features

- 🌧️ **Dynamic Monsoon Atmosphere**: HTML5 Canvas particle engine rendering real-time rainfall with wind drift, layered over an illustrated 90s roadside chai tapri with vintage Bollywood posters (*DDLJ*, *Saajan*, *Hum Aapke Hain Koun..!*).
- 🎛️ **Tapri Soundscapes Mixer**: Built-in procedural Web Audio synthesizer allowing listeners to mix ambient sounds directly in their browser with zero network buffering:
  - *Monsoon Rain on Tin Roof*
  - *Tea Kettle Boiling Simmer*
  - *Vintage Vinyl Crackle & Tape Hiss*
- 📻 **Chai Time Smart Rotations**: 124 curated and verified 90s Bollywood evergreen songs categorized into daily tea slots:
  - 🌅 **Subah Ki Chai** (6 AM – 11 AM): Soothing morning acoustic melodies & soulful vocals.
  - ☀️ **Dophar Ki Susti** (11 AM – 4 PM): Relaxed mid-day romantic duets.
  - ☕ **Shaam Ki Cutting** (4 PM – 9 PM): High-energy 90s dance tracks & street beats.
  - 🌙 **Raat Ki Tapri** (9 PM – 4 AM): Late-night melancholic classics & ghazals.
  - 🗂️ **All Tapri Classics**: Full 124-track uncut tape archive.
- 📼 **90s Retro Cassette Player & Mechanical SFX**: Transform the radio into an animated vintage TDK/T-Series cassette deck with rotating geared spools, moving magnetic tape ribbon, and authentic button click/whirr audio effects.
- ⏱️ **"Cutting Chai" Focus & Sleep Timer**: 15 min (Quick Break), 25 min (Pomodoro Focus), and 45 min (Deep Work / Sleep) timers with smooth audio fade-out in the final 15 seconds.
- 📝 **Roadside Chalkboard Guestbook**: Live visitor notes board where listeners share nostalgic memories, synced across browser tabs in real time.
- ❤️ **Global Live Like Counter**: Real-time server-synced like counter allowing listeners to show their love for Tapri Vibes.
- 👥 **Real-Time Presence**: Dynamic live listener tracking based on peak IST tea hours with Supabase Realtime upgrade support.
- 📱 **Apple iOS & macOS PWA Ready**: Installable as a standalone app on iPhone, iPad, and Mac Dock with the custom transparent edge-to-edge vinyl record icon.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engines**:
  - Embedded YouTube IFrame API (Custom singleton audio context with auto-advance and error recovery)
  - Web Audio API (Procedural pink noise, resonant filters, impulse pop generators, and mechanical tape synthesis)
- **Deployment**: Automated CI/CD via GitHub Actions & Netlify

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vikram-mistry/tapri-vibes.git
   cd tapri-vibes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 👨‍💻 Creator & Community

Created with ☕ and nostalgia by **Vikram Mistry**.

- 💬 **WhatsApp Community**: [Join the Tapri Crew](https://whatsapp.com/channel/0029Vb8VSzq5kg7FBQkurZ45)
- ✉️ **Contact**: [mvikram43@gmail.com](mailto:mvikram43@gmail.com)

---

## ⚖️ Disclaimer & Credits

Audio streams through YouTube’s official embedded player. No audio files are hosted on this server, and all rights remain with the respective record labels, film production houses, composers, and performers. 

If you hold rights to any music track and want it removed, contact **mvikram43@gmail.com** and it will be taken down promptly.
