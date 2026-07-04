import React, { useState, useEffect } from 'react';
import { skills, testimonials } from '../data/careerData';
import { SkillItem } from '../types';
import * as LucideIcons from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PendingTestimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  text: string;
}

export default function SkillsSpace() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'languages' | 'frameworks' | 'cloud' | 'tools' | 'soft'>('all');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  // Visitor-submitted endorsements that have been approved (fetched from Supabase)
  const [approvedSubmissions, setApprovedSubmissions] = useState<PendingTestimonial[]>([]);
  const [showEndorseForm, setShowEndorseForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', title: '', company: '', relationship: '', text: '' });

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('endorsements')
      .select('id, name, title, company, relationship, text')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setApprovedSubmissions(data as PendingTestimonial[]);
      });
  }, []);

  const handleSubmitEndorsement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('submitting');
    const { error } = await supabase.from('endorsements').insert([{
      name: formData.name.trim(),
      title: formData.title.trim(),
      company: formData.company.trim(),
      relationship: formData.relationship.trim(),
      text: formData.text.trim(),
      status: 'pending',
    }]);
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setFormData({ name: '', title: '', company: '', relationship: '', text: '' });
    }
  };

  const allTestimonials = [...testimonials, ...approvedSubmissions];


  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Layers' },
    { id: 'languages', label: 'Languages' },
    { id: 'frameworks', label: 'Frameworks' },
    { id: 'cloud', label: 'Cloud & Orchestration' },
    { id: 'tools', label: 'Storage & Tooling' },
    { id: 'soft', label: 'Soft Skills' }
  ];

  return (
    <div className="space-y-6">
      {/* Category selector pill bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-black/30 backdrop-blur-md border border-white/5 rounded-2xl w-fit">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(255,255,255,0.08)] border border-white/10'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Focus Inspector (Vision Pro Gaze Info Box) */}
      <div className="min-h-[7rem] bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all duration-300 relative overflow-hidden">
        {hoveredSkill ? (
          <>
            <div className="flex items-center gap-4 min-w-0">
              {/* Animated Skill Logo */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/15 flex items-center justify-center text-blue-300 shadow-lg shrink-0">
                <DynamicIcon name={hoveredSkill.iconName} className="w-7 h-7" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                  {hoveredSkill.name}
                  <span className="text-[10px] font-mono font-normal text-white/50 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                    {hoveredSkill.yearsOfExperience} yrs exp
                  </span>
                </h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  {hoveredSkill.description}
                </p>
              </div>
            </div>

            {/* Proficiency visual dial */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    stroke="rgba(255, 255, 255, 0.05)" 
                    strokeWidth="4" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    stroke="url(#progressGradient)" 
                    strokeWidth="4" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 26}
                    strokeDashoffset={2 * Math.PI * 26 * (1 - hoveredSkill.proficiency / 100)}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-xs font-mono font-bold text-white">
                  {hoveredSkill.proficiency}%
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/40 uppercase mt-1">PRO COMPLIANCE</span>
            </div>
          </>
        ) : (
          <div className="text-center w-full py-4 text-xs text-white/40 flex flex-col items-center gap-1.5">
            <LucideIcons.Eye className="w-5 h-5 text-white/20 animate-pulse" />
            <span>Gaze or hover over any spatial circular skill icon below to inspect core competencies.</span>
          </div>
        )}
      </div>

      {/* Grid of round VisionOS App Icons representing Skills */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-5 pt-2">
        {filteredSkills.map(skill => {
          const isHovered = hoveredSkill?.id === skill.id;
          return (
            <div
              key={skill.id}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              {/* Circle VisionOS App Icon */}
              <div 
                className={`relative w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 overflow-hidden shadow-lg ${
                  isHovered 
                    ? 'scale-110 border-white/30 shadow-blue-500/10 -translate-y-1' 
                    : 'border-white/10 hover:border-white/20 bg-gradient-to-b from-zinc-800/40 to-zinc-950/40'
                }`}
                style={{
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                }}
              >
                {/* Visual Glass Reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />

                {/* Hover Glow Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                <div className={`transition-all duration-300 ${isHovered ? 'text-white scale-110' : 'text-white/70'}`}>
                  <DynamicIcon name={skill.iconName} className="w-6 h-6" />
                </div>
              </div>

              {/* Skill Label */}
              <span className="text-[10px] font-medium text-white/60 text-center truncate w-full group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Trustworthy Testimonials Section */}
      <div className="border-t border-white/10 pt-8 mt-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LucideIcons.MessageSquareQuote className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Professional Endorsements
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
              Verified Colleague & Manager Reviews
            </span>
            <button
              onClick={() => { setSubmitStatus('idle'); setShowEndorseForm(true); }}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full transition-all"
            >
              <LucideIcons.PenLine className="w-3 h-3" />
              Endorse Me
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allTestimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 group shadow-lg"
            >
              <div>
                {/* 5-Star Rating Indicator */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <LucideIcons.Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-white/70 italic leading-relaxed mb-6 group-hover:text-white/95 transition-colors">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3.5 border-t border-white/5">
                {('avatar' in t && t.avatar) ? (
                  <img 
                    src={(t as typeof testimonials[0]).avatar} 
                    alt={t.name} 
                    className="w-9 h-9 rounded-full object-cover border border-white/15 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-300 text-xs font-bold shrink-0">
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                  <p className="text-[10px] text-white/50 truncate">
                    {t.title}
                  </p>
                  <p className="text-[9px] text-blue-400 font-mono tracking-tight">
                    {t.company} • {t.relationship}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endorse Me Submission Modal */}
      {showEndorseForm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowEndorseForm(false)}
        >
          <div 
            className="bg-zinc-950 border border-white/10 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-6 space-y-3">
                <LucideIcons.CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Thank you!</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  Your endorsement has been submitted. It'll appear here once reviewed and approved.
                </p>
                <button
                  onClick={() => setShowEndorseForm(false)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    Endorse Prasad
                  </h3>
                  <button onClick={() => setShowEndorseForm(false)} className="text-white/40 hover:text-white">
                    <LucideIcons.X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Worked with Prasad? Share a quick endorsement. Submissions are reviewed before appearing publicly.
                </p>
                <form onSubmit={handleSubmitEndorsement} className="space-y-3">
                  <input
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-blue-500/50"
                  />
                  <input
                    required
                    placeholder="Your title (e.g. Senior IT Manager)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-blue-500/50"
                  />
                  <input
                    required
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-blue-500/50"
                  />
                  <input
                    required
                    placeholder="Relationship (e.g. Manager, Colleague)"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-blue-500/50"
                  />
                  <textarea
                    required
                    placeholder="Your endorsement..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    rows={4}
                    maxLength={500}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-blue-500/50 resize-none"
                  />
                  {submitStatus === 'error' && (
                    <p className="text-[11px] text-red-400">
                      Something went wrong submitting this. Please try again in a moment.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold py-2.5 rounded-xl transition-all"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Endorsement'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Render dynamic Lucide Icons based on string name safely
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) {
    return <LucideIcons.Cpu className={className} />;
  }
  return <IconComponent className={className} />;
}
