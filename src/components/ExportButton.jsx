import React, { useState } from 'react';
import { exportBuilderCard } from '../utils/exportCard';

export default function ExportButton({ userData, templateId }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await exportBuilderCard(userData, templateId);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`
        btn-lime w-full py-4 text-base font-bold flex items-center justify-center gap-3
        ${isExporting ? 'opacity-70 cursor-wait' : ''}
      `}
    >
      {isExporting ? (
        <>
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          GENERATING PNG...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          DOWNLOAD PNG CARD
        </>
      )}
    </button>
  );
}
