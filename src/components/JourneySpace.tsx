import React, { useState } from 'react';
import { milestones } from '../data/careerData';
import { Calendar, MapPin, CheckCircle2, Cpu, Database, HardDrive, Terminal, GitFork, ArrowRight, ShieldCheck } from 'lucide-react';

export default function JourneySpace() {
  const [selectedId, setSelectedId] = useState(milestones[0].id);
  const activeMilestone = milestones.find(m => m.id === selectedId) || milestones[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[480px]">
      {/* Left Timeline Panel */}
      <div className="lg:col-span-5 flex flex-col gap-3.5 border-r border-white/5 pr-0 lg:pr-4">
        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">
          Chronological Clusters
        </h3>

        <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[460px] pr-2 custom-scrollbar">
          {milestones.map((m) => {
            const isSelected = m.id === selectedId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-white/10 border-white/20 shadow-[0_8px_24px_rgba(255,255,255,0.05)]' 
                    : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10'
                }`}
              >
                {/* Active side indicator */}
                {isSelected && (
                  <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${m.impactColor}`} />
                )}

                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest italic">
                    {m.period}
                  </span>
                  <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    m.category === 'architecture' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    m.category === 'backend' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}>
                    {m.category}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                  {m.role}
                </h4>
                <p className="text-xs text-white/60 mb-2 font-medium">{m.company}</p>

                <div className="flex items-center gap-1 text-[10px] text-white/40">
                  <MapPin className="w-3 h-3 text-red-400/70" />
                  <span>{m.location}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Details Panel */}
      <div className="lg:col-span-7 flex flex-col gap-4 overflow-y-auto max-h-[480px] pr-1 custom-scrollbar">
        {/* Detail Title Header */}
        <div className="space-y-1 bg-white/5 border border-white/5 rounded-2xl p-5 relative">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Active Frame: {activeMilestone.period}</span>
          </div>
          
          <h2 className="text-lg font-bold text-white tracking-tight">{activeMilestone.role}</h2>
          <p className="text-sm font-medium text-blue-400">{activeMilestone.company}</p>
          
          <p className="text-xs text-white/70 leading-relaxed pt-2 border-t border-white/5 mt-2">
            {activeMilestone.description}
          </p>
        </div>

        {/* High-Impact Accomplishments */}
        <div className="space-y-2.5">
          <h3 className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">
            Key Telemetry Accomplishments
          </h3>
          
          <div className="space-y-2">
            {activeMilestone.achievements.map((ach, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3.5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/8 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-xs text-white/80 leading-relaxed font-sans">{ach}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Project Panel */}
        {activeMilestone.projectTitle && (
        <div className="bg-gradient-to-br from-zinc-950/80 to-zinc-900/60 border border-white/10 rounded-2xl p-5 space-y-3.5 relative">
          <div className="absolute top-0 right-0 p-3 opacity-15">
            <Terminal className="w-24 h-24 text-white" />
          </div>

          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <GitFork className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Signature Initiative Showcase
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {activeMilestone.projectTitle}
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              {activeMilestone.projectDesc}
            </p>
          </div>
        </div>
        )}

        {/* Specs Blueprint Section */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 font-mono text-[11px] space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">
            <Cpu className="w-3.5 h-3.5 text-orange-400" />
            <span>Architectural Spec Sheet</span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">LANGUAGE STACK</span>
              <span className="text-white/95 text-right">{activeMilestone.specSheet.language}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">RUNTIME ENVIRONMENT</span>
              <span className="text-white/95 text-right">{activeMilestone.specSheet.runtime}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">ARCH. PATTERN</span>
              <span className="text-white/95 text-right">{activeMilestone.specSheet.architecture}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">DATA STORE</span>
              <span className="text-white/95 text-right">{activeMilestone.specSheet.database}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1 col-span-2">
              <span className="text-white/40">ORCHESTRATION & DEVOPS</span>
              <span className="text-white/95 text-right">{activeMilestone.specSheet.devops}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
