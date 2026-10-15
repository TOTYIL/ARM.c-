import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HardHat, Zap, CheckCircle2 } from 'lucide-react';

interface WorkerState {
  id: string;
  name: string;
  role: string;
  dialogue: string;
}

export default function ConstructionWorkersScene() {
  const [activeWorker, setActiveWorker] = useState<WorkerState | null>(null);
  const [isTurbo, setIsTurbo] = useState(false);
  const [sparkTick, setSparkTick] = useState(0);

  // Sparks timer for welder
  useEffect(() => {
    const speedMs = isTurbo ? 90 : 250;
    const interval = setInterval(() => {
      setSparkTick((prev) => (prev + 1) % 100);
    }, speedMs);
    return () => clearInterval(interval);
  }, [isTurbo]);

  const workers: Record<string, WorkerState> = {
    crane: {
      id: 'crane',
      name: 'Leo',
      role: 'Crane Operator',
      dialogue: 'Lowering the primary ARM steel superstructure! Steady hands up here!'
    },
    welder: {
      id: 'welder',
      name: 'Maya',
      role: 'TIG Welder',
      dialogue: isTurbo 
        ? 'TURBO WELDING! Melting titanium trusses at 400 amps!' 
        : 'Welding the scaffolding cross-bracing. Joint penetration is 100%!'
    },
    engineer: {
      id: 'engineer',
      name: 'Sam',
      role: 'Lead Architect',
      dialogue: isTurbo
        ? 'Double-timing the inspection walk! Every circuit must be verified!'
        : 'Reviewing the blueprint against the physical frame. Looks pristine.'
    },
    mechanic: {
      id: 'mechanic',
      name: 'Dex',
      role: 'Mechanic',
      dialogue: isTurbo
        ? 'Maximum torque mode! Impact wrench spinning at 3,000 RPM!'
        : 'Tightening the high-torque planetary gearbox to factory specs.'
    },
    bot: {
      id: 'bot',
      name: 'Rover-01',
      role: 'Autonomous Assistant',
      dialogue: isTurbo
        ? 'OVERDRIVE ACTIVE! High-speed delivery run in progress!'
        : 'BEEP! Transporting high-tensile hardware to mechanic Dex.'
    }
  };

  const handleWorkerClick = (key: string) => {
    setActiveWorker(workers[key]);
    setTimeout(() => {
      setActiveWorker((current) => (current?.id === key ? null : current));
    }, 4500);
  };

  // Dynamic animation speeds based on Turbo mode
  const weldSpeed = isTurbo ? '0.2s' : '0.8s';
  const wrenchSpeed = isTurbo ? '0.22s' : '0.9s';
  const gearSpeed = isTurbo ? '1.2s' : '4.5s';
  const roverSpeed = isTurbo ? '2.5s' : '7s';
  const architectSpeed = isTurbo ? '2.8s' : '8s';
  const beamSwaySpeed = isTurbo ? '1.4s' : '3.6s';
  const trolleySpeed = isTurbo ? '3.5s' : '9s';

  return (
    <div className="relative w-full max-w-4xl mx-auto my-4 select-none">
      
      {/* CSS Animations */}
      <style>{`
        @keyframes anim-weld-arm {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(14deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes anim-wrench-arm {
          0% { transform: rotate(0deg); }
          40% { transform: rotate(-30deg); }
          60% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes anim-gear-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes anim-rover-move {
          0% { transform: translate(320px, 322px) scaleX(1); }
          48% { transform: translate(460px, 322px) scaleX(1); }
          50% { transform: translate(460px, 322px) scaleX(-1); }
          98% { transform: translate(320px, 322px) scaleX(-1); }
          100% { transform: translate(320px, 322px) scaleX(1); }
        }
        @keyframes anim-architect-pace {
          0% { transform: translate(220px, 308px) scaleX(1); }
          48% { transform: translate(310px, 308px) scaleX(1); }
          50% { transform: translate(310px, 308px) scaleX(-1); }
          98% { transform: translate(220px, 308px) scaleX(-1); }
          100% { transform: translate(220px, 308px) scaleX(1); }
        }
        @keyframes anim-trolley-move {
          0% { transform: translateX(0px); }
          50% { transform: translateX(80px); }
          100% { transform: translateX(0px); }
        }
        @keyframes anim-beam-sway {
          0% { transform: rotate(-1.8deg); }
          50% { transform: rotate(1.8deg); }
          100% { transform: rotate(-1.8deg); }
        }
        @keyframes anim-radio-arm {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-18deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes anim-spark-burst {
          0% { opacity: 1; transform: scale(0.6) translate(0, 0); }
          100% { opacity: 0; transform: scale(1.6) translate(6px, -6px); }
        }
      `}</style>

      {/* Speech Bubble / Worker Dialogue Display */}
      <div className="h-10 mb-2 flex items-center justify-center">
        {activeWorker ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-900 text-white text-xs font-mono rounded-full shadow-md"
          >
            <span className="font-semibold text-amber-400">{activeWorker.name} ({activeWorker.role}):</span>
            <span>"{activeWorker.dialogue}"</span>
          </motion.div>
        ) : (
          <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Click any worker or the robot to see live crew logs
          </span>
        )}
      </div>

      {/* Main SVG Construction Stage */}
      <div className={`relative w-full aspect-[16/9] sm:aspect-[2/1] bg-white border ${isTurbo ? 'border-amber-400 shadow-md ring-2 ring-amber-400/20' : 'border-neutral-200 shadow-xs'} rounded-lg overflow-hidden transition-all duration-300`}>
        
        {/* Subtle Architectural Grid Background */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* SVG Drawing Canvas */}
        <svg 
          viewBox="0 0 800 400" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="girder-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 20 20 M 20 0 L 0 20" stroke="#d4d4d8" strokeWidth="1" />
            </pattern>
            {/* Welding Glow Radial Gradient */}
            <radialGradient id="weldingGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#0284c7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ground Platform Girder */}
          <rect x="40" y="350" width="720" height="18" fill="#18181b" rx="2" />
          <line x1="40" y1="354" x2="760" y2="354" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="6 4" />
          
          {/* Construction Safety Cones */}
          <g transform="translate(60, 328)">
            <polygon points="12,0 3,22 21,22" fill="#f97316" />
            <rect x="0" y="20" width="24" height="3" fill="#ea580c" />
            <polygon points="10,8 6,16 18,16 14,8" fill="#ffffff" />
          </g>
          <g transform="translate(710, 328)">
            <polygon points="12,0 3,22 21,22" fill="#f97316" />
            <rect x="0" y="20" width="24" height="3" fill="#ea580c" />
            <polygon points="10,8 6,16 18,16 14,8" fill="#ffffff" />
          </g>

          {/* Left Scaffolding Structure */}
          <g id="scaffolding-left">
            <line x1="120" y1="140" x2="120" y2="350" stroke="#71717a" strokeWidth="3" />
            <line x1="220" y1="140" x2="220" y2="350" stroke="#71717a" strokeWidth="3" />
            <line x1="110" y1="210" x2="230" y2="210" stroke="#27272a" strokeWidth="4" />
            <line x1="110" y1="280" x2="230" y2="280" stroke="#27272a" strokeWidth="4" />
            <line x1="110" y1="140" x2="230" y2="140" stroke="#27272a" strokeWidth="4" />
            <line x1="120" y1="140" x2="220" y2="210" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="220" y1="140" x2="120" y2="210" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="120" y1="210" x2="220" y2="280" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="220" y1="210" x2="120" y2="280" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="120" y1="280" x2="220" y2="350" stroke="#a1a1aa" strokeWidth="1.5" />
            <line x1="220" y1="280" x2="120" y2="350" stroke="#a1a1aa" strokeWidth="1.5" />
          </g>

          {/* Tower Crane Structure (Right Side) */}
          <g id="tower-crane">
            <rect x="630" y="50" width="24" height="300" fill="url(#girder-pattern)" stroke="#3f3f46" strokeWidth="2" />
            <line x1="630" y1="50" x2="630" y2="350" stroke="#f59e0b" strokeWidth="3" />
            <line x1="654" y1="50" x2="654" y2="350" stroke="#f59e0b" strokeWidth="3" />
            <rect x="360" y="44" width="380" height="12" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
            <rect x="710" y="38" width="35" height="24" fill="#27272a" rx="1" />
            <line x1="642" y1="15" x2="380" y2="44" stroke="#71717a" strokeWidth="1.5" />
            <line x1="642" y1="15" x2="642" y2="44" stroke="#d97706" strokeWidth="3" />
            <line x1="642" y1="15" x2="730" y2="44" stroke="#71717a" strokeWidth="1.5" />
            <rect x="622" y="60" width="18" height="22" fill="#18181b" rx="2" />
            <rect x="624" y="63" width="14" height="10" fill="#38bdf8" opacity="0.8" />

            {/* Sliding Crane Trolley & Suspended Swaying "ARM." Beam */}
            <g style={{ animation: `anim-trolley-move ${trolleySpeed} ease-in-out infinite` }}>
              <rect x="420" y="56" width="22" height="8" fill="#18181b" rx="1" />
              <line x1="431" y1="64" x2="431" y2="135" stroke="#52525b" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 431 135 L 431 143 C 431 148 424 148 424 144" fill="none" stroke="#27272a" strokeWidth="2" />

              {/* Swaying "ARM." Steel Beam */}
              <g 
                style={{ 
                  transformOrigin: '431px 143px',
                  animation: `anim-beam-sway ${beamSwaySpeed} ease-in-out infinite` 
                }}
              >
                <line x1="431" y1="143" x2="380" y2="162" stroke="#71717a" strokeWidth="1" />
                <line x1="431" y1="143" x2="480" y2="162" stroke="#71717a" strokeWidth="1" />
                <rect x="365" y="162" width="132" height="34" fill="#18181b" stroke="#f59e0b" strokeWidth="2" rx="3" />
                <text x="431" y="186" fill="#ffffff" fontFamily="Space Grotesk, sans-serif" fontWeight="bold" fontSize="17" textAnchor="middle" letterSpacing="3">
                  A R M .
                </text>
                <circle cx="373" cy="169" r="1.5" fill="#a1a1aa" />
                <circle cx="373" cy="189" r="1.5" fill="#a1a1aa" />
                <circle cx="489" cy="169" r="1.5" fill="#a1a1aa" />
                <circle cx="489" cy="189" r="1.5" fill="#a1a1aa" />
              </g>
            </g>
          </g>

          {/* ============================================================ */}
          {/* WORKER 1: Maya - TIG Welder with Moving Arm & Sparks (Left)   */}
          {/* ============================================================ */}
          <g 
            id="worker-welder"
            className="cursor-pointer group"
            onClick={() => handleWorkerClick('welder')}
            transform="translate(145, 168)"
          >
            <circle cx="20" cy="20" r="28" fill="transparent" />

            {/* Welder Body & Boots */}
            <rect x="12" y="26" width="6" height="16" fill="#1e293b" rx="2" />
            <rect x="22" y="26" width="6" height="16" fill="#1e293b" rx="2" />
            <rect x="10" y="38" width="9" height="5" fill="#0f172a" rx="1" />
            <rect x="22" y="38" width="9" height="5" fill="#0f172a" rx="1" />
            <rect x="10" y="12" width="20" height="16" fill="#0284c7" rx="3" />
            <rect x="12" y="12" width="16" height="16" fill="#f59e0b" rx="2" />
            <line x1="15" y1="12" x2="15" y2="28" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="25" y1="12" x2="25" y2="28" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="20" cy="5" r="7" fill="#fcd34d" />
            <rect x="15" y="1" width="11" height="11" fill="#18181b" rx="2" />
            <rect x="17" y="4" width="7" height="3" fill="#38bdf8" />

            {/* Moving Welding Arm & Torch */}
            <g style={{ transformOrigin: '24px 18px', animation: `anim-weld-arm ${weldSpeed} ease-in-out infinite` }}>
              <line x1="24" y1="18" x2="36" y2="24" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="36" y1="24" x2="42" y2="28" stroke="#475569" strokeWidth="2.5" />
              
              {/* Dynamic Spark Bursts */}
              <circle cx="43" cy="29" r="16" fill="url(#weldingGlow)" opacity={sparkTick % 2 === 0 ? "0.9" : "0.3"} />
              <circle cx="43" cy="29" r={sparkTick % 2 === 0 ? "4" : "2"} fill="#67e8f9" />
              
              {/* Scattered Spark Particles */}
              <circle cx={43 + (sparkTick % 5) * 2} cy={29 - (sparkTick % 4) * 3} r="1.5" fill="#fef08a" />
              <circle cx={43 - (sparkTick % 4) * 2} cy={29 + (sparkTick % 3) * 2} r="1.2" fill="#38bdf8" />
              <circle cx={43 + (sparkTick % 6) * 3} cy={29 + (sparkTick % 5) * 1.5} r="1.4" fill="#fbbf24" />
            </g>
          </g>

          {/* ============================================================ */}
          {/* WORKER 2: Sam - Lead Architect Pacing with Blueprints         */}
          {/* ============================================================ */}
          <g 
            id="worker-architect"
            className="cursor-pointer group"
            onClick={() => handleWorkerClick('engineer')}
            style={{ animation: `anim-architect-pace ${architectSpeed} ease-in-out infinite` }}
          >
            <circle cx="20" cy="20" r="28" fill="transparent" />
            <rect x="12" y="26" width="6" height="16" fill="#334155" rx="2" />
            <rect x="22" y="26" width="6" height="16" fill="#334155" rx="2" />
            <rect x="10" y="38" width="9" height="5" fill="#0f172a" rx="1" />
            <rect x="22" y="38" width="9" height="5" fill="#0f172a" rx="1" />
            <rect x="10" y="12" width="20" height="16" fill="#047857" rx="3" />
            <rect x="12" y="12" width="16" height="16" fill="#f59e0b" rx="2" />
            <line x1="16" y1="12" x2="16" y2="28" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="24" y1="12" x2="24" y2="28" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="20" cy="5" r="7" fill="#fed7aa" />
            <ellipse cx="20" cy="2" rx="8" ry="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
            <rect x="14" y="0" width="12" height="6" fill="#ffffff" rx="2" />
            
            {/* Blueprint in hand */}
            <rect x="24" y="14" width="18" height="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" rx="1" transform="rotate(-15 24 14)" />
            <line x1="27" y1="16" x2="39" y2="13" stroke="#e0f2fe" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="28" y1="20" x2="40" y2="17" stroke="#e0f2fe" strokeWidth="1" strokeDasharray="2 1" />
          </g>

          {/* ============================================================ */}
          {/* WORKER 3: Dex - Mechanic Actively Torquing Rotating Gear      */}
          {/* ============================================================ */}
          <g 
            id="worker-mechanic"
            className="cursor-pointer group"
            onClick={() => handleWorkerClick('mechanic')}
            transform="translate(530, 308)"
          >
            {/* Legs & Torso */}
            <rect x="10" y="26" width="6" height="16" fill="#1e293b" rx="2" />
            <rect x="20" y="26" width="6" height="16" fill="#1e293b" rx="2" />
            <rect x="8" y="38" width="9" height="5" fill="#0f172a" rx="1" />
            <rect x="20" y="38" width="9" height="5" fill="#0f172a" rx="1" />
            <rect x="8" y="12" width="20" height="16" fill="#b91c1c" rx="3" />
            <rect x="10" y="12" width="16" height="16" fill="#f59e0b" rx="2" />
            <line x1="14" y1="12" x2="14" y2="28" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="22" y1="12" x2="22" y2="28" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="18" cy="5" r="7" fill="#fed7aa" />
            <ellipse cx="18" cy="2" rx="8" ry="4" fill="#eab308" />
            <rect x="12" y="0" width="12" height="6" fill="#eab308" rx="2" />

            {/* Actively Hammering/Wrenching Arm */}
            <g style={{ transformOrigin: '22px 16px', animation: `anim-wrench-arm ${wrenchSpeed} cubic-bezier(0.4, 0, 0.2, 1) infinite` }}>
              <line x1="22" y1="16" x2="34" y2="10" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
              <path d="M 33 9 L 43 4 L 45 7 L 36 12 Z" fill="#94a3b8" />
              <circle cx="44" cy="5" r="2.5" fill="#64748b" />
            </g>
            
            {/* Actively Rotating Robotics Gear */}
            <g transform="translate(42, 10)">
              <rect x="0" y="24" width="28" height="6" fill="#78350f" rx="1" />
              <g style={{ transformOrigin: '14px 12px', animation: `anim-gear-spin ${gearSpeed} linear infinite` }}>
                <circle cx="14" cy="12" r="13" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                <circle cx="14" cy="12" r="4" fill="#ffffff" stroke="#475569" strokeWidth="2" />
                <rect x="12" y="-3" width="4" height="4" fill="#475569" />
                <rect x="12" y="23" width="4" height="4" fill="#475569" />
                <rect x="-3" y="10" width="4" height="4" fill="#475569" />
                <rect x="23" y="10" width="4" height="4" fill="#475569" />
              </g>
            </g>
          </g>

          {/* ============================================================ */}
          {/* WORKER 4: Leo - Crane Operator Signaling on Top Platform     */}
          {/* ============================================================ */}
          <g 
            id="worker-crane-leo"
            className="cursor-pointer group"
            onClick={() => handleWorkerClick('crane')}
            transform="translate(595, 96)"
          >
            <rect x="-10" y="40" width="45" height="4" fill="#18181b" />
            <line x1="-10" y1="28" x2="35" y2="28" stroke="#eab308" strokeWidth="1.5" />
            <line x1="-10" y1="40" x2="-10" y2="28" stroke="#eab308" strokeWidth="1.5" />
            <line x1="35" y1="40" x2="35" y2="28" stroke="#eab308" strokeWidth="1.5" />
            <rect x="10" y="24" width="5" height="16" fill="#1e293b" rx="2" />
            <rect x="18" y="24" width="5" height="16" fill="#1e293b" rx="2" />
            <rect x="8" y="12" width="18" height="14" fill="#f59e0b" rx="2" />
            <circle cx="17" cy="5" r="6" fill="#fed7aa" />
            <ellipse cx="17" cy="2" rx="7" ry="3.5" fill="#f97316" />
            <rect x="12" y="0" width="10" height="5" fill="#f97316" rx="2" />
            
            {/* Radio in Hand that Raises & Lowers to mouth */}
            <g style={{ transformOrigin: '20px 16px', animation: `anim-radio-arm ${wrenchSpeed} ease-in-out infinite` }}>
              <line x1="20" y1="16" x2="26" y2="10" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="25" y="6" width="3" height="7" fill="#18181b" rx="1" />
              <line x1="26.5" y1="6" x2="26.5" y2="3" stroke="#18181b" strokeWidth="1" />
            </g>
          </g>

          {/* ============================================================ */}
          {/* ROBOT HELPER: Rover-01 Moving Back and Forth with Supplies   */}
          {/* ============================================================ */}
          <g 
            id="worker-rover-bot"
            className="cursor-pointer group"
            onClick={() => handleWorkerClick('bot')}
            style={{ animation: `anim-rover-move ${roverSpeed} ease-in-out infinite` }}
          >
            <rect x="0" y="20" width="34" height="8" fill="#18181b" rx="3" />
            <circle cx="6" cy="24" r="2.5" fill="#71717a" />
            <circle cx="17" cy="24" r="2.5" fill="#71717a" />
            <circle cx="28" cy="24" r="2.5" fill="#71717a" />
            <rect x="4" y="10" width="26" height="12" fill="#e2e8f0" stroke="#475569" strokeWidth="1" rx="2" />
            <text x="17" y="19" fill="#0f172a" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              ARM-01
            </text>
            <circle cx="17" cy="7" r="4" fill="#0284c7" />
            <circle cx="17" cy="2" r="2" fill="#f59e0b" className={isTurbo ? "animate-ping" : ""} />
            <circle cx="17" cy="2" r="2" fill="#fbbf24" />
            <rect x="24" y="6" width="10" height="8" fill="#94a3b8" rx="1" />
            <circle cx="27" cy="9" r="1.5" fill="#f59e0b" />
            <circle cx="31" cy="8" r="1.5" fill="#f59e0b" />
          </g>
        </svg>

        {/* Footer info badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[11px] text-neutral-500 bg-white/95 backdrop-blur-xs px-2.5 py-1 border border-neutral-200 rounded-sm">
          <HardHat className="w-3.5 h-3.5 text-amber-500" />
          <span>Active Crew: 4 Engineers · 1 Autonomous Rover</span>
        </div>

        {/* Turbo Toggle Control */}
        <div className="absolute top-3 right-4 flex items-center gap-2">
          <button
            onClick={() => setIsTurbo(!isTurbo)}
            className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isTurbo 
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30 ring-2 ring-amber-400 animate-pulse' 
                : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isTurbo ? 'fill-white text-white' : 'text-amber-500'}`} />
            <span>{isTurbo ? 'TURBO SPEED (ACTIVE)' : 'TURBO BOOST'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
