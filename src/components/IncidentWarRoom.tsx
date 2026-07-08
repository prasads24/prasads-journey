import React, { useState, useEffect, useRef } from 'react';
import { X, Siren, Timer, Target, Zap, RotateCcw } from 'lucide-react';

interface WarRoomProps {
  onClose: () => void;
}

interface GameAlert {
  id: number;
  severity: 1 | 2 | 3 | 4; // 1 = most critical
  title: string;
  spawnedAt: number;
}

const ALERT_POOL: Record<number, string[]> = {
  1: [
    'CBS core database node DOWN',
    'Production cluster unreachable',
    'EOD batch cycle CRASHED',
    'Primary storage array offline',
  ],
  2: [
    'AutoSys job JOB_EOD_401 failed',
    'Fail-over sync lagging 15 min',
    'API error rate above 20%',
    'Replication broken on prod-db-02',
  ],
  3: [
    'Disk usage 92% on prod-app-01',
    'SSL cert expires in 24 hours',
    'Memory pressure on batch server',
    'Queue depth climbing steadily',
  ],
  4: [
    'Nightly log rotation skipped',
    'Non-prod monitoring agent stale',
    'Dev environment slow response',
    'Low-priority patch available',
  ],
};

const SEV_STYLES: Record<number, { badge: string; card: string; label: string }> = {
  1: { badge: 'bg-red-500 text-white', card: 'border-red-500/40 bg-red-500/10', label: 'P1 CRITICAL' },
  2: { badge: 'bg-orange-500 text-white', card: 'border-orange-500/40 bg-orange-500/10', label: 'P2 HIGH' },
  3: { badge: 'bg-yellow-500 text-black', card: 'border-yellow-500/40 bg-yellow-500/10', label: 'P3 MEDIUM' },
  4: { badge: 'bg-blue-500 text-white', card: 'border-blue-500/40 bg-blue-500/10', label: 'P4 LOW' },
};

const TOTAL_ALERTS = 15;
const SPAWN_INTERVAL_MS = 1600;

export default function IncidentWarRoom({ onClose }: WarRoomProps) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'over'>('intro');
  const [alerts, setAlerts] = useState<GameAlert[]>([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [shakeId, setShakeId] = useState<number | null>(null);

  const spawnedCount = useRef(0);
  const clearedCount = useRef(0);
  const responseTimes = useRef<number[]>([]);
  const startTime = useRef(0);
  const nextId = useRef(1);

  // Spawn alerts while playing
  useEffect(() => {
    if (phase !== 'playing') return;
    startTime.current = Date.now();

    const spawner = setInterval(() => {
      if (spawnedCount.current >= TOTAL_ALERTS) {
        clearInterval(spawner);
        return;
      }
      spawnedCount.current += 1;
      const severity = (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;
      const pool = ALERT_POOL[severity];
      setAlerts(prev => [
        ...prev,
        {
          id: nextId.current++,
          severity,
          title: pool[Math.floor(Math.random() * pool.length)],
          spawnedAt: Date.now(),
        },
      ]);
    }, SPAWN_INTERVAL_MS);

    const ticker = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    }, 250);

    return () => {
      clearInterval(spawner);
      clearInterval(ticker);
    };
  }, [phase]);

  const startGame = () => {
    spawnedCount.current = 0;
    clearedCount.current = 0;
    responseTimes.current = [];
    nextId.current = 1;
    setAlerts([]);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setElapsed(0);
    setPhase('playing');
  };

  const handleAlertClick = (alert: GameAlert) => {
    // The correct pick is the highest-priority (lowest severity number) alert on the board
    const highestSeverity = Math.min(...alerts.map(a => a.severity));
    if (alert.severity === highestSeverity) {
      const responseMs = Date.now() - alert.spawnedAt;
      responseTimes.current.push(responseMs);
      // Base points plus a speed bonus that decays over 8 seconds
      const speedBonus = Math.max(0, 80 - Math.floor(responseMs / 100));
      setScore(s => s + 100 + speedBonus);
      setCorrect(c => c + 1);
      clearedCount.current += 1;
      setAlerts(prev => prev.filter(a => a.id !== alert.id));

      if (clearedCount.current >= TOTAL_ALERTS) {
        setPhase('over');
      }
    } else {
      setScore(s => Math.max(0, s - 50));
      setWrong(w => w + 1);
      setShakeId(alert.id);
      setTimeout(() => setShakeId(null), 400);
    }
  };

  const avgResponse = responseTimes.current.length
    ? (responseTimes.current.reduce((a, b) => a + b, 0) / responseTimes.current.length / 1000).toFixed(1)
    : '0.0';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-950 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Siren className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Incident War Room</h3>
          </div>
          <div className="flex items-center gap-4">
            {phase === 'playing' && (
              <>
                <span className="text-[11px] font-mono text-white/60 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5" /> {elapsed}s
                </span>
                <span className="text-[11px] font-mono text-blue-400 font-bold">{score} pts</span>
              </>
            )}
            <button onClick={onClose} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {phase === 'intro' && (
            <div className="text-center py-8 space-y-4">
              <Siren className="w-12 h-12 text-red-400 mx-auto animate-pulse" />
              <h4 className="text-lg font-bold text-white">It's 2 AM. PagerDuty is going off.</h4>
              <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
                {TOTAL_ALERTS} alerts are about to hit the board. Clear them by always clicking
                the <span className="text-red-400 font-semibold">highest-severity</span> alert
                currently visible (P1 before P2 before P3 before P4). Faster response = more points.
                Wrong picks cost you.
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Acknowledge & Begin
              </button>
            </div>
          )}

          {phase === 'playing' && (
            <div className="space-y-2.5">
              {alerts.length === 0 && (
                <p className="text-center text-xs text-white/40 py-10 font-mono animate-pulse">
                  Monitoring... alerts incoming
                </p>
              )}
              {alerts.map(alert => {
                const style = SEV_STYLES[alert.severity];
                return (
                  <button
                    key={alert.id}
                    onClick={() => handleAlertClick(alert)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all hover:scale-[1.01] active:scale-[0.99] animate-fade-in ${style.card} ${
                      shakeId === alert.id ? 'animate-[shake_0.4s_ease-in-out]' : ''
                    }`}
                  >
                    <span className={`text-[9px] font-black px-2 py-1 rounded-md shrink-0 ${style.badge}`}>
                      {style.label}
                    </span>
                    <span className="text-xs text-white/90 font-mono">{alert.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {phase === 'over' && (
            <div className="text-center py-8 space-y-5">
              <Zap className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">All Clear. Incident Resolved.</h4>
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xl font-bold text-white">{score}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Score</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xl font-bold text-white">{elapsed}s</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Total Time</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-xl font-bold text-white">{avgResponse}s</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Avg Response</div>
                </div>
              </div>
              <p className="text-[11px] text-white/50 font-mono">
                <Target className="w-3 h-3 inline mr-1" />
                {correct} correct · {wrong} mis-triaged
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Play Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
