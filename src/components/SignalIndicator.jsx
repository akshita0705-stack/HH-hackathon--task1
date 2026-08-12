import React from 'react';

export default function SignalIndicator({ className = '', size = 'sm' }) {
  const dotSize = size === 'lg' ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5';
  const textSize = size === 'lg' ? 'text-xs' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${dotSize} rounded-full bg-lime-400 animate-signal-pulse inline-block`} />
      <span className={`font-mono ${textSize} tracking-wider opacity-50`}>
        SIGNAL::ONLINE
      </span>
    </div>
  );
}
