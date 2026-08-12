import React from 'react';
import BuilderCard from './BuilderCard';

export default function CardPreview({ userData, templateId }) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[410px] lg:max-w-[430px]">
        <BuilderCard userData={userData} templateId={templateId} />
      </div>
    </div>
  );
}

