'use client';

import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Spline 
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          transform: 'scale(1.1)',
        }}
      />
    </div>
  );
}
