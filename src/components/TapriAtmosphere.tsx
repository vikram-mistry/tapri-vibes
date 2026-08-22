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

    // Raindrop particles
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
        length: Math.random() * 22 + 12,
        speed: Math.random() * 14 + 10,
        opacity: Math.random() * 0.35 + 0.1,
        width: Math.random() * 1.2 + 0.8
      });
    }

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < maxDrops; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 205, 235, ${d.opacity})`;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 2.5, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x += 1.8; // Wind drift

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
    <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 overflow-hidden ${dimmed ? 'opacity-35' : 'opacity-100'}`}>
      {/* Moody Rainy Night Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c14] via-[#05070a] to-[#020305]" />

      {/* Distant soft street lamp amber glow through rain */}
      <div className="absolute top-[-10%] left-[20%] size-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] size-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* HTML5 Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Tapri Top Tin Roof Silhouette & Raindrops edge */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#020305]/95 via-[#020305]/60 to-transparent z-[2]" />
      
      {/* Counter Atmosphere at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[140px] sm:h-[180px] z-[2]">
        {/* Wooden Counter Silhouette */}
        <div className="absolute bottom-0 w-full h-[70px] sm:h-[90px] bg-[#030406]/95 border-t border-amber-900/20 backdrop-blur-sm shadow-[0_-15px_35px_rgba(0,0,0,0.8)]" />

        {/* Ambient Candle Glow & Candle */}
        <div className="absolute bottom-[68px] sm:bottom-[88px] left-[12%] sm:left-[18%] z-[4]">
          {/* Flame Glow */}
          <div className="absolute -top-6 -left-6 size-16 rounded-full bg-amber-500/25 blur-lg animate-pulse" />
          
          {/* Flickering Flame */}
          <div className="relative">
            <div
              className="absolute -top-[22px] left-[3px] w-3 h-6 rounded-t-full rounded-b-sm bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 blur-[0.6px] shadow-[0_0_15px_#ff9d00,0_0_30px_rgba(255,157,0,0.6)]"
              style={{
                animation: 'tapriFlicker 0.12s ease-in-out infinite alternate'
              }}
            />
            {/* Candle Body */}
            <div className="w-4 h-11 bg-gradient-to-r from-[#d1c2a5] via-[#e5d8be] to-[#b8a789] rounded-t-sm shadow-inner" />
          </div>
        </div>

        {/* Cutting Chai Glass with Steaming Tea */}
        <div className="absolute bottom-[68px] sm:bottom-[88px] left-[26%] sm:left-[28%] z-[4]">
          <div className="relative">
            {/* Rising Steam */}
            <div
              className="absolute -top-7 left-[3px] w-1.5 h-6 bg-white/20 blur-[2px] rounded-full"
              style={{ animation: 'tapriSteam 2.4s linear infinite' }}
            />
            <div
              className="absolute -top-8 left-[9px] w-1.5 h-7 bg-white/15 blur-[2.5px] rounded-full"
              style={{ animation: 'tapriSteam 2.8s linear infinite 0.9s' }}
            />
            <div
              className="absolute -top-6 left-[15px] w-1.5 h-5 bg-white/20 blur-[2px] rounded-full"
              style={{ animation: 'tapriSteam 2.2s linear infinite 1.4s' }}
            />

            {/* Cutting Chai Glass (Classic Indian tea glass silhouette) */}
            <div className="relative w-6 h-10 border border-white/20 border-t-0 rounded-b-md bg-gradient-to-b from-transparent via-[#d48637]/45 to-[#b2621b]/80 shadow-[0_4px_12px_rgba(212,134,55,0.25)] overflow-hidden">
              {/* Hot Tea Liquid Level */}
              <div className="absolute bottom-0 w-full h-[75%] bg-gradient-to-t from-[#8d470d] to-[#d48637]/90" />
              {/* Glass Vertical Fluted Ridges */}
              <div className="absolute inset-0 flex justify-between px-1 opacity-20">
                <span className="w-px h-full bg-white" />
                <span className="w-px h-full bg-white" />
                <span className="w-px h-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analog Grain and Vignette Overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-vignette opacity-80" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 saloon-grain opacity-50" />

      {/* Embedded Custom Keyframe Styles */}
      <style>{`
        @keyframes tapriFlicker {
          0% { transform: scale(1) rotate(-1deg); opacity: 0.88; }
          50% { transform: scale(1.06) rotate(1deg); opacity: 1; }
          100% { transform: scale(0.96) rotate(-0.5deg); opacity: 0.92; }
        }
        @keyframes tapriSteam {
          0% { transform: translateY(4px) scaleX(0.8); opacity: 0; }
          40% { opacity: 0.35; transform: translateY(-8px) scaleX(1.4); }
          80% { opacity: 0.15; transform: translateY(-18px) scaleX(1.8); }
          100% { transform: translateY(-28px) scaleX(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
