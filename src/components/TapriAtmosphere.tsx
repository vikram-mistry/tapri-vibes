import React, { useEffect, useRef } from 'react';

interface TapriAtmosphereProps {
  dimmed?: boolean;
}

export const TapriAtmosphere: React.FC<TapriAtmosphereProps> = ({ dimmed = false }) => {
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

    // Raindrop particles for atmospheric monsoon rain
    const maxDrops = window.innerWidth < 768 ? 90 : 160;
    const drops: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      width: number;
    }> = [];

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 24 + 12,
        speed: Math.random() * 14 + 10,
        opacity: Math.random() * 0.35 + 0.12,
        width: Math.random() * 1.2 + 0.8
      });
    }

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < maxDrops; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(195, 220, 250, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 2.5, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x += 1.8; // Monsoon wind drift

        if (d.y > height) {
          d.y = -d.length - Math.random() * 20;
          d.x = Math.random() * (width + 100) - 50;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
          alt="90s Indian roadside chai tapri tea stall in the rain with vintage Bollywood posters"
          width={1920}
          height={1088}
          className="size-full object-cover object-center"
        />
      </picture>

      {/* Subtle top & bottom shadow gradient for UI element legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

      {/* Dynamic HTML5 Canvas Rain Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Deluxe Salon Analog Grain and Vignette Overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-vignette opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-grain opacity-40" />
    </div>
  );
};
