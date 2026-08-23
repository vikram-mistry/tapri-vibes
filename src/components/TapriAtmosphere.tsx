import React, { useEffect, useRef } from 'react';
import { WeatherMode } from '../types';

interface TapriAtmosphereProps {
  dimmed?: boolean;
  weatherMode?: WeatherMode;
}

export const TapriAtmosphere: React.FC<TapriAtmosphereProps> = ({
  dimmed = false,
  weatherMode = 'monsoon'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Weather Particles
    const particleCount = weatherMode === 'winter-mist'
      ? (window.innerWidth < 768 ? 60 : 110)
      : weatherMode === 'sunset-glow'
      ? (window.innerWidth < 768 ? 40 : 70)
      : (window.innerWidth < 768 ? 70 : 130);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      sway: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: weatherMode === 'winter-mist'
          ? Math.random() * 3 + 1.5 // Snowflake crystal size
          : weatherMode === 'sunset-glow'
          ? Math.random() * 2.5 + 1 // Golden dust mote
          : Math.random() * 20 + 10, // Raindrop length
        speedY: weatherMode === 'monsoon'
          ? Math.random() * 14 + 10
          : weatherMode === 'winter-mist'
          ? Math.random() * 1.2 + 0.6 // Slow tumbling snow
          : Math.random() * 0.4 - 0.2, // Drifting dusk motes
        speedX: weatherMode === 'monsoon'
          ? 1.8
          : Math.random() * 0.8 - 0.4,
        opacity: weatherMode === 'winter-mist'
          ? Math.random() * 0.6 + 0.3
          : Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        sway: Math.random() * Math.PI * 2
      });
    }

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (weatherMode === 'monsoon') {
        // 🌧️ Monsoon Rain Streaks
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(195, 220, 250, ${p.opacity * 0.75})`;
          ctx.lineWidth = 1.2;
          ctx.lineCap = 'round';
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + 2.5, p.y + p.size);
          ctx.stroke();

          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y > height) {
            p.y = -p.size - Math.random() * 20;
            p.x = Math.random() * (width + 100) - 50;
          }
        }
      } else if (weatherMode === 'winter-mist') {
        // ❄️ Realistic Winter: Gently falling snow crystals & soft morning mist
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];

          p.sway += 0.02;
          const currentX = p.x + Math.sin(p.sway) * 1.5;

          ctx.save();
          ctx.translate(currentX, p.y);
          ctx.rotate(p.rotation);
          p.rotation += p.rotSpeed;

          // Glowing soft white snowflake
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.shadowColor = 'rgba(200, 230, 255, 0.8)';
          ctx.shadowBlur = 4;
          ctx.fill();

          ctx.restore();

          p.y += p.speedY;
          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        }
      } else if (weatherMode === 'sunset-glow') {
        // 🌅 Realistic Sunset: Volumetric Sunlight Beams & Floating Golden Dust Motes
        
        // Volumetric Sunbeams streaming from top-right corner
        const sunX = width * 0.82;
        const sunY = height * 0.12;

        const rayGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, width * 0.9);
        rayGrad.addColorStop(0, 'rgba(255, 220, 140, 0.45)');
        rayGrad.addColorStop(0.2, 'rgba(255, 180, 80, 0.2)');
        rayGrad.addColorStop(0.6, 'rgba(240, 140, 60, 0.08)');
        rayGrad.addColorStop(1, 'rgba(200, 100, 40, 0)');

        ctx.fillStyle = rayGrad;
        ctx.fillRect(0, 0, width, height);

        // Sun disc corona
        ctx.beginPath();
        const sunDisc = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 140);
        sunDisc.addColorStop(0, 'rgba(255, 250, 220, 0.7)');
        sunDisc.addColorStop(0.3, 'rgba(255, 200, 100, 0.4)');
        sunDisc.addColorStop(1, 'rgba(255, 150, 50, 0)');
        ctx.fillStyle = sunDisc;
        ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
        ctx.fill();

        // Floating golden dust motes in sunlight
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 225, 160, ${p.opacity * 0.65})`;
          ctx.shadowColor = 'rgba(255, 200, 100, 0.9)';
          ctx.shadowBlur = 6;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= 0.25;
          p.x += Math.cos(p.y * 0.015) * 0.4;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weatherMode]);

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 overflow-hidden ${
        dimmed ? 'opacity-30' : 'opacity-100'
      }`}
    >
      {/* 90s Chai Tapri Static Illustrated Backdrop */}
      <picture className="absolute inset-0 size-full">
        <source media="(min-width: 768px)" srcSet="./assets/tapri-backdrop.jpg" />
        <img
          src="./assets/tapri-backdrop-mobile.jpg"
          alt="90s Indian roadside chai tapri tea stall with vintage Bollywood posters"
          width={1920}
          height={1088}
          className={`size-full object-cover object-center transition-all duration-700 ${
            weatherMode === 'sunset-glow'
              ? 'sepia-[0.14] saturate-[1.1] brightness-[1.03]'
              : weatherMode === 'winter-mist'
              ? 'brightness-[0.96] contrast-[0.92] saturate-[0.82] hue-rotate-[10deg]'
              : ''
          }`}
        />
      </picture>

      {/* Dynamic Weather Sky & Ambient Lighting Gradient */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          weatherMode === 'sunset-glow'
            ? 'bg-gradient-to-tr from-amber-950/25 via-amber-700/10 to-orange-500/15 mix-blend-screen'
            : weatherMode === 'winter-mist'
            ? 'bg-gradient-to-b from-sky-900/25 via-sky-100/10 to-blue-950/20 mix-blend-soft-light'
            : 'bg-gradient-to-b from-shade/60 via-transparent to-shade/90'
        }`}
      />

      {/* Weather Particle Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full"
        aria-hidden="true"
      />
    </div>
  );
};
