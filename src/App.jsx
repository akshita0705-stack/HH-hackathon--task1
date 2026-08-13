import React, { useState, useCallback, useEffect } from 'react';
import Hero from './components/Hero';
import PhotoUploader from './components/PhotoUploader';
import BuilderForm from './components/BuilderForm';
import BuilderTitle from './components/BuilderTitle';
import TemplateSelector from './components/TemplateSelector';
import CardPreview from './components/CardPreview';
import ExportButton from './components/ExportButton';
import ShareButton from './components/ShareButton';
import BeachBackground from './components/BeachBackground';
import { generateBuilderTitle, generateBuilderNumber } from './utils/builderTitle';
 
export default function App() {
  const [screen, setScreen] = useState('landing');
 
  // User data
  const [photoUrl, setPhotoUrl] = useState(null);
  const [name, setName] = useState('');
  const [stack, setStack] = useState('');
  const [descriptor, setDescriptor] = useState('');
  const [builderTitle, setBuilderTitle] = useState('THE SHIPPER');
  const [titleVariant, setTitleVariant] = useState(0);
  const [builderNumber] = useState(() => generateBuilderNumber());
  const [templateId, setTemplateId] = useState('jungle-signal');
 
  // Title generation
  useEffect(() => {
    setBuilderTitle(generateBuilderTitle(stack, titleVariant));
  }, [stack, titleVariant]);
 
  // Handlers
  const handlePhotoUpload = useCallback((file) => {
    if (typeof file === 'string') {
      setPhotoUrl(file);
    } else {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
    setScreen('editor');
  }, []);
 
  const handleFormChange = useCallback((field, value) => {
    switch (field) {
      case 'name': setName(value); break;
      case 'stack': setStack(value); break;
      case 'descriptor': setDescriptor(value); break;
    }
  }, []);
 
  const handleRegenerateTitle = useCallback(() => {
    setTitleVariant(prev => prev + 1);
  }, []);
 
  const handleGenerate = useCallback(() => {
    // Show result screen immediately
    setScreen('result');
  }, []);
 
  const handleReset = useCallback(() => {
    setPhotoUrl(null);
    setName('');
    setStack('');
    setDescriptor('');
    setTitleVariant(0);
    setBuilderTitle('THE SHIPPER');
    setTemplateId('jungle-signal');
    setScreen('landing');
  }, []);
 
  const userData = {
    photoUrl,
    name,
    stack,
    descriptor,
    builderTitle,
    builderNumber,
  };
 
  // ── 1. LANDING SCREEN ──
  if (screen === 'landing') {
    return <Hero onUpload={handlePhotoUpload} />;
  }
 
  // ── 2. EDITOR SCREEN ──
  if (screen === 'editor') {
    return (
      <div className="relative min-h-screen lg:h-screen lg:max-h-screen bg-transparent flex flex-col justify-between subtle-grain select-none overflow-x-hidden lg:overflow-hidden">
        
        <BeachBackground />
        {/* Soft Radial Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-br from-[#167A4A]/30 via-[#32C766]/15 to-transparent rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
 
        {/* Devanagari Goa Watermark */}
        <img
          src="/assets/goa-hindi.svg"
          alt="Watermark"
          className="absolute top-10 -right-8 sm:-right-10 w-56 h-56 sm:w-80 sm:h-80 opacity-15 pointer-events-none z-0 rotate-12 filter drop-shadow-[0_0_20px_rgba(255,0,128,0.3)]"
        />
 
        {/* Left & Right Palm Trees Framing */}
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
 
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
 
        {/* Falling dev-gear & beach-item ambience removed */}
 
        {/* Fixed Top Header */}
        <div className="relative z-20 shrink-0">
          <header className="bg-[#040F0B]/90 backdrop-blur-md border-b-2 border-black px-3.5 sm:px-6 py-2.5 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleReset}
                  className="btn-glass px-2.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1 active:scale-95"
                  title="Back to home"
                >
                  <span>←</span>
                  <span className="hidden xs:inline">HOME</span>
                </button>
                <div className="relative bg-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-sm">
                  <img
                    src="/assets/hacker-house.png"
                    alt="Hacker House"
                    className="h-4 sm:h-5 object-contain"
                  />
                  <img
                    src="/assets/goa-hindi.svg"
                    alt="गोंवा"
                    className="absolute -top-1 left-6 sm:left-7 h-4 sm:h-5 object-contain"
                  />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#A7FF4F] tracking-wider font-extrabold uppercase inline-block">
                  BUILDER TERMINAL
                </span>
              </div>
 
              <div className="flex items-center gap-2">
                <span className="glass-badge px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono text-[#A7FF4F] hidden sm:inline-block">
                  GOA '26 IDENTITY
                </span>
              </div>
            </div>
          </header>
 
          {/* Decorative Border Strip */}
          <div className="bg-black border-b border-black overflow-hidden flex">
            <img
              src="/assets/019-group-59467-54-3485-1.svg"
              alt="Decorative Border"
              className="w-full h-3.5 object-cover opacity-90"
            />
          </div>
        </div>
 
        {/* Main Content Layout (Centered Equal-Sized 2-Column Pair) */}
        <main className="relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 py-2 sm:py-4 flex-1 w-full flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center min-h-0 my-auto">
          
          {/* Left Column: Form & Controls */}
          <div className="w-full lg:w-[450px] shrink-0 flex flex-col space-y-3 lg:h-full lg:overflow-y-auto lg:pr-1.5 scrollbar-none order-2 lg:order-1 justify-between">
 
            <PhotoUploader
              currentPhoto={photoUrl}
              onPhotoSelected={setPhotoUrl}
            />
 
            <BuilderForm
              name={name}
              stack={stack}
              descriptor={descriptor}
              onChange={handleFormChange}
            />
 
            <BuilderTitle
              title={builderTitle}
              onRegenerate={handleRegenerateTitle}
            />
 
            <TemplateSelector
              selectedId={templateId}
              onSelect={setTemplateId}
            />
 
            {/* Generate Action Button */}
            <div className="pt-1 shrink-0 pb-3 lg:pb-1">
              <button
                onClick={handleGenerate}
                className="btn-lime w-full py-3.5 text-base font-extrabold shadow-[0_8px_25px_rgba(167,255,79,0.35)] animate-lime-pulse disabled:opacity-50 disabled:pointer-events-none"
                disabled={!name.trim()}
              >
                GENERATE BUILDER ID ★
              </button>
            </div>
          </div>
 
          {/* Right Column: 3D ID Card Preview (Matching Equal Width & Centered Height) */}
          <div className="w-full lg:w-[450px] shrink-0 flex flex-col items-center justify-center min-h-0 py-2 lg:py-0 order-1 lg:order-2 lg:h-full">
            <div className="w-full flex flex-col items-center justify-center max-h-full">
              
              <div className="flex items-center gap-2 mb-2 justify-center shrink-0">
                <span className="glass-badge px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-[#A7FF4F] border-emerald-500/40 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#A7FF4F] animate-pulse" />
                  <span>3D LIVE PREVIEW (TOUCH / HOVER TO TILT)</span>
                </span>
              </div>
 
              {/* Scaled Card Container matching Left Form Width */}
              <div className="w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[400px] lg:max-w-[420px] shrink min-h-0">
                <CardPreview userData={userData} templateId={templateId} />
              </div>
 
                <p className="mt-2 font-mono text-[10px] sm:text-xs text-[#A7FF4F]/70 text-center uppercase tracking-wider font-semibold shrink-0">
                  ✦ GOA BEACH BUILDER PASS FORMAT B ✦
                </p>
            </div>
          </div>
 
        </main>
 
        {/* Footer */}
        <footer className="relative z-20 shrink-0 border-t-2 border-black bg-black py-2.5 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/assets/footer-trees.png"
              alt="Goa Trees"
              className="h-7 sm:h-10 object-contain"
            />
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#A7FF4F]">
              HACKER HOUSE GOA 2026
            </span>
          </div>
 
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs font-bold">
            <span className="neo-badge neo-badge-pink text-[9px] sm:text-[11px]">#FrameInGoa</span>
            <span className="neo-badge neo-badge-yellow text-[9px] sm:text-[11px]">GOA // 2026</span>
          </div>
        </footer>
      </div>
    );
  }
 
 
  // ── 3. RESULT SCREEN ──
  if (screen === 'result') {
    return (
      <>
      <div className="relative min-h-screen bg-transparent flex flex-col justify-between subtle-grain select-none overflow-auto">
        
        <BeachBackground />
        {/* Soft Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-br from-[#167A4A]/25 via-[#32C766]/15 to-transparent rounded-full blur-[90px] sm:blur-[100px] pointer-events-none" />
 
        {/* Devanagari Goa Watermark */}
        <img
          src="/assets/goa-hindi.svg"
          alt="Watermark"
          className="absolute top-10 -right-8 sm:-right-10 w-64 h-64 sm:w-80 sm:h-80 opacity-15 pointer-events-none z-0 rotate-12"
        />
 
        {/* Left & Right Palm Trees Framing */}
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
 
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
 
        {/* Falling dev-gear & beach-item ambience removed */}
 
        {/* Top Header */}
        <div className="relative z-20 shrink-0">
          <header className="bg-[#040F0B]/90 backdrop-blur-md border-b-2 border-black px-3 sm:px-6 py-2">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setScreen('editor')}
                  className="btn-glass px-2.5 py-1 text-xs font-mono font-bold"
                >
                  ← EDIT DETAILS
                </button>
                <div className="relative bg-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] rounded-sm">
                  <img
                    src="/assets/hacker-house.png"
                    alt="Hacker House"
                    className="h-4 sm:h-5 object-contain"
                  />
                  <img
                    src="/assets/goa-hindi.svg"
                    alt="गोंवा"
                    className="absolute -top-1 left-6 sm:left-7 h-4 sm:h-5 object-contain"
                  />
                </div>
              </div>
            </div>
          </header>
 
          <div className="bg-black border-b border-black overflow-hidden flex">
            <img
              src="/assets/019-group-59467-54-3485-1.svg"
              alt="Decorative Border"
              className="w-full h-3.5 object-cover opacity-90"
            />
          </div>
        </div>
 
        {/* Result Content (Static 100vh fit) */}
        <main className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 py-2 sm:py-4 flex-1 flex flex-col items-center justify-center text-center w-full min-h-0 overflow-auto">
 
          {/* Success Banner */}
          <div className="mb-2 shrink-0">
            <span className="glass-badge px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono text-[#A7FF4F] tracking-wider uppercase border-emerald-500/40 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A7FF4F] animate-ping" />
              <span>✦ BUILDER ID GENERATED SUCCESSFULLY ✦</span>
            </span>
          </div>
 
          {/* 3D Card Preview */}
          <div className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] md:max-w-[460px] my-1 shrink min-h-0">
            <CardPreview userData={userData} templateId={templateId} />
          </div>
 
          {/* Action Buttons */}
          <div className="w-full max-w-[320px] sm:max-w-[360px] space-y-2 mt-1 shrink-0">
            <ExportButton userData={userData} templateId={templateId} />
            <ShareButton />
 
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setScreen('editor')}
                className="btn-glass flex-1 py-2 text-xs font-bold"
              >
                ✏️ EDIT DETAILS
              </button>
              <button
                onClick={handleReset}
                className="btn-glass flex-1 py-2 text-xs font-bold"
              >
                ↻ CREATE NEW
              </button>
            </div>
          </div>
        </main>
 
        {/* Footer */}
        <footer className="relative z-20 shrink-0 border-t-2 border-black bg-black py-2 px-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/assets/footer-trees.png"
              alt="Goa Trees"
              className="h-6 sm:h-9 object-contain"
            />
            <span className="font-mono text-[9px] sm:text-xs font-bold text-[#A7FF4F]">
              HACKER HOUSE GOA 2026
            </span>
          </div>
 
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-xs font-bold">
            <span className="neo-badge neo-badge-pink text-[8px] sm:text-[10px]">#FrameInGoa</span>
            <span className="neo-badge neo-badge-yellow text-[8px] sm:text-[10px]">GOA // 2026</span>
          </div>
        </footer>
      </div>
 
      </>
    );
  }
 
 
  return null;
}
 
 