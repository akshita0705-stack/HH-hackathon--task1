import React from 'react';

export default function ShareButton() {
  const handleShare = () => {
    const text = encodeURIComponent(
      "Just generated my HH Goa 2026 Builder ID Pass 🌴\n\n#FrameInGoa #HackerHouse #Goa2026"
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className="btn-glass w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-3"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      SHARE TO X (#FrameInGoa)
    </button>
  );
}
