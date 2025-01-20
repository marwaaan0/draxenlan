'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0);
  const mouseY = useSpring(0);

  const spotlightSize = 400;

  const spotlightLeft = useTransform(mouseX, (x) => `${x - spotlightSize / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - spotlightSize / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [handleMouseMove, parentElement]);

  return (
    <div ref={containerRef} className={cn('pointer-events-none absolute inset-0', className)}>
      <motion.div
        className="absolute z-10 rounded-full pointer-events-none"
        style={{
          width: spotlightSize,
          height: spotlightSize,
          left: spotlightLeft,
          top: spotlightTop,
          background: `radial-gradient(circle at center, ${fill}, transparent)`,
          opacity: isHovered ? 0.15 : 0,
        }}
      />
    </div>
  );
}
