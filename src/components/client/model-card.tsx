'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, MessageSquare, Code, Image, ArrowRight } from 'lucide-react';

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
  icon: keyof typeof iconComponents;
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

  const MainIcon = iconComponents[icon];
  
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
              <MainIcon className="h-full w-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>

          <p className="text-gray-400">{description}</p>

          {/* Feature preview */}
          <AnimatePresence mode="wait">
            {selectedFeature !== null && (
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-gray-800 p-2">
                    {features[selectedFeature].icon && (
                      <div className="h-4 w-4 text-gray-400">
                        {React.createElement(iconComponents[features[selectedFeature].icon], {
                          size: 16,
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      {features[selectedFeature].title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {features[selectedFeature].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsFlipped(true)}
            className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            View Features
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 flex flex-col gap-4 ${
            isFlipped ? 'visible' : 'invisible'
          }`}
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <button
            onClick={() => setIsFlipped(false)}
            className="mb-2 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            Back to Overview
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="space-y-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-lg bg-gray-800 p-2">
                    {feature.icon && (
                      <div className="h-4 w-4 text-gray-400">
                        {React.createElement(iconComponents[feature.icon], {
                          size: 16,
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
