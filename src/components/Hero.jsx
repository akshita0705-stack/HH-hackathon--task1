import React, { useRef } from 'react';
import CardPreview from './CardPreview';
import SparkleField from './SparkleField';
 
/**
 * Hero Landing Page (Hero.jsx)
 * Uses repeating diamond-pattern-strip asset under marquee ticker across all desktop & mobile screens.
 */
export default function Hero({ onUpload }) {
  const fileInputRef = useRef(null);
 
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };
 
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) onUpload(file);
  };
 
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
 
  // Demo user data for hero card preview
  const demoUserData = {
    name: 'PULKITA VERMA',
    stack: 'Full Stack Builder',
    descriptor: 'Building AI-powered products',
    builderTitle: 'THE SHIPPER',
    builderNumber: '026',
    photoUrl: null,
  };
 
  // SparkleField component provides falling sparkles on the hero only
 
  return (
    <div className="relative min-h-screen bg-transparent flex flex-col justify-between overflow-hidden subtle-grain select-none hero-beach-enhance hero-sand-texture">
      
      {/* ── RICH BACKGROUND SCENE DECORATIONS ── */}
      {/* 1. Goa Beach Sunrise Scene Backdrop — slow drifting pan/zoom for a "living" feel */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none overflow-hidden">
        <img
          src="/assets/sunrise.png"
          alt="Goa Beach Sunrise Background"
          className="bg-drift w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#083e2e]/55 via-[#167A4A]/22 to-[#071A14]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#69d6b2]/6 via-transparent to-transparent mix-blend-overlay" />
      </div>
 
      {/* Hero-only falling sparkles (front page) */}
      <SparkleField count={60} />
 
      {/* 2. Soft Emerald & Lime Glow Radials */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-[#167A4A]/25 via-[#32C766]/15 to-transparent rounded-full blur-[90px] sm:blur-[120px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-10 right-0 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-gradient-to-tl from-[#A7FF4F]/15 via-[#0E4630]/25 to-transparent rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
 
      {/* 3. Devanagari Goa Hindi Watermark Stamp */}
      <img
        src="/assets/goa-hindi.svg"
        alt="Goa Hindi Watermark"
        className="absolute top-10 -right-8 sm:-right-16 w-64 h-64 sm:w-96 sm:h-96 opacity-20 sm:opacity-15 pointer-events-none z-0 rotate-12 filter drop-shadow-[0_0_25px_rgba(255,0,128,0.4)]"
      />
 
      {/* 4. Left Palm Trees & Bougainvillea Flowers Framing */}
      <img
        src="/assets/footer-trees.png"
        alt="Palm Trees Left"
        className="absolute bottom-0 -left-10 sm:-left-20 h-64 sm:h-96 md:h-[480px] opacity-30 sm:opacity-25 pointer-events-none z-0 -rotate-12 object-contain block"
      />
 
      {/* 5. Right Palm Trees & Bougainvillea Flowers Framing */}
      <img
        src="/assets/footer-trees.png"
        alt="Palm Trees Right"
        className="absolute bottom-0 -right-10 sm:-right-20 h-64 sm:h-96 md:h-[480px] opacity-30 sm:opacity-25 pointer-events-none z-0 rotate-12 scale-x-[-1] object-contain block"
      />
 
      {/* 6. Technical Grid Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none" />
 
      {/* 7. Ocean Wave SVG Curves Layer */}
      <svg className="absolute bottom-0 left-0 w-full h-24 sm:h-36 opacity-[0.08] pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 400 100">
        <path d="M0,50 Q100,20 200,50 T400,50 V100 H0 Z" fill="currentColor" className="text-[#32C766]" />
        <path d="M0,65 Q100,35 200,65 T400,65 V100 H0 Z" fill="currentColor" className="text-[#A7FF4F]" />
      </svg>
 
      {/* ── HEADER BAR & MARQUEE ── */}
      <div className="relative z-20">
        {/* Top Ticker Marquee Banner */}
        <div className="bg-[#FEE101] text-black border-b-4 border-black py-1.5 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap font-mono text-xs font-black tracking-widest uppercase flex gap-8">
            <span>★ HH GOA 2026</span>
            <span>•</span>
            <span>BUILD YOUR IDENTITY CARD</span>
            <span>•</span>
            <span>NO LOGIN • NO SIGNUP</span>
            <span>•</span>
            <span>FORMAT B: BUILDER PASS</span>
            <span>•</span>
            <span>#FrameInGoa</span>
            <span>•</span>
            <span>★ HH GOA 2026</span>
            <span>•</span>
            <span>BUILD YOUR IDENTITY CARD</span>
            <span>•</span>
            <span>NO LOGIN • NO SIGNUP</span>
            <span>•</span>
            <span>FORMAT B: BUILDER PASS</span>
            <span>•</span>
            <span>#FrameInGoa</span>
          </div>
        </div>
 
        {/* Diamond Pattern Decorative Strip Asset (Repeating across Web & Mobile) */}
        <div className="bg-black border-b-2 border-black overflow-hidden flex">
          <div className="diamond-pattern-strip opacity-90" />
        </div>
 
        {/* Top Navigation Bar */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-3 items-center w-full">
          <div className="flex items-center gap-2 justify-self-start">
            <span className="glass-badge hidden sm:inline-flex px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono text-[#A7FF4F]">
              GOA '26
            </span>
          </div>
 
          <div className="flex items-center justify-center justify-self-center">
            <div className="relative bg-black px-4 py-2 sm:px-5 sm:py-2.5 border-2 border-black shadow-[3px_3px_0px_#000] rounded-sm">
              <img
                src="/assets/hacker-house.png"
                alt="HACKER HOUSE"
                className="h-8 sm:h-11 object-contain"
              />
              <img
                src="/assets/goa-hindi.svg"
                alt="गोंवा"
                className="absolute -top-1.5 left-12 sm:left-16 h-8 sm:h-10 object-contain"
              />
            </div>
          </div>
 
          <div className="flex items-center gap-2 sm:gap-3 justify-self-end">
            <span className="glass-badge px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-mono text-[#A7FF4F]">
              GOA, INDIA ✦
            </span>
          </div>
        </header>
      </div>
 
      {/* ── MAIN HERO SECTION ── */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col lg:flex-row items-center gap-8 lg:gap-14 justify-center w-full">
 
        {/* Left Side: Copy & Upload Action */}
        <div className="flex-1 text-center lg:text-left space-y-5 sm:space-y-6 max-w-xl">
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 glass-badge px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-[#A7FF4F] shadow-md border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-[#A7FF4F] animate-pulse" />
            <span>FORMAT B // BUILDER ID CARD GENERATOR</span>
          </div>
 
          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
            <span className="bg-[#FF0080] text-white px-3 sm:px-4 py-1 border-3 sm:border-4 border-black inline-block shadow-[4px_4px_0px_#000] rotate-[-1.5deg] mr-2 mb-1.5">
              BUILD
            </span>
            YOUR
            <br />
            <span className="bg-[#A7FF4F] text-black px-3 sm:px-4 py-1 border-3 sm:border-4 border-black inline-block shadow-[4px_4px_0px_#000] rotate-[1.5deg]">
              IDENTITY
            </span>
          </h1>
 
          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-lg text-zinc-300 leading-relaxed max-w-md mx-auto lg:mx-0">
            Create your official HH Goa 2026 Builder ID Card & Access Pass.
            <br />
            <span className="text-[#A7FF4F] font-mono text-xs font-bold">No login. No signup. Just build.</span>
          </p>
 
          {/* Upload Button CTA */}
          <div
            className="pt-1"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-lime text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 w-full sm:w-auto flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(167,255,79,0.3)]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>UPLOAD YOUR PHOTO</span>
            </button>
 
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
              onChange={handleFileChange}
              className="hidden"
            />
 
            <p className="mt-2.5 font-mono text-xs text-[#A7FF4F]/80 tracking-wider uppercase font-semibold">
              SUPPORTED FORMATS: JPG • PNG • HEIC
            </p>
          </div>
 
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1">
            <span className="glass-badge px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono text-zinc-200">
              ⚡ NO LOGIN
            </span>
            <span className="glass-badge px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono text-zinc-200">
              🚀 NO SIGNUP
            </span>
            <span className="glass-badge px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono text-zinc-200">
              🌴 BUILDER PASS
            </span>
            <span className="glass-badge px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono text-zinc-200">
              📥 INSTANT PNG EXPORT
            </span>
          </div>
        </div>
 
        {/* Right Side: The 3D Builder ID Card Visual Focus */}
        <div className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] lg:max-w-[400px] shrink-0">
          <div className="relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 glass-badge px-3 py-1 rounded-full text-[10px] font-mono text-[#A7FF4F] shadow-lg whitespace-nowrap">
              HOVER TO TILT 3D
            </div>
 
            <CardPreview userData={demoUserData} templateId="jungle-signal" />
          </div>
        </div>
 
      </main>
 
      {/* ── FOOTER BAR WITH PALM TREES ASSET ── */}
      <footer className="relative z-20 border-t-4 border-black bg-black py-3 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/assets/footer-trees.png"
            alt="Goa Trees"
            className="h-8 sm:h-12 object-contain"
          />
          <span className="font-mono text-[10px] sm:text-xs font-bold text-[#A7FF4F]">
            HACKER HOUSE GOA 2026
          </span>
        </div>
 
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold">
          <span className="neo-badge neo-badge-pink text-[9px] sm:text-xs">#FrameInGoa</span>
          <span className="neo-badge neo-badge-yellow text-[9px] sm:text-xs">GOA // 2026</span>
        </div>
      </footer>
 
    </div>
  );
}
 