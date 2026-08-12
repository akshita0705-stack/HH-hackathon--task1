import React, { useRef, useEffect } from 'react';
import templates from '../data/templates';

export default function TemplateSelector({ selectedId, onSelect }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    const selected = container?.querySelector(`[data-template="${selectedId}"]`);
    if (selected) {
      selected.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedId]);

  return (
    <div className="space-y-1 text-left">
      {/* Decorative Step Label */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1">
        <label className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#A7FF4F] uppercase flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#A7FF4F] text-black text-[9px] flex items-center justify-center font-extrabold shadow-sm">4</span>
          <span>CARD THEME</span>
        </label>
        <span className="font-mono text-[9px] text-[#A7FF4F]/70 animate-pulse">
          SWIPE ➔
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto template-scroll pb-1.5 -mx-1 px-1 snap-x select-none"
      >
        {templates.map((t) => {
          const isActive = t.id === selectedId;
          return (
            <button
              key={t.id}
              data-template={t.id}
              onClick={() => onSelect(t.id)}
              className={`
                shrink-0 p-2 text-left font-mono rounded-xl transition-all duration-200 glass-card snap-center
                active:scale-95 border-2 relative overflow-hidden
                ${isActive
                  ? 'border-[#A7FF4F] bg-emerald-950/90 scale-[1.02] shadow-[0_0_15px_rgba(167,255,79,0.3)]'
                  : 'border-emerald-500/30 hover:border-emerald-500/60 opacity-85 hover:opacity-100'
                }
              `}
              style={{ minWidth: '100px' }}
            >
              {/* Active Indicator Top Bar */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#32C766] via-[#A7FF4F] to-[#FF0080]" />
              )}

              {/* Swatch dots */}
              <div className="flex items-center gap-1 mb-1">
                <div className="w-3 h-3 rounded-full border border-black shadow-sm" style={{ backgroundColor: t.colors.bg }} />
                <div className="w-3 h-3 rounded-full border border-black shadow-sm" style={{ backgroundColor: t.colors.accent }} />
                {t.colors.pink && (
                  <div className="w-2 h-2 rounded-full border border-black shadow-sm ml-auto" style={{ backgroundColor: t.colors.pink }} />
                )}
              </div>

              {/* Template Number */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-[#A7FF4F] font-bold">
                  #{t.number}
                </span>
                {isActive && (
                  <span className="text-[7px] bg-[#A7FF4F] text-black font-extrabold px-1 rounded">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Short Name */}
              <span className="font-heading text-[11px] font-black text-white tracking-wide block uppercase mt-0.5 truncate">
                {t.shortName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


