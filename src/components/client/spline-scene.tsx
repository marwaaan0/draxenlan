'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

const LoadingSpinner = () => (
  <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Suspense fallback={<LoadingSpinner />}>
        {isLoading && <LoadingSpinner />}
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
            <p className="text-white">Failed to load 3D scene. Please refresh the page.</p>
          </div>
        ) : (
          <div className={isLoading ? 'opacity-0' : 'opacity-100'}>
            <Spline 
              scene={process.env.NEXT_PUBLIC_SPLINE_SCENE || 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'} 
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}
