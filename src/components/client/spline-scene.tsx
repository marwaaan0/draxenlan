'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function SplineScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Spline scene={process.env.NEXT_PUBLIC_SPLINE_SCENE || 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'} />
      </Suspense>
    </div>
  );
}
