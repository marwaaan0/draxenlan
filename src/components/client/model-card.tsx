'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, MessageSquare, Code, Image } from 'lucide-react';

const iconComponents = {
  brain: Brain,
  sparkles: Sparkles,
  zap: Zap,
  message: MessageSquare,
  code: Code,
  image: Image,
} as const;

interface Feature {
  title: string;
  description: string;
  icon: keyof typeof iconComponents;
}

interface ModelCardProps {
  title: string;
  description: string;
  icon: 'brain' | 'sparkles' | 'zap';
  features: Feature[];
  index: number;
}

export function ModelCard({ title, description, icon, features, index }: ModelCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through features when card is hovered
  useEffect(() => {
    if (isHovered && !isFlipped) {
      const interval = setInterval(() => {
        setSelectedFeature(prev => 
          prev === null || prev >= features.length - 1 ? 0 : prev + 1
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, isFlipped, features.length]);

  // Mouse tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMouseX(x / rect.width);
    setMouseY(y / rect.height);
  };

  const IconComponent = iconComponents[icon];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full max-w-md"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedFeature(null);
        setMouseX(0.5);
        setMouseY(0.5);
      }}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className={`relative w-full rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 shadow-xl backdrop-blur-sm transition-all duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${
            (mouseY - 0.5) * 20
          }deg) rotateY(${(mouseX - 0.5) * 20}deg)`,
        }}
      >
        {/* Front of card */}
        <div
          className={`relative ${
            isFlipped ? 'invisible' : 'visible'
          } flex flex-col gap-4`}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-2.5">
              {IconComponent && (
                <IconComponent className="h-full w-full text-white" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>

          <p className="text-sm text-gray-400">{description}</p>

          <div className="mt-4">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-gray-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      selectedFeature !== null
                        ? `${((selectedFeature + 1) / features.length) * 100}%`
                        : '0%',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {selectedFeature !== null
                  ? `${selectedFeature + 1}/${features.length}`
                  : `0/${features.length}`}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {selectedFeature !== null && (
                <motion.div
                  key={selectedFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[100px] rounded-xl bg-black/50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-lg bg-gray-800 p-2">
                      {features[selectedFeature].icon in iconComponents && (
                        <div className="h-4 w-4 text-gray-400">
                          {iconComponents[features[selectedFeature].icon]({
                            size: 16,
                          })}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        {features[selectedFeature].title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-400">
                        {features[selectedFeature].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsFlipped(true)}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 py-2.5 text-sm font-medium text-white transition-all hover:opacity-80"
          >
            View All Features
          </button>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 ${
            isFlipped ? 'visible' : 'invisible'
          } flex flex-col gap-4`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">All Features</h3>
            <button
              onClick={() => setIsFlipped(false)}
              className="rounded-lg bg-gray-800 p-2 text-gray-400 hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-xl bg-black/50 p-4 transition-colors hover:bg-black/70"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-gray-800 p-2">
                    {feature.icon in iconComponents && (
                      <div className="h-4 w-4 text-gray-400">
                        {iconComponents[feature.icon]({
                          size: 16,
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{feature.title}</h4>
                    <p className="mt-1 text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
