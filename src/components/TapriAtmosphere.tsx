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
    const maxDrops = window.innerWidth < 768 ? 95 : 170;
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
        speed: Math.random() * 14 + 11,
        opacity: Math.random() * 0.4 + 0.15,
        width: Math.random() * 1.3 + 0.7
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

      {/* Atmospheric dark wash to maintain UI contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14]/40 via-[#05070a]/20 to-[#020305]/70" />

      {/* Dynamic HTML5 Canvas Rain Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Foreground Ambient Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-[140px] sm:h-[180px] z-[3]">
        {/* Candle Glow & Flame */}
        <div className="absolute bottom-[20px] sm:bottom-[32px] left-[10%] sm:left-[14%] z-[4]">
          {/* Ambient Flame Glow */}
          <div className="absolute -top-6 -left-6 size-16 rounded-full bg-amber-500/25 blur-lg animate-pulse" />
          {/* Flickering Flame */}
          <div className="relative">
            <div
              className="absolute -top-[22px] left-[3px] w-3 h-6 rounded-t-full rounded-b-sm bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 blur-[0.6px] shadow-[0_0_15px_#ff9d00,0_0_30px_rgba(255,157,0,0.6)]"
              style={{
                animation: 'tapriFlicker 0.12s ease-in-out infinite alternate'
              }}
            />
            <div className="w-3.5 h-10 bg-gradient-to-r from-[#d1c2a5] via-[#e5d8be] to-[#b8a789] rounded-t-sm shadow-inner opacity-90" />
          </div>
        </div>

        {/* Steaming Cutting Chai Glass */}
        <div className="absolute bottom-[20px] sm:bottom-[32px] left-[22%] sm:left-[22%] z-[4]">
          <div className="relative">
            {/* Rising Steam Streams */}
            <div
              className="absolute -top-7 left-[3px] w-1.5 h-6 bg-white/25 blur-[2px] rounded-full"
              style={{ animation: 'tapriSteam 2.4s linear infinite' }}
            />
            <div
              className="absolute -top-8 left-[9px] w-1.5 h-7 bg-white/20 blur-[2.5px] rounded-full"
              style={{ animation: 'tapriSteam 2.8s linear infinite 0.9s' }}
            />
            <div
              className="absolute -top-6 left-[14px] w-1.5 h-5 bg-white/25 blur-[2px] rounded-full"
              style={{ animation: 'tapriSteam 2.2s linear infinite 1.4s' }}
            />

            {/* Cutting Chai Glass */}
            <div className="relative w-6 h-10 border border-white/25 border-t-0 rounded-b-md bg-gradient-to-b from-transparent via-[#d48637]/55 to-[#b2621b]/85 shadow-[0_4px_14px_rgba(212,134,55,0.35)] overflow-hidden">
              <div className="absolute bottom-0 w-full h-[78%] bg-gradient-to-t from-[#8d470d] to-[#d48637]/95" />
              <div className="absolute inset-0 flex justify-between px-1 opacity-25">
                <span className="w-px h-full bg-white" />
                <span className="w-px h-full bg-white" />
                <span className="w-px h-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deluxe Salon Analog Grain and Vignette Overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-vignette opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-grain opacity-40" />

      {/* Custom CSS Keyframe Animations */}
      <style>{`
        @keyframes tapriFlicker {
          0% { transform: scale(1) rotate(-1deg); opacity: 0.88; }
          50% { transform: scale(1.06) rotate(1deg); opacity: 1; }
          100% { transform: scale(0.96) rotate(-0.5deg); opacity: 0.92; }
        }
        @keyframes tapriSteam {
          0% { transform: translateY(4px) scaleX(0.8); opacity: 0; }
          40% { opacity: 0.4; transform: translateY(-8px) scaleX(1.4); }
          80% { opacity: 0.2; transform: translateY(-18px) scaleX(1.8); }
          100% { transform: translateY(-28px) scaleX(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
