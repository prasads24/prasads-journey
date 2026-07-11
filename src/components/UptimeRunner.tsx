import React, { useEffect, useRef, useState } from 'react';
import { X, Server, RotateCcw, Zap } from 'lucide-react';

interface UptimeRunnerProps {
  onClose: () => void;
}

const GRAVITY = 0.9;
const JUMP_VELOCITY = -14;
const GROUND_Y_RATIO = 0.78; // fraction of canvas height where the ground sits
const PLAYER_SIZE = 34;
const BASE_SPEED = 5.5;
const MAX_SPEED = 11;
const SPEED_RAMP_MS = 25000; // time to reach max speed

type ObstacleType = 'server-down' | 'connection-lost' | 'timeout';

interface Obstacle {
  x: number;
  width: number;
  height: number;
  type: ObstacleType;
  passed: boolean;
}

const OBSTACLE_LABELS: Record<ObstacleType, string> = {
  'server-down': '500',
  'connection-lost': 'ERR',
  'timeout': '408',
};

function getRank(seconds: number): string {
  if (seconds >= 90) return 'Five Nines Legend';
  if (seconds >= 60) return 'SRE On-Call Hero';
  if (seconds >= 35) return 'Reliable Engineer';
  if (seconds >= 15) return 'Junior Sysadmin';
  return 'Intern Energy';
}

export default function UptimeRunner({ onClose }: UptimeRunnerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'intro' | 'playing' | 'over'>('intro');
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [finalSeconds, setFinalSeconds] = useState(0);
  const [dodged, setDodged] = useState(0);
  const [best, setBest] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('uptimeRunnerBest') || 0);
    } catch {
      return 0;
    }
  });

  // Mutable game state kept in refs so the render loop doesn't fight React's render cycle
  const stateRef = useRef({
    playerY: 0,
    velocityY: 0,
    isJumping: false,
    obstacles: [] as Obstacle[],
    startTime: 0,
    lastSpawn: 0,
    nextSpawnGap: 900,
    dodgedCount: 0,
    running: false,
  });

  const jump = () => {
    const s = stateRef.current;
    if (!s.isJumping && s.running) {
      s.velocityY = JUMP_VELOCITY;
      s.isJumping = true;
    }
  };

  const startGame = () => {
    const s = stateRef.current;
    s.playerY = 0;
    s.velocityY = 0;
    s.isJumping = false;
    s.obstacles = [];
    s.startTime = Date.now();
    s.lastSpawn = Date.now();
    s.nextSpawnGap = 1000;
    s.dodgedCount = 0;
    s.running = true;
    setDodged(0);
    setDisplaySeconds(0);
    setPhase('playing');
  };

  // Input handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (phase === 'intro') startGame();
        else if (phase === 'playing') jump();
        else if (phase === 'over') startGame();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase]);

  // Main render/physics loop
  useEffect(() => {
    if (phase !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    const s = stateRef.current;

    const loop = () => {
      const width = canvas.width;
      const height = canvas.height;
      const groundY = height * GROUND_Y_RATIO;
      const elapsedMs = Date.now() - s.startTime;
      const speedProgress = Math.min(1, elapsedMs / SPEED_RAMP_MS);
      const speed = BASE_SPEED + (MAX_SPEED - BASE_SPEED) * speedProgress;

      // Physics
      s.velocityY += GRAVITY;
      s.playerY += s.velocityY;
      if (s.playerY > 0) {
        s.playerY = 0;
        s.velocityY = 0;
        s.isJumping = false;
      }

      // Spawn obstacles
      if (Date.now() - s.lastSpawn > s.nextSpawnGap) {
        const types: ObstacleType[] = ['server-down', 'connection-lost', 'timeout'];
        const type = types[Math.floor(Math.random() * types.length)];
        s.obstacles.push({
          x: width + 20,
          width: 34,
          height: 40,
          type,
          passed: false,
        });
        s.lastSpawn = Date.now();
        // Gap shrinks as speed increases, floor to keep it fair
        s.nextSpawnGap = Math.max(650, 1100 - speedProgress * 500) + Math.random() * 400;
      }

      // Move obstacles, check collisions & scoring
      const playerX = width * 0.15;
      const playerBottom = groundY + s.playerY;
      const playerTop = playerBottom - PLAYER_SIZE;

      let collided = false;
      s.obstacles = s.obstacles.filter(ob => {
        ob.x -= speed;
        if (!ob.passed && ob.x + ob.width < playerX) {
          ob.passed = true;
          s.dodgedCount += 1;
        }
        // AABB collision check
        const obTop = groundY - ob.height;
        const overlapX = playerX + PLAYER_SIZE * 0.7 > ob.x && playerX + PLAYER_SIZE * 0.3 < ob.x + ob.width;
        const overlapY = playerBottom > obTop;
        if (overlapX && overlapY) collided = true;
        return ob.x > -60;
      });

      if (collided) {
        s.running = false;
        const secs = elapsedMs / 1000;
        setFinalSeconds(secs);
        setDodged(s.dodgedCount);
        setBest(prevBest => {
          const newBest = Math.max(prevBest, secs);
          try { localStorage.setItem('uptimeRunnerBest', String(newBest)); } catch {}
          return newBest;
        });
        setPhase('over');
        return;
      }

      setDisplaySeconds(Math.floor(elapsedMs / 100) / 10);

      // --- Draw ---
      ctx.clearRect(0, 0, width, height);

      // Ground line
      const groundGradient = ctx.createLinearGradient(0, groundY, 0, height);
      groundGradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      groundGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, groundY, width, height - groundY);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Player (rounded server block with a pulse glow)
      ctx.save();
      ctx.shadowColor = 'rgba(59, 130, 246, 0.7)';
      ctx.shadowBlur = 16;
      const pGrad = ctx.createLinearGradient(playerX, playerTop, playerX + PLAYER_SIZE, playerBottom);
      pGrad.addColorStop(0, '#60a5fa');
      pGrad.addColorStop(1, '#4f46e5');
      ctx.fillStyle = pGrad;
      roundRect(ctx, playerX, playerTop, PLAYER_SIZE, PLAYER_SIZE, 8);
      ctx.fill();
      ctx.restore();
      // Little status dot on player, like a signal light
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(playerX + PLAYER_SIZE - 6, playerTop + 6, 3, 0, Math.PI * 2);
      ctx.fill();

      // Obstacles ("downtime" blocks)
      s.obstacles.forEach(ob => {
        const obTop = groundY - ob.height;
        ctx.save();
        ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
        ctx.shadowBlur = 12;
        const oGrad = ctx.createLinearGradient(ob.x, obTop, ob.x, groundY);
        oGrad.addColorStop(0, '#f87171');
        oGrad.addColorStop(1, '#b91c1c');
        ctx.fillStyle = oGrad;
        roundRect(ctx, ob.x, obTop, ob.width, ob.height, 6);
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(OBSTACLE_LABELS[ob.type], ob.x + ob.width / 2, obTop + ob.height / 2 + 4);
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-zinc-950 border border-white/10 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Uptime Runner</h3>
          </div>
          <div className="flex items-center gap-4">
            {phase === 'playing' && (
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                {displaySeconds.toFixed(1)}s streak
              </span>
            )}
            <button onClick={onClose} className="text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {phase === 'intro' && (
            <div className="text-center py-6 space-y-4">
              <Server className="w-10 h-10 text-blue-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Keep the Uptime Streak Alive</h4>
              <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
                Production never sleeps. Jump over incoming incidents — timeouts, dropped
                connections, 500 errors — and see how long you can stay online. Speed
                increases the longer you survive.
              </p>
              <p className="text-[10px] text-white/40 font-mono">
                Press SPACE or tap the screen to jump
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Go Live
              </button>
              {best > 0 && (
                <p className="text-[10px] text-white/40 font-mono">Best streak: {best.toFixed(1)}s</p>
              )}
            </div>
          )}

          {phase === 'playing' && (
            <canvas
              ref={canvasRef}
              width={520}
              height={260}
              onMouseDown={jump}
              onTouchStart={(e) => { e.preventDefault(); jump(); }}
              className="w-full h-auto rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-black/40 cursor-pointer touch-none"
            />
          )}

          {phase === 'over' && (
            <div className="text-center py-6 space-y-5">
              <Zap className="w-10 h-10 text-red-400 mx-auto" />
              <h4 className="text-base font-bold text-white">SLA Breached</h4>
              <p className="text-xs text-white/50 font-mono">{getRank(finalSeconds)}</p>
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{finalSeconds.toFixed(1)}s</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Uptime Streak</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{dodged}</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Incidents Dodged</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className="text-lg font-bold text-white">{best.toFixed(1)}s</div>
                  <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5">Best Streak</div>
                </div>
              </div>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Redeploy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
