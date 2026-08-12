import React, { useState } from 'react';

export default function BuilderTitle({ title, onRegenerate }) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    onRegenerate();
    setTimeout(() => setIsSpinning(false), 400);
  };

  return (
    <div className="space-y-1 text-left">
      {/* Decorative Step Label */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1">
        <label className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#A7FF4F] uppercase flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#A7FF4F] text-black text-[9px] flex items-center justify-center font-extrabold shadow-sm">3</span>
          <span>BUILDER TITLE</span>
        </label>
        <span className="font-mono text-[9px] text-[#A7FF4F]/60">CLICK 🎲 TO CYCLE</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 glass-card px-3 py-2 font-mono text-xs text-[#A7FF4F] font-extrabold tracking-wide rounded-xl border-2 border-emerald-500/40 flex items-center justify-between shadow-[0_0_10px_rgba(167,255,79,0.15)] overflow-hidden">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-[#FEE101]">✦</span>
            <span className="truncate">"{title}"</span>
          </div>
          <span className="neo-badge neo-badge-yellow text-[8px] shrink-0 ml-1">CODENAME</span>
        </div>

        <button
          type="button"
          onClick={handleSpin}
          className="btn-glass p-2 shrink-0 rounded-xl active:scale-90 transition-transform hover:border-[#A7FF4F] bg-[#0E4630]/60"
          title="Cycle Title"
        >
          <svg
            className={`w-4 h-4 text-[#A7FF4F] ${isSpinning ? 'animate-spin-once' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
}


