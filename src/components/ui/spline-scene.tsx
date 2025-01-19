'use client';

import { Suspense } from 'react';

export default function SplineScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-lg">3D Model Loading...</div>
        </div>
      </Suspense>
    </div>
  );
}
