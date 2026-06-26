import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Minimize2, Maximize2, Compass } from 'lucide-react';

interface SpatialWindowWrapperProps {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isActive: boolean;
  isMobile?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
}

export default function SpatialWindowWrapper({
  id,
  title,
  x,
  y,
  width,
  height,
  zIndex,
  isActive,
  isMobile = false,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children
}: SpatialWindowWrapperProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle Drag Start
  const startDrag = (e: React.MouseEvent) => {
    if (isMobile) return; // No free-form dragging on the mobile stacked layout
    // Prevent dragging if clicking buttons or input fields
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('select')) {
      return;
    }

    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y
    });
    e.preventDefault();
  };

  // Drag Motion Tracking
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Keep within reasonable screen bounds
      const nextX = e.clientX - dragOffset.x;
      const nextY = e.clientY - dragOffset.y;
      onMove(nextX, nextY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onMove]);

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      className={`${isMobile ? 'relative w-full mb-6' : 'absolute'} rounded-3xl flex flex-col shadow-[0_32px_64px_rgba(0,0,0,0.7)] border transition-all duration-300 ${
        isActive 
          ? 'border-white/20 shadow-blue-500/15 scale-100' 
          : 'border-white/10 opacity-75 scale-[0.98]'
      }`}
      style={isMobile ? {
        background: isActive
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        backdropFilter: 'blur(45px)',
        WebkitBackdropFilter: 'blur(45px)',
      } : {
        left: x,
        top: y,
        width,
        height,
        zIndex,
        background: isActive
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        backdropFilter: 'blur(45px)',
        WebkitBackdropFilter: 'blur(45px)',
      }}
    >
      {/* Glossy top specular highlights */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Window Header */}
      <div 
        onMouseDown={startDrag}
        className={`flex items-center justify-between px-6 py-4 border-b border-white/5 select-none ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}
      >
        <div className="flex items-center gap-3">
          {/* Action dots mimicking Apple layout */}
          <div className="flex items-center gap-1.5 mr-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3.5 h-3.5 rounded-full bg-red-500/20 hover:bg-red-500 border border-red-500/30 flex items-center justify-center group/btn transition-colors"
              title="Close window"
            >
              <X className="w-2 h-2 text-red-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 hover:bg-yellow-500 border border-yellow-500/30 flex items-center justify-center group/btn transition-colors"
              title="Minimize window"
            >
              <Minus className="w-2 h-2 text-yellow-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </div>

          <Compass className="w-4 h-4 text-white/50 animate-spin-slow" />
          <span className="text-[13px] font-medium text-white/90 tracking-wide font-sans">
            {title}
          </span>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6] animate-pulse" />
          )}
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">
            Active Space
          </span>
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 text-white custom-scrollbar">
        {children}
      </div>

      {/* Spatial grab-pill underneath the window representing the VisionOS handle bar */}
      {!isMobile && (
        <div 
          onMouseDown={startDrag}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group cursor-grab active:cursor-grabbing select-none"
        >
          {/* The grab pill bar */}
          <div className={`w-32 h-1.5 rounded-full transition-all duration-300 ${
            isDragging 
              ? 'bg-blue-400 w-40 shadow-[0_0_12px_rgba(96,165,250,0.8)]' 
              : 'bg-white/25 group-hover:bg-white/50'
          }`} />
          
          {/* Grab bar micro-text */}
          <span className="text-[8px] font-mono text-white/20 group-hover:text-white/40 uppercase tracking-widest transition-opacity">
            Grab to Move
          </span>
        </div>
      )}
    </div>
  );
}
