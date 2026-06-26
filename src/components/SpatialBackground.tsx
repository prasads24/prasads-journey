import React, { useEffect, useRef, useState } from 'react';

interface BackgroundProps {
  immersionLevel: number; // 0 (desktop) to 100 (fully immersive space)
  activeColorTheme?: string; // e.g. "from-amber-500/10"
}

export default function SpatialBackground({ immersionLevel, activeColorTheme }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -0.5 to 0.5
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Compute depth styles based on immersionLevel
  const spaceOpacity = immersionLevel / 100;
  const desktopGridOpacity = Math.max(0, 1 - (immersionLevel / 80));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#000000] overflow-hidden select-none pointer-events-none z-0 transition-colors duration-1000"
    >
      {/* Dynamic Ambient Color Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, var(--ambient-color, rgba(147, 51, 234, 0.15)) 0%, rgba(0,0,0,0) 70%)`
        }}
      />

      {/* Primary Apple Vision Pro Glowing Lens Flares */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 mix-blend-screen transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(0, 122, 255, 0.6) 0%, rgba(0,0,0,0) 70%)',
          transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px) scale(${1 + spaceOpacity * 0.4})`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 mix-blend-screen transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(175, 82, 222, 0.5) 0%, rgba(0,0,0,0) 70%)',
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px) scale(${1 + spaceOpacity * 0.3})`,
        }}
      />

      {/* Spatial Cyber Grid (Visible in Desktop/Low Immersion) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{ 
          opacity: desktopGridOpacity * 0.4,
          transform: `perspective(1000px) rotateX(${60 + mousePos.y * 10}deg) translateZ(-100px) translateY(${mousePos.y * -30}px)`
        }}
      >
        <div 
          className="w-[200vw] h-[200vh] -left-[50vw] -top-[50vh] absolute"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Spatial Constellation Particles (Visible in Immersive mode) */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: spaceOpacity }}
      >
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse" />
        <div className="absolute top-[45%] left-[10%] w-1 h-1 rounded-full bg-blue-300 opacity-60 animate-pulse [animation-delay:1s]" />
        <div className="absolute top-[65%] left-[40%] w-2 h-2 rounded-full bg-purple-300 opacity-30 animate-pulse [animation-delay:2.5s]" />
        <div className="absolute top-[25%] right-[25%] w-1 h-1 rounded-full bg-teal-200 opacity-50 animate-pulse [animation-delay:1.8s]" />
        <div className="absolute top-[50%] right-[15%] w-1.5 h-1.5 rounded-full bg-pink-400 opacity-40 animate-pulse [animation-delay:0.5s]" />
        <div className="absolute bottom-[20%] right-[35%] w-1 h-1 rounded-full bg-white opacity-30 animate-pulse [animation-delay:3s]" />
        <div className="absolute top-[80%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-200 opacity-50 animate-pulse [animation-delay:1.2s]" />
      </div>

      {/* Cosmic Dust Particles Canvas */}
      <ParticleCanvas mousePos={mousePos} speed={0.5 + spaceOpacity * 1.5} />
    </div>
  );
}

// Optimized HTML Canvas Particle System representing spatial dust
function ParticleCanvas({ mousePos, speed }: { mousePos: { x: number; y: number }; speed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize particles
    const particleCount = 65;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(0, 122, 255, ',   // Vision Blue
      'rgba(175, 82, 222, ',  // Vision Purple
      'rgba(255, 149, 0, ',   // Vision Orange
      'rgba(255, 255, 255, '  // Space White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Dynamic velocity with parallax shift
        const vx = p.speedX * speed + mousePos.x * 0.15;
        const vy = p.speedY * speed + mousePos.y * 0.15;

        p.x += vx;
        p.y += vy;

        // Boundary wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
