import React, { useRef, useState } from 'react';
import { isSupportedImage } from '../utils/imageProcessing';

export default function PhotoUploader({ onPhotoSelected, currentPhoto }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    if (!isSupportedImage(file)) {
      alert('Please upload a JPG, PNG, or HEIC image.');
      return;
    }
    // Try to preserve EXIF orientation by using blueimp-load-image if available.
    (async () => {
      try {
        // Import the browser build entry so Vite can resolve it during dev.
        const pkg = await import(/* @vite-ignore */ 'blueimp-load-image/js/load-image');
        const loadImage = pkg && (pkg.default || pkg.loadImage || pkg);
        if (typeof loadImage === 'function') {
          loadImage(file, (canvasOrImg, meta) => {
            try {
              if (canvasOrImg && canvasOrImg.toDataURL) {
                const dataUrl = canvasOrImg.toDataURL('image/png');
                onPhotoSelected(dataUrl);
                return;
              }
            } catch (e) {
              // fall back to object URL below
            }
            // fallback
            const url = URL.createObjectURL(file);
            onPhotoSelected(url);
          }, { canvas: true, orientation: true, maxWidth: 2500 });
          return;
        }
      } catch (err) {
        // library not installed or failed, fall back
      }

      const url = URL.createObjectURL(file);
      onPhotoSelected(url);
    })();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-1.5 text-left">
      {/* Decorative Step Label */}
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[#A7FF4F] uppercase flex items-center gap-2">
          <span className="w-4.5 h-4.5 rounded-full bg-[#A7FF4F] text-black text-[10px] flex items-center justify-center font-extrabold shadow-sm">1</span>
          <span>PROFILE PHOTO</span>
        </label>
        <span className="font-mono text-[10px] text-[#A7FF4F]/60">REQUIRED</span>
      </div>

      <div
        className={`
          relative rounded-xl p-3 transition-all duration-200 cursor-pointer glass-card
          active:scale-[0.98] border-2
          ${isDragging
            ? 'border-[#A7FF4F] bg-emerald-950/80 shadow-[0_0_20px_rgba(167,255,79,0.3)]'
            : currentPhoto
            ? 'border-emerald-500/50 bg-[#071A14]/80'
            : 'border-emerald-500/30 hover:border-[#A7FF4F]/60'
          }
        `}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
      >
        {currentPhoto ? (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#A7FF4F] bg-[#071A14] shrink-0 shadow-[0_0_10px_rgba(167,255,79,0.25)]">
              <img
                src={currentPhoto}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-[#32C766] border border-black" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A7FF4F] animate-pulse" />
                <span className="font-mono text-[10px] text-[#A7FF4F] font-bold tracking-wider">PHOTO LOADED</span>
              </div>
              <p className="font-sans text-xs font-semibold text-white truncate">Tap to replace image</p>
            </div>
            <button
              type="button"
              className="btn-glass text-xs py-1.5 px-3 rounded-lg font-bold shrink-0"
            >
              CHANGE
            </button>
          </div>
        ) : (
          <div className="text-center py-3 px-2 flex items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0E4630]/60 border border-[#A7FF4F]/30 flex items-center justify-center text-[#A7FF4F] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-heading font-bold text-xs sm:text-sm text-white">
                Tap or drag to upload photo
              </p>
              <p className="font-mono text-[10px] text-[#A7FF4F]/70">
                JPG, PNG or HEIC supported
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}



