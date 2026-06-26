import React, { useState, useRef, useEffect } from 'react';
import { personalBio, milestones, skills } from '../data/careerData';
import { Terminal, Send, CheckCircle, Flame, Server } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'system';
}

export default function TerminalSpace() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "System Initialized: Spatial Core v1.4.0", type: "system" },
    { text: "Type 'help' to view available secure protocol commands.", type: "output" }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    const newHistory = [...history, { text: `prasad-spatial-core:~ $ ${cmdText}`, type: "input" as const }];

    if (trimmed === '') {
      setHistory(newHistory);
      return;
    }

    let outputs: TerminalLine[] = [];

    switch (trimmed) {
      case 'help':
        outputs = [
          { text: "AVAILABLE PROTOCOLS:", type: "system" },
          { text: "  bio        Retrieve primary developer vitals & parameters", type: "output" },
          { text: "  journey    Print full IT career timeline & milestone logs", type: "output" },
          { text: "  skills     Audit core technology competencies & proficiencies", type: "output" },
          { text: "  contact    Display secure communication credentials", type: "output" },
          { text: "  clear      Flush console buffer history", type: "output" }
        ];
        break;

      case 'bio':
        outputs = [
          { text: `DEVELOPER NAME: ${personalBio.name}`, type: "output" },
          { text: `ROLE SPEC:     ${personalBio.title}`, type: "output" },
          { text: `LOCATION:      ${personalBio.location}`, type: "output" },
          { text: `METRICS:       ${personalBio.stats.experienceYears} Exp | ${personalBio.stats.projectsCompleted} Projects | ${personalBio.stats.cloudUptime} SLA`, type: "output" },
          { text: `STATEMENT:     "${personalBio.tagline}"`, type: "output" }
        ];
        break;

      case 'journey':
        outputs = [{ text: "RETRIEVING IT CHRONOLOGICAL LOGS:", type: "system" }];
        milestones.forEach(m => {
          outputs.push(
            { text: `[${m.period}] - ${m.role} @ ${m.company}`, type: "output" },
            { text: `  ↳ Loc: ${m.location} | Tech: ${m.skills.slice(0, 4).join(', ')}`, type: "output" }
          );
        });
        break;

      case 'skills':
        outputs = [{ text: "CORE TECH COMPLIANCE DECK:", type: "system" }];
        const languages = skills.filter(s => s.category === 'languages').map(s => `${s.name} (${s.proficiency}%)`);
        const frameworks = skills.filter(s => s.category === 'frameworks').map(s => `${s.name} (${s.proficiency}%)`);
        const cloud = skills.filter(s => s.category === 'cloud').map(s => `${s.name} (${s.proficiency}%)`);
        
        outputs.push(
          { text: `⚙️ Languages:  ${languages.join(', ')}`, type: "output" },
          { text: `⚛️ Frameworks:  ${frameworks.join(', ')}`, type: "output" },
          { text: `☁️ Cloud/Ops:   ${cloud.join(', ')}`, type: "output" }
        );
        break;

      case 'contact':
        outputs = [
          { text: "ESTABLISHING SECURE PROTOCOLS:", type: "system" },
          { text: `📧 Direct Mail:      ${personalBio.socials.email}`, type: "output" },
          { text: `🐙 GitHub Socket:    ${personalBio.socials.github}`, type: "output" },
          { text: `🔗 LinkedIn Socket:  ${personalBio.socials.linkedin}`, type: "output" }
        ];
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputs = [
          { text: `Command not found: '${cmdText}'. Type 'help' for valid protocols.`, type: "error" }
        ];
        break;
    }

    setHistory([...newHistory, ...outputs]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  const commandShortcuts = ['bio', 'journey', 'skills', 'contact', 'help'];

  return (
    <div className="flex flex-col h-[380px] bg-black/60 border border-white/10 rounded-2xl overflow-hidden font-mono text-xs text-green-400">
      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center bg-zinc-950/80 px-4 py-2 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 text-white/50">
          <Terminal className="w-3.5 h-3.5 text-green-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-bold">Secure Core Shell</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
          <div className="w-2 h-2 rounded-full bg-green-500/40" />
        </div>
      </div>

      {/* Suggestion command buttons */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 border-b border-white/5 overflow-x-auto text-[10px] shrink-0 custom-scrollbar">
        <span className="text-white/30 shrink-0">Click shortcut:</span>
        {commandShortcuts.map(sc => (
          <button
            key={sc}
            onClick={() => executeCommand(sc)}
            className="px-2 py-0.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded text-green-300 transition-colors shrink-0 cursor-pointer"
          >
            {sc}
          </button>
        ))}
      </div>

      {/* Terminal logs area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar min-h-0 bg-black/30">
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed whitespace-pre-wrap">
            {line.type === 'input' && (
              <span className="text-white/80">{line.text}</span>
            )}
            {line.type === 'system' && (
              <span className="text-blue-400 font-bold">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red-400">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-green-300/90">{line.text}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input field */}
      <div className="flex items-center gap-2 bg-zinc-950/80 px-4 py-3 border-t border-white/5 shrink-0">
        <span className="text-white/40 font-bold select-none">prasad-spatial-core:~ $</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type secure command (e.g. bio) and press enter..."
          className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-800 text-xs font-mono font-medium focus:ring-0 focus:border-none p-0"
        />
        <button
          onClick={() => executeCommand(input)}
          className="p-1 text-green-500 hover:text-green-300 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
