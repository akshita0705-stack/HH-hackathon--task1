import React from 'react';

export default function BeachBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none overflow-hidden">
        <img
          src="/assets/sunrise.png"
          alt="Goa Beach Background"
          className="bg-drift w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#083e2e]/55 via-[#167A4A]/22 to-[#071A14]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#69d6b2]/6 via-transparent to-transparent mix-blend-overlay" />
      </div>

      <img
        src="/assets/goa-hindi.svg"
        alt="Watermark"
        className="absolute top-10 -right-8 sm:-right-10 w-56 h-56 sm:w-80 sm:h-80 opacity-15 pointer-events-none z-0 rotate-12 filter drop-shadow-[0_0_20px_rgba(255,0,128,0.3)]"
      />

      <img
        src="/assets/footer-trees.png"
        alt="Palm Trees Left"
        className="absolute bottom-0 -left-10 sm:-left-20 h-48 sm:h-80 opacity-20 pointer-events-none z-0 -rotate-12 object-contain block"
      />
      <img
        src="/assets/footer-trees.png"
        alt="Palm Trees Right"
        className="absolute bottom-0 -right-10 sm:-right-20 h-48 sm:h-80 opacity-20 pointer-events-none z-0 rotate-12 scale-x-[-1] object-contain block"
      />

      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />

      <svg className="absolute bottom-0 left-0 w-full h-24 sm:h-36 opacity-[0.08] pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 400 100">
        <path d="M0,50 Q100,20 200,50 T400,50 V100 H0 Z" fill="currentColor" className="text-[#32C766]" />
        <path d="M0,65 Q100,35 200,65 T400,65 V100 H0 Z" fill="currentColor" className="text-[#A7FF4F]" />
      </svg>
    </>
  );
}
