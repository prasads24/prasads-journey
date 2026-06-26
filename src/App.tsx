import React, { useState, useEffect, useRef } from 'react';
import SpatialBackground from './components/SpatialBackground';
import DigitalCrown from './components/DigitalCrown';
import SpatialGlassCard from './components/SpatialGlassCard';
import SpatialWindowWrapper from './components/SpatialWindowWrapper';
import AboutSpace from './components/AboutSpace';
import JourneySpace from './components/JourneySpace';
import SkillsSpace from './components/SkillsSpace';
import TerminalSpace from './components/TerminalSpace';
import { personalBio, milestones, skills } from './data/careerData';
import { SpatialWindow } from './types';
import { 
  User, 
  History, 
  Wrench, 
  Terminal as ShellIcon, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Clock, 
  Wifi, 
  BatteryCharging, 
  Sliders, 
  ChevronRight, 
  Compass, 
  FolderOpen, 
  Flame, 
  Volume2, 
  VolumeX, 
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';

export default function App() {
  // Navigation & Immersion State
  const [isWorkspaceMode, setIsWorkspaceMode] = useState(true);
  const [immersionLevel, setImmersionLevel] = useState(40);
  const [showGazeCircle, setShowGazeCircle] = useState(true);
  const [gazePos, setGazePos] = useState({ x: 0, y: 0 });
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [hoveredDockItem, setHoveredDockItem] = useState<string | null>(null);

  // Active Windows State
  const [windows, setWindows] = useState<SpatialWindow[]>([
    { id: 'about', title: 'About Me - Vitals', x: 60, y: 130, width: 440, height: 500, zIndex: 10, isOpen: true, isMinimized: false, type: 'about' },
    { id: 'journey', title: 'IT Career Journey Timeline', x: 530, y: 100, width: 780, height: 560, zIndex: 5, isOpen: true, isMinimized: false, type: 'journey' },
    { id: 'skills', title: 'Spatial Skill Matrix', x: 140, y: 220, width: 680, height: 460, zIndex: 1, isOpen: false, isMinimized: false, type: 'skills' },
    { id: 'terminal', title: 'Secure System Core Shell', x: 400, y: 320, width: 560, height: 440, zIndex: 1, isOpen: false, isMinimized: false, type: 'terminal' }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string>('about');
  const [maxZIndex, setMaxZIndex] = useState(10);

  // System Time Updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Gaze tracking position handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGazePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set CSS variables dynamically for ambient lighting in background
  useEffect(() => {
    const root = document.documentElement;
    // Shift color base based on immersion level
    if (immersionLevel < 30) {
      root.style.setProperty('--ambient-color', 'rgba(0, 122, 255, 0.12)');
    } else if (immersionLevel < 70) {
      root.style.setProperty('--ambient-color', 'rgba(147, 51, 234, 0.18)');
    } else {
      root.style.setProperty('--ambient-color', 'rgba(255, 149, 0, 0.22)');
    }
  }, [immersionLevel]);

  // Handle Window Focus (bring to front)
  const focusWindow = (id: string) => {
    const newMax = maxZIndex + 1;
    setMaxZIndex(newMax);
    setActiveWindowId(id);
    setWindows(prev => prev.map(win => {
      if (win.id === id) {
        return { ...win, zIndex: newMax, isMinimized: false, isOpen: true };
      }
      return win;
    }));
  };

  // Toggle Window State (Open / Focus / Minimize)
  const toggleWindow = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (!win.isOpen) {
      // Reopen and focus
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w));
      focusWindow(id);
    } else if (win.isMinimized) {
      // Restore and focus
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      focusWindow(id);
    } else if (activeWindowId === id) {
      // Already active, so close it
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    } else {
      // Focus it
      focusWindow(id);
    }
  };

  // Move Window
  const moveWindow = (id: string, nextX: number, nextY: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x: nextX, y: nextY } : w));
  };

  // Minimize Window
  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  // Close Window
  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  // Trigger Mock Web Audio Synthesizer representing VisionOS spatial click clicks
  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 0.08);
      
      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // Audio context block safely ignored
    }
  };

  // Interactive app items in Left Navigation Dock
  const dockItems = [
    { id: 'about', label: 'Vitals Profile', icon: User, color: 'text-emerald-400' },
    { id: 'journey', label: 'IT Journey Logs', icon: History, color: 'text-amber-400' },
    { id: 'skills', label: 'Skill Matrix', icon: Wrench, color: 'text-blue-400' },
    { id: 'terminal', label: 'Secure Core Shell', icon: ShellIcon, color: 'text-green-400' }
  ];

  return (
    <div className="relative min-h-screen text-white select-none overflow-x-hidden antialiased">
      {/* Immersive VisionOS Particle Background */}
      <SpatialBackground immersionLevel={immersionLevel} />

      {/* Gaze Highlight Overlay Tracker circle */}
      {showGazeCircle && (
        <div 
          className="fixed w-32 h-32 rounded-full pointer-events-none mix-blend-screen z-50 blur-xl opacity-35 transition-all duration-75 ease-out"
          style={{
            left: gazePos.x - 64,
            top: gazePos.y - 64,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          }}
        />
      )}

      {/* Global VisionOS Floating Header Status Bar */}
      <header className="fixed top-4 inset-x-0 mx-auto w-full max-w-5xl px-6 py-2.5 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-between z-50 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        {/* Title Brand logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-inner">
            
          </div>
          <span className="text-xs font-bold tracking-wider font-sans uppercase text-white/90">
            Spatial IT Core
          </span>
        </div>

        {/* Navigation Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/5 rounded-full">
          <button
            onClick={() => { playClickSound(); setIsWorkspaceMode(true); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              isWorkspaceMode 
                ? 'bg-white/10 text-white shadow-[0_2px_8px_rgba(255,255,255,0.08)] border border-white/10' 
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Spatial Desktop OS
          </button>
          <button
            onClick={() => { playClickSound(); setIsWorkspaceMode(false); }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
              !isWorkspaceMode 
                ? 'bg-white/10 text-white shadow-[0_2px_8px_rgba(255,255,255,0.08)] border border-white/10' 
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            Immersive Story Scroll
          </button>
        </div>

        {/* Global Utilities Status */}
        <div className="flex items-center gap-4 text-xs text-white/55 font-sans font-medium">
          {/* Eye gaze toggle widget */}
          <button
            onClick={() => { playClickSound(); setShowGazeCircle(!showGazeCircle); }}
            className={`p-1.5 rounded-lg border transition-all ${
              showGazeCircle 
                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
                : 'bg-white/5 border-white/5 text-white/30 hover:text-white'
            }`}
            title="Toggle spatial eye gaze tracking highlighter"
          >
            {showGazeCircle ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            <Wifi className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-[10px]">980 Mb/s</span>
          </div>

          <div className="flex items-center gap-1">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[10px]">100%</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/80 border-l border-white/10 pl-3">
            <Clock className="w-3.5 h-3.5 opacity-60" />
            <span>{currentTime || '07:27 AM'}</span>
          </div>
        </div>
      </header>

      {/* ==================== 1. SPATIAL DESKTOP WORKSPACE MODE ==================== */}
      {isWorkspaceMode ? (
        <main className="relative min-h-screen pt-24 pb-12 w-full overflow-hidden flex items-center justify-center">
          {/* Floating Left VisionOS Circular App Dock */}
          <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5 p-3.5 bg-black/30 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_16px_48px_rgba(0,0,0,0.6)] group hover:border-white/20 hover:shadow-blue-500/5 transition-all duration-300">
            {dockItems.map(item => {
              const win = windows.find(w => w.id === item.id);
              const isOpen = win?.isOpen && !win?.isMinimized;
              const isFocused = isOpen && activeWindowId === item.id;
              const Icon = item.icon;

              return (
                <div 
                  key={item.id} 
                  className="relative group/dock flex items-center"
                  onMouseEnter={() => setHoveredDockItem(item.id)}
                  onMouseLeave={() => setHoveredDockItem(null)}
                >
                  {/* Floating Tooltip Pill */}
                  {hoveredDockItem === item.id && (
                    <div className="absolute left-16 px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-[11px] text-white font-medium tracking-wide whitespace-nowrap shadow-2xl animate-fade-in pointer-events-none">
                      {item.label}
                      {win?.isMinimized && <span className="text-[9px] text-white/40 block">Minimized to Dock</span>}
                    </div>
                  )}

                  <button
                    onClick={() => { playClickSound(); toggleWindow(item.id); }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-90 ${
                      isFocused 
                        ? 'bg-white/20 border-white/30 text-white scale-105 shadow-lg shadow-blue-500/10' 
                        : isOpen 
                        ? 'bg-white/10 border-white/15 text-white/80' 
                        : 'bg-white/5 border-white/5 hover:border-white/15 text-white/50 hover:text-white hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />

                    {/* Active dots beneath icons representing task indicators */}
                    {win?.isOpen && (
                      <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                        win.isMinimized ? 'bg-white/25 scale-75' : 'bg-blue-400 shadow-[0_0_6px_#3b82f6]'
                      }`} />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Canvas Containing Floating Modular Glass Windows */}
          <div 
            className="relative w-full h-[85vh] max-w-7xl mx-auto rounded-3xl overflow-hidden pointer-events-none"
            id="workspace-canvas"
          >
            {/* Subtle Helper notice for desk workspace */}
            <div className="absolute inset-x-0 bottom-6 mx-auto text-center pointer-events-none opacity-45">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">
                 Vision Pro Workspace Platform • Use grab bars to stack windows
              </span>
            </div>

            {/* Render Windows */}
            {windows.map((win) => {
              if (!win.isOpen || win.isMinimized) return null;

              return (
                <div key={win.id} className="pointer-events-auto">
                  <SpatialWindowWrapper
                    id={win.id}
                    title={win.title}
                    x={win.x}
                    y={win.y}
                    width={win.width}
                    height={win.height}
                    zIndex={win.zIndex}
                    isActive={activeWindowId === win.id}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => minimizeWindow(win.id)}
                    onFocus={() => focusWindow(win.id)}
                    onMove={(x, y) => moveWindow(win.id, x, y)}
                  >
                    {win.type === 'about' && <AboutSpace />}
                    {win.type === 'journey' && <JourneySpace />}
                    {win.type === 'skills' && <SkillsSpace />}
                    {win.type === 'terminal' && <TerminalSpace />}
                  </SpatialWindowWrapper>
                </div>
              );
            })}
          </div>
        </main>
      ) : (
        /* ==================== 2. IMMERSIVE STORY SCROLL PRODUCT EXPERIENCE MODE ==================== */
        <main className="relative w-full min-h-screen pt-32 pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-24">
            
            {/* Story Hero Header: Introducing Spatial Tech */}
            <section className="text-center space-y-6 pt-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono font-bold text-blue-400 tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Breakthrough Solutions
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-none py-1">
                Introducing the Spatial Career Blueprint
              </h1>
              
              <p className="text-base sm:text-lg text-white/50 font-sans max-w-xl mx-auto leading-relaxed font-light">
                A gorgeous narrative journey highlighting 8+ years of engineering robust full-stack platforms, cloud scaling, and telemetry architectures.
              </p>
            </section>

            {/* Featured Hero Showcase Widget */}
            <section className="relative">
              <SpatialGlassCard className="p-8 sm:p-12 text-center sm:text-left space-y-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                      ENGINEERING PORTRAIT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
                      Meet {personalBio.name}
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed max-w-md">
                      {personalBio.tagline}
                    </p>
                    <div className="flex items-center gap-3 justify-center sm:justify-start pt-2">
                      <span className="flex items-center gap-1.5 text-xs text-white/50">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {personalBio.location}
                      </span>
                    </div>
                  </div>

                  {/* Giant floating avatar frame */}
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 blur-xl opacity-35 animate-pulse" />
                    <img 
                      src={personalBio.avatar} 
                      alt={personalBio.name} 
                      className="relative w-36 h-36 rounded-3xl object-cover border border-white/20 shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </SpatialGlassCard>
            </section>

            {/* Horizontal Timeline Journey Slides */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                  CHRONOLOGY IN FOCUS
                </h3>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  The Evolutionary Milestones
                </h2>
              </div>

              <div className="space-y-6">
                {milestones.map((m, idx) => {
                  const isCurrentPeak = idx === 0;
                  return (
                    <div key={m.id} className="relative">
                      {isCurrentPeak && (
                        <div className="absolute -top-3 left-6 z-10 px-3 py-1 bg-blue-500 text-[10px] font-black rounded-full uppercase tracking-tighter text-white">
                          Current Peak
                        </div>
                      )}
                      <SpatialGlassCard 
                        glowColor={m.category === 'architecture' ? 'rgba(255, 149, 0, 0.25)' : m.category === 'backend' ? 'rgba(175, 82, 222, 0.25)' : 'rgba(0, 122, 255, 0.25)'}
                        className={`p-6 sm:p-8 ${isCurrentPeak ? 'border-blue-500/30 bg-white/10 shadow-blue-500/5' : ''}`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          {/* Frame Column */}
                          <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between">
                            <div>
                              <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest italic flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{m.period}</span>
                              </div>
                              <h3 className="text-lg font-bold text-white tracking-tight">{m.role}</h3>
                              <p className="text-xs font-medium text-blue-400">{m.company}</p>
                            </div>
                            <span className={`w-fit text-[8px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                              m.category === 'architecture' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              m.category === 'backend' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                              'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            }`}>
                              {m.category}
                            </span>
                          </div>

                      {/* Achievements Detail column */}
                      <div className="md:col-span-8 space-y-4">
                        <p className="text-xs text-white/70 leading-relaxed">
                          {m.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {m.achievements.slice(0, 2).map((ach, aIdx) => (
                            <div key={aIdx} className="flex gap-2 items-start p-2 bg-white/5 rounded-lg">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                              <span className="text-white/85 text-[11px] leading-snug">{ach}</span>
                            </div>
                          ))}
                        </div>

                        {/* Interactive mini spec tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                          {m.skills.map(sk => (
                            <span key={sk} className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SpatialGlassCard>
                </div>
              );
            })}
              </div>
            </section>

            {/* Skills & Testimonials section */}
            <section className="space-y-8 pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                  SKILLS & PROFESSIONAL TESTIMONIALS
                </h3>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                  Core Expertise & Endorsements
                </h2>
                <p className="text-xs sm:text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
                  A high-fidelity breakdown of full-stack proficiencies, cloud infrastructure depth, and verified feedback from engineering leadership.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
                <SkillsSpace />
              </div>
            </section>

            {/* Comparison specs section: 2D desktop vs Spatial IT solutions */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold">
                  SPECIFICATION ARCHITECTURE
                </h3>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Why Spatial Architectures?
                </h2>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-3xl overflow-hidden font-sans">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px] font-mono">
                      <th className="p-4 sm:p-5">System Attribute</th>
                      <th className="p-4 sm:p-5">Legacy IT Style (2D)</th>
                      <th className="p-4 sm:p-5 text-blue-400 font-bold">Spatial Engineering (3D)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/80">
                    <tr>
                      <td className="p-4 sm:p-5 font-medium">Platform Scaling</td>
                      <td className="p-4 sm:p-5 text-white/50">Manual VM deployments, slow load gates.</td>
                      <td className="p-4 sm:p-5 text-blue-300 font-medium">Elastic Kubernetes, multi-region autoscaling.</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-medium">API Latency SLA</td>
                      <td className="p-4 sm:p-5 text-white/50">Restricted monolithic queries (500ms+ roundtrip).</td>
                      <td className="p-4 sm:p-5 text-blue-300 font-medium">Sub-50ms caching with Redis & gRPC streams.</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-medium">UI Performance</td>
                      <td className="p-4 sm:p-5 text-white/50">Heavy server rendering, bulky bundles.</td>
                      <td className="p-4 sm:p-5 text-blue-300 font-medium">Atomic responsive React SPAs, glass shaders.</td>
                    </tr>
                    <tr>
                      <td className="p-4 sm:p-5 font-medium">Deployment Guardrails</td>
                      <td className="p-4 sm:p-5 text-white/50">Manual SSH setups, unpredictable updates.</td>
                      <td className="p-4 sm:p-5 text-blue-300 font-medium">Declarative IaC with Terraform, automated CI/CD.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick interactive stats slider / skill card */}
            <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 text-center">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Ready to deploy your next spatial initiative?
              </h2>
              <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
                Connect with Prasad Sawant via email, check out GitHub code repositories, or audit full system capabilities back in Spatial Desktop OS mode.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <a 
                  href={`mailto:${personalBio.socials.email}`}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold tracking-wide transition-all hover:translate-y-[-1px] inline-flex items-center gap-1.5 shadow-lg"
                >
                  Initiate Secure Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => { playClickSound(); setIsWorkspaceMode(true); }}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold tracking-wide transition-all text-white/90"
                >
                  Return to Spatial OS
                </button>
              </div>
            </section>

          </div>
        </main>
      )}

      {/* Persistent Floating Digital Crown Control Dial */}
      <DigitalCrown 
        immersionLevel={immersionLevel} 
        setImmersionLevel={setImmersionLevel} 
      />
    </div>
  );
}
