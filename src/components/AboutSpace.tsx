import React, { useState, useEffect } from 'react';
import { personalBio } from '../data/careerData';
import { Github, Linkedin, Instagram, Mail, Award, Cpu, Flame, CheckCircle, MapPin, Sparkles } from 'lucide-react';

const STATUS_ROTATION = ['ACTIVE', 'BUILDING', 'LEARNING', 'AUTOMATING', 'ONLINE'];

export default function AboutSpace() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_ROTATION.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Intro Hero Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-white/5 pb-6">
        <div className="relative">
          {/* Avatar frame styled as a floating spatial lens ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 blur-md opacity-40 animate-pulse" />
          <img 
            src={personalBio.avatar} 
            alt={personalBio.name} 
            className="relative w-24 h-24 rounded-2xl object-cover border border-white/20 shadow-2xl referrer-policy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 text-white flex items-center gap-1 shadow-lg min-w-[78px] justify-center">
            <Sparkles className="w-3 h-3 text-white shrink-0" />
            <span key={statusIndex} className="animate-fade-in">
              {STATUS_ROTATION[statusIndex]}
            </span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold font-sans tracking-tight text-white flex items-center justify-center md:justify-start gap-2.5">
            {personalBio.name}
            <span className="text-xs font-mono font-normal text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              v1.4.0-prod
            </span>
          </h2>
          <p className="text-sm font-medium text-white/75">{personalBio.title}</p>
          
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-white/40">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>{personalBio.location}</span>
          </div>
        </div>
      </div>

      {/* Narrative Tagline */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm leading-relaxed text-white/80">
        <span className="font-semibold text-blue-400">Mission Parameters:</span> {personalBio.tagline}
      </div>

      {/* Spatial Telemetry Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Experience</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white tracking-tight">{personalBio.stats.experienceYears}</span>
            <span className="text-[10px] text-white/50 block font-sans">Engineering Depth</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Completed</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white tracking-tight">{personalBio.stats.projectsCompleted}+</span>
            <span className="text-[10px] text-white/50 block font-sans">Batch Jobs Automated</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Service SLA</span>
            <Cpu className="w-4 h-4 text-green-400 animate-spin-slow" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white tracking-tight">{personalBio.stats.cloudUptime}</span>
            <span className="text-[10px] text-white/50 block font-sans">Orchestrated Uptime</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 hover:bg-white/10 transition-all duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Lines Contributed</span>
            <CheckCircle className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-white tracking-tight">{personalBio.stats.linesOfCode}</span>
            <span className="text-[10px] text-white/50 block font-sans">Pruned, typed statements</span>
          </div>
        </div>
      </div>

      {/* Communications Links */}
      <div className="space-y-2.5">
        <h3 className="text-[10px] font-mono text-white/30 uppercase tracking-widest pl-1">
          Secure Communications
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <a 
            href={personalBio.socials.github} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all hover:translate-y-[-2px]"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a 
            href={personalBio.socials.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all hover:translate-y-[-2px]"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
          </a>

          <a 
            href={personalBio.socials.instagram} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all hover:translate-y-[-2px]"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram</span>
          </a>

          <a 
            href={`mailto:${personalBio.socials.email}`}
            className="flex items-center gap-2.5 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-medium text-white/80 hover:text-white transition-all hover:translate-y-[-2px]"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Secure Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
