import React, { useRef, useState, useEffect } from 'react';

interface SpatialGlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  glowColor?: string; // Tailwind glow classes like "rgba(0, 122, 255, 0.15)"
  key?: string;
}

export default function SpatialGlassCard({ 
  children, 
  className = "", 
  onClick, 
  id,
  glowColor = "rgba(0, 122, 255, 0.2)"
}: SpatialGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    // Calculate percentage coordinates
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Calculate angles of tilt based on cursor proximity to center
    // Max tilt angle is 10 degrees
    const tiltX = ((yPercent - 50) / 50) * -10; 
    const tiltY = ((xPercent - 50) / 50) * 10;

    setRotate({ x: tiltX, y: tiltY });
    setGlowPos({ x: xPercent, y: yPercent });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
        boxShadow: isHovered 
          ? `0 20px 40px rgba(0, 0, 0, 0.7), 0 0 30px ${glowColor.replace('0.2', '0.15')}`
          : '0 8px 32px rgba(0, 0, 0, 0.5)',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: isHovered ? '1px solid rgba(255, 255, 255, 0.22)' : '1px solid rgba(255, 255, 255, 0.10)',
      }}
    >
      {/* Glossy Edge Highlight Shine */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.8 : 0,
          background: `radial-gradient(circle 220px at ${glowPos.x}% ${glowPos.y}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Internal Gaze Glow Refraction */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(circle 180px at ${glowPos.x}% ${glowPos.y}%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Card High-Contrast Border highlight */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 transition-colors duration-300"
        style={{
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)',
        }}
      />

      {/* Actual Content Wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
