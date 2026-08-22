# ☕ Tapri Vibes — 90s Bollywood & Cutting Chai Radio

[![Deploy to GitHub Pages](https://github.com/vikram-mistry/workout-vibes/actions/workflows/deploy.yml/badge.svg)](https://github.com/vikram-mistry/workout-vibes/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Tapri%20Vibes-D48637?style=flat&logo=safari)](https://vikram-mistry.github.io/workout-vibes/)

An ambient, always-on web radio playing timeless 1990s Hindi cinema melodies over a nostalgic rainy tea stall corner, complete with real-time listener counts, dynamic canvas rain, steaming cutting chai, and warm candle glow.

---

## 🌟 Features

- 🌧️ **Dynamic Monsoon Atmosphere**: HTML5 Canvas particle engine rendering real-time rainfall with wind drift, layered over an illustrated 90s roadside chai tapri with vintage Bollywood posters (*DDLJ*, *Saajan*, *Hum Aapke Hain Koun..!*).
- ☕ **Living Foreground Ambiance**: Steaming cutting chai glass with CSS keyframe vapor and a realistic flickering candle flame casting warm golden light over the rustic wooden counter.
- 📻 **124+ Curated 90s Bollywood Classics**: Handpicked songs from Kumar Sanu, Udit Narayan, Alka Yagnik, Pankaj Udhas, S.P. Balasubrahmanyam, and Anuradha Paudwal — verified for smooth YouTube audio playback.
- 👥 **Real-Time Listener Count**: Multi-user presence synchronization via Supabase Realtime and Web BroadcastChannel, showing live connected listeners worldwide.
- 🎛️ **Floating Glassmorphic Audio Player**: Sleek bottom dock featuring song progress scrub bar, volume slider, mute toggle, and track skip navigation.
- 📱 **Responsive & PWA Ready**: Optimized for desktop and mobile screen sizes, installable directly to your home screen as a standalone app.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Embedded YouTube IFrame API (Custom singleton audio context with auto-advance and error recovery)
- **Real-Time Presence**: [@supabase/supabase-js](https://supabase.com/) Realtime + Web BroadcastChannel
- **Hosting**: GitHub Pages via automated GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vikram-mistry/workout-vibes.git
   cd workout-vibes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages

This project includes a pre-configured automated deployment workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every `git push` to `main` will automatically build and deploy the latest version to:
   ```
   https://vikram-mistry.github.io/workout-vibes/
   ```

---

## ⚖️ Disclaimer & Credits

Audio streams through YouTube’s official embedded player. No audio files are hosted on this server, and all rights remain with the respective record labels, film production houses, composers, and performers. 

If you hold rights to any music track and want it removed, contact **mvikram43@gmail.com** and it will be taken down promptly.

---

<p align="center">Made with ☕ and nostalgia · Tapri Vibes</p>
