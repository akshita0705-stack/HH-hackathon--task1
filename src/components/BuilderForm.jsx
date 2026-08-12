import React from 'react';

export default function BuilderForm({ name, stack, descriptor, onChange }) {
  return (
    <div className="space-y-2 text-left">
      {/* Decorative Step Label */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1">
        <label className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-[#A7FF4F] uppercase flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#A7FF4F] text-black text-[9px] flex items-center justify-center font-extrabold shadow-sm">2</span>
          <span>BUILDER DETAILS</span>
        </label>
        <span className="font-mono text-[9px] text-[#A7FF4F]/60">INFO INSERT</span>
      </div>

      {/* Name Input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] font-bold tracking-wider text-[#A7FF4F]/90 uppercase flex items-center gap-1">
            <span>👤</span>
            <span>BUILDER NAME</span>
          </label>
          <span className="font-mono text-[9px] text-zinc-400 font-medium">
            {name.length}/40
          </span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          // placeholder="e.g."
          className="input-jungle font-heading font-semibold text-xs sm:text-sm py-2 px-3 border-emerald-500/30 focus:border-[#A7FF4F]"
          maxLength={40}
        />
      </div>

      {/* Stack / Role Input */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] font-bold tracking-wider text-[#A7FF4F]/90 uppercase flex items-center gap-1">
            <span>💻</span>
            <span>STACK / ROLE</span>
          </label>
          <span className="font-mono text-[9px] text-zinc-400 font-medium">
            {stack.length}/40
          </span>
        </div>
        <input
          type="text"
          value={stack}
          onChange={(e) => onChange('stack', e.target.value)}
          // placeholder="e.g. Full Stack Developer / AI Builder"
          className="input-jungle font-heading text-xs sm:text-sm py-2 px-3 border-emerald-500/30 focus:border-[#A7FF4F]"
          maxLength={40}
        />
      </div>

      {/* Descriptor / Short Bio */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="font-mono text-[10px] font-bold tracking-wider text-[#A7FF4F]/90 uppercase flex items-center gap-1">
            <span>📝</span>
            <span>SHORT BIO</span>
            <span className="text-zinc-500 font-normal lowercase tracking-normal text-[9px]">(optional)</span>
          </label>
          <span className="font-mono text-[9px] text-zinc-400 font-medium">
            {descriptor.length}/60
          </span>
        </div>
        <input
          type="text"
          value={descriptor}
          onChange={(e) => onChange('descriptor', e.target.value)}
          // placeholder="e.g. Shipping AI apps @ HH Goa 2026"
          className="input-jungle text-xs py-2 px-3 border-emerald-500/30 focus:border-[#A7FF4F]"
          maxLength={60}
        />
      </div>
    </div>
  );
}


