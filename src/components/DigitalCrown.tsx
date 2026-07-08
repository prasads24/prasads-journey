import React, { useState } from 'react';
import { Sparkles, Sliders } from 'lucide-react';

interface DigitalCrownProps {
  immersionLevel: number;
  setImmersionLevel: (level: number) => void;
}

export default function DigitalCrown({ immersionLevel, setImmersionLevel }: DigitalCrownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { label: "Standard Grid", value: 0, desc: "A clean developer desk viewport" },
    { label: "Shared Spaces", value: 40, desc: "Ambient light refraction" },
    { label: "Deep Cosmos", value: 100, desc: "Fully immersive career space" }
  ];

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const newLevel = Math.min(100, Math.max(0, immersionLevel + (e.deltaY > 0 ? 5 : -5)));
    setImmersionLevel(newLevel);
  };

  return (
    <div 
      className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2"
      id="digital-crown-container"
    >
      {/* Tooltip Description */}
      {isOpen && (
        <div className="mr-1 mb-1 p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-xs text-white max-w-[200px] shadow-2xl animate-fade-in">
          <p className="font-semibold text-white/90 flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> Immersion Dial
          </p>
          <p className="text-white/60 leading-relaxed mb-2 text-[10px]">
            Hover & scroll over the crown, or click presets to control the ambient depth of the workspace.
          </p>
          <div className="flex flex-col gap-1.5 pt-1.5 border-t border-white/10">
            {presets.map((p) => (
              <button
                key={p.value}
                onClick={() => setImmersionLevel(p.value)}
                className={`flex justify-between items-center px-2 py-1 rounded text-left transition-all text-[10px] ${
                  immersionLevel === p.value 
                    ? 'bg-white/15 text-white font-medium' 
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <span>{p.label}</span>
                <span className="opacity-60">{p.value}%</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Dial Body */}
      <div 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-3 p-1 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:border-white/20 hover:shadow-blue-500/10"
      >
        <span className="text-[11px] font-mono text-white/50 pl-4 pr-1 select-none font-semibold transition-all duration-300 group-hover:text-white">
          {immersionLevel}% SPATIAL
        </span>

        {/* Rotatable Crown Wheel */}
        <div 
          onWheel={handleScroll}
          className="relative w-12 h-12 rounded-full cursor-ns-resize bg-gradient-to-b from-zinc-700 to-zinc-900 border border-white/15 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),_0_4px_12px_rgba(0,0,0,0.5)] active:scale-95 transition-all duration-150"
          style={{
            transform: `rotate(${immersionLevel * 3.6}deg)`
          }}
        >
          {/* Ribbed notches representing Digital Crown */}
          <div className="absolute inset-0 rounded-full border border-black/40 pointer-events-none" />
          <div className="absolute top-0 w-1 h-3 bg-white/20 rounded-full left-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 w-1 h-3 bg-white/20 rounded-full left-1/2 -translate-x-1/2" />
          <div className="absolute left-0 h-1 w-3 bg-white/20 rounded-full top-1/2 -translate-y-1/2" />
          <div className="absolute right-0 h-1 w-3 bg-white/20 rounded-full top-1/2 -translate-y-1/2" />
          
          <Sliders className="w-4 h-4 text-white/80 pointer-events-none" style={{ transform: `rotate(${-immersionLevel * 3.6}deg)` }} />
        </div>
      </div>
    </div>
  );
}
