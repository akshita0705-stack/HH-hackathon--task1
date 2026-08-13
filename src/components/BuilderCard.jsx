import React, { useState } from 'react';
import { getTemplate } from '../data/templates';
 
/**
 * Single Main Builder ID Pass Component (BuilderCard.jsx)
 * Displays the retro-futuristic Goa Hacker House ID card as a single unified pass.
 */
export default function BuilderCard({ userData, templateId }) {
  const template = getTemplate(templateId);
 
  const name = (userData.name || 'RAVI KISHAN').toUpperCase();
  const stack = (userData.stack || 'FULL STACK DEVELOPER').toUpperCase();
  const title = (userData.builderTitle || 'THE SHIPPER').toUpperCase();
  const number = userData.builderNumber || '026';
 
  // 3D Card Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
 
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (centerY - y) / 18;
    const tiltY = (x - centerX) / 18;
    setTilt({ x: tiltX, y: tiltY });
  };
 
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
 
  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (centerY - y) / 14;
    const tiltY = (x - centerX) / 14;
    setTilt({ x: tiltX, y: tiltY });
  };
 
  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
  };
 
  return (
    <div className="perspective-container w-full flex justify-center">
      <div
        className="tilt-card relative card-4-5 w-full max-w-[350px] sm:max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-black select-none cursor-pointer transition-transform duration-150 ease-out flex flex-col justify-between"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 1. Full Goa Beach Sunrise Scene Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/sunrise.png"
            alt="Goa Beach Scene"
            className="w-full h-full object-cover"
            style={{ filter: template.colors.bgOverlay || 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#083e2e]/55 via-[#167A4A]/22 to-[#071A14]/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#69d6b2]/6 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
        </div>
 
        {/* 2. Palm Trees Tropical Visual Backdrop */}
        <img
          src="/assets/footer-trees.png"
          alt="Palm Trees Left"
          className="absolute bottom-6 -left-8 w-36 sm:w-44 opacity-35 pointer-events-none z-0 object-contain"
        />
        <img
          src="/assets/footer-trees.png"
          alt="Palm Trees Right"
          className="absolute bottom-6 -right-8 w-36 sm:w-44 opacity-35 pointer-events-none z-0 object-contain scale-x-[-1]"
        />
 
        {/* 3. Top Header Overlay */}
        <div className="relative z-20 pt-3 px-3.5 sm:px-4 flex items-center justify-between">
          {/* Top Left: Hacker House Logo + Devanagari Hindi Text Overlay */}
          <div className="flex items-center">
            <div className="relative">
              <img
                src="/assets/hacker-house.png"
                alt="HACKER HOUSE"
                className="h-7 sm:h-9 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              />
              <img
                src="/assets/goa-hindi.svg"
                alt="गोंवा"
                className="absolute -top-1 left-6 sm:left-7 h-5 sm:h-7 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
 
          {/* Top Right: GOA, INDIA ✦ */}
          <div className="font-mono text-[9px] sm:text-[11px] font-black tracking-widest text-[#FEE101] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex items-center gap-1">
            <span>GOA, INDIA</span>
            <span className="text-[#FEE101] text-xs">✦</span>
          </div>
        </div>
 
        {/* 5. Top SVG Decorative Border Strip Asset */}
        <div className="relative z-20 mt-2 border-y border-black overflow-hidden flex shrink-0">
          <img
            src="/assets/019-group-59467-54-3485-1.svg"
            alt="Top Border Asset"
            className="w-full h-4 sm:h-5 object-cover opacity-95"
          />
        </div>
 
        {/* 6. Main Center Pass Content (Side-by-side: Larger Photo Left, Details Table Right) */}
        <div className="relative z-20 flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3.5 flex items-center gap-3 sm:gap-4 my-auto w-full">
          
          {/* Left Column: Larger User Photo Frame */}
          <div className="relative w-[45%] sm:w-[47%] aspect-[0.78] rounded-xl overflow-hidden border-2 border-[#167A4A] bg-[#040F0B] shadow-[0_8px_20px_rgba(0,0,0,0.7)] shrink-0">
            {userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt={name}
                className="w-full h-full object-cover animate-photo-reveal"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#0B2A1F] text-[#A7FF4F] p-2 text-center">
                <svg className="w-9 h-9 mb-1 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-mono text-[8px] font-bold text-[#A7FF4F]/80">UPLOAD PHOTO</span>
              </div>
            )}
            <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-xl" />
          </div>
 
          {/* Right Column: Details Table & details.png background graphic */}
          <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1.5 text-left relative z-10">
            
            {/* Visible details.png graphic overlay behind details */}
            <img
              src="/assets/details.png"
              alt="Details Graphic"
              className="absolute -right-3 -top-2 w-32 sm:w-40 opacity-30 pointer-events-none object-contain z-0 mix-blend-screen"
            />
 
            {/* Table / Grid Structure for Name, Title, Role */}
            <div className="relative z-10 space-y-1.5 bg-[#040F0B]/85 backdrop-blur-sm p-2 sm:p-2.5 rounded-xl border border-[#167A4A]/60 shadow-lg">
              
              {/* NAME */}
              <div className="border-b border-[#167A4A]/40 pb-1">
                <span className="font-mono text-[7.5px] sm:text-[8.5px] font-extrabold text-[#A7FF4F]/90 block tracking-wider uppercase">
                  BUILDER NAME
                </span>
                <h2 className="font-heading font-black text-xs sm:text-sm text-white tracking-tight leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {name}
                </h2>
              </div>
 
              {/* BUILDER TITLE */}
              <div className="border-b border-[#167A4A]/40 pb-1">
                <span className="font-mono text-[7.5px] sm:text-[8.5px] font-extrabold text-[#A7FF4F]/90 block tracking-wider uppercase">
                  BUILDER TITLE
                </span>
                <span className="font-heading font-black text-[11px] sm:text-xs text-[#FEE101] tracking-wide block leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {title}
                </span>
              </div>
 
              {/* ROLE / STACK */}
              <div>
                <span className="font-mono text-[7.5px] sm:text-[8.5px] font-extrabold text-[#A7FF4F]/90 block tracking-wider uppercase">
                  STACK / ROLE
                </span>
                <span className="font-mono font-bold text-[9.5px] sm:text-[11px] text-[#A7FF4F] block truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {stack}
                </span>
              </div>
            </div>
 
            {/* Rubber Stamp: APPROVED */}
            <div className="relative z-10 pt-0.5 flex justify-start">
              <div className="approved-stamp border-[#32C766] text-[#A7FF4F] bg-[#0B2A1F]/95 shadow-[0_0_12px_rgba(50,199,102,0.4)]">
                <span className="text-[5px] tracking-widest block leading-none text-[#32C766]">HH GOA 2026</span>
                <span className="text-[8px] sm:text-[9px] font-extrabold my-0.5 block leading-none text-[#A7FF4F]">OFFICIAL APPROVED</span>
                <span className="text-[4.5px] tracking-widest block leading-none text-[#32C766]">★ PASS #{number} ★</span>
              </div>
            </div>
 
          </div>
 
        </div>
 
        {/* 7. Bottom Card Content */}
        <div className="relative z-20 pb-2 px-3.5 sm:px-4 flex items-end justify-between shrink-0">
          {/* Bottom Left: Directional Signpost Banners */}
          <div className="flex flex-col items-start gap-0.5 max-w-[110px] sm:max-w-[130px] signpost-banner">
            <div className="relative w-full space-y-0.5">
              <div className="bg-[#FEE101] text-black font-black font-mono text-[8px] sm:text-[9px] py-0.5 px-1.5 border-2 border-black rounded-sm transform -rotate-2 shadow-[2px_2px_0px_#000]">
                BUILD
              </div>
              <div className="bg-[#FF0080] text-white font-black font-mono text-[8px] sm:text-[9px] py-0.5 px-1.5 border-2 border-black rounded-sm transform rotate-1 ml-1.5 shadow-[2px_2px_0px_#000]">
                SHIP
              </div>
              <div className="bg-[#FEE101] text-black font-black font-mono text-[8px] sm:text-[9px] py-0.5 px-1.5 border-2 border-black rounded-sm transform -rotate-1 shadow-[2px_2px_0px_#000]">
                LAUNCH
              </div>
              <div className="bg-[#FF0080] text-white font-black font-mono text-[8px] sm:text-[9px] py-0.5 px-1.5 border-2 border-black rounded-sm transform rotate-2 ml-1.5 shadow-[2px_2px_0px_#000]">
                REPEAT
              </div>
            </div>
          </div>
 
          {/* Bottom Right: Laptop & Table Scene Graphic (agenda.png) */}
          <div className="w-20 sm:w-24 relative pointer-events-none">
            <img
              src="/assets/agenda.png"
              alt="Laptop Scene"
              className="w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
 
        {/* 8. Bottom SVG Pattern Border Strip Asset */}
        <div className="relative z-20 border-t border-black overflow-hidden flex shrink-0">
          <img
            src="/assets/019-group-59467-54-3485-1.svg"
            alt="Bottom Border Asset"
            className="w-full h-4 sm:h-5 object-cover opacity-95"
          />
        </div>
 
      </div>
    </div>
  );
}
 
 