'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, MessageSquare, Code, Image } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: string;
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

  const handleMouseEnter = () => {
    setIsHovered(true);
    setSelectedFeature(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSelectedFeature(null);
    setMouseX(0.5);
    setMouseY(0.5);
  };

  const getIcon = () => {
    switch (icon) {
      case 'brain':
        return <Brain className="h-6 w-6 text-purple-400" />;
      case 'sparkles':
        return <Sparkles className="h-6 w-6 text-blue-400" />;
      case 'zap':
        return <Zap className="h-6 w-6 text-yellow-400" />;
    }
  };

  const getFeatureIcon = (icon: string) => {
    switch (icon) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'code':
        return <Code className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative perspective-1000 ${isFlipped ? '' : 'float'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': mouseX,
        '--mouse-y': mouseY,
        '--glow-rgb': icon === 'brain' ? '139, 92, 246' : 
                     icon === 'sparkles' ? '59, 130, 246' : 
                     '234, 179, 8'
      } as any}
    >
      <motion.div
        className={`w-full aspect-[4/5] rounded-2xl overflow-hidden glow neural-bg ${
          isFlipped ? 'pointer-events-none' : ''
        }`}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          transition: { duration: 0.6, type: 'spring', stiffness: 100 }
        }}
      >
        {/* Front of card */}
        <div className="relative h-full p-6 bg-neutral-900/50 backdrop-blur-xl">
          <div className="flex flex-col h-full">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2">
                  {getIcon()}
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <button
                onClick={() => setIsFlipped(true)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <motion.div
                  animate={{ rotate: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ⓘ
                </motion.div>
              </button>
            </div>

            {/* Card Content */}
            <p className="text-neutral-400 mb-6 flex-grow">{description}</p>

            {/* Feature List */}
            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedFeature === i
                      ? 'bg-purple-500/20 ring-1 ring-purple-500/30'
                      : 'bg-black/20 hover:bg-purple-500/10'
                  }`}
                  animate={{
                    scale: selectedFeature === i ? 1.02 : 1,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-md p-1 ${
                      selectedFeature === i ? 'bg-purple-500/20 text-purple-400' : 'bg-black/20 text-white/50'
                    }`}>
                      {getFeatureIcon(feature.icon)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {feature.title}
                      </h4>
                      <AnimatePresence mode="wait">
                        {selectedFeature === i && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-neutral-400 mt-1"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 h-full p-6 bg-neutral-900/50 backdrop-blur-xl [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Technical Details</h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                ←
              </button>
            </div>

            <div className="flex-grow space-y-6">
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2">Architecture</h4>
                <div className="bg-black/20 rounded-lg p-3">
                  <code className="text-xs text-neutral-400">
                    {title === 'Natural Language Processing'
                      ? 'Transformer-based architecture with\n175B parameters and 96 attention layers'
                      : title === 'Computer Vision'
                      ? 'Vision Transformer (ViT) with\n32 multi-head attention blocks'
                      : 'Distributed processing pipeline with\n real-time optimization'}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2">Performance</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white mb-1">
                      {title === 'Natural Language Processing'
                        ? '99.8%'
                        : title === 'Computer Vision'
                        ? '98.5%'
                        : '0.1ms'}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {title === 'Natural Language Processing'
                        ? 'Accuracy'
                        : title === 'Computer Vision'
                        ? 'Precision'
                        : 'Latency'}
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white mb-1">
                      {title === 'Natural Language Processing'
                        ? '150k'
                        : title === 'Computer Vision'
                        ? '250k'
                        : '1M+'}
                    </div>
                    <div className="text-xs text-neutral-400">
                      Requests/sec
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2">Use Cases</h4>
                <ul className="space-y-2 text-sm text-neutral-400">
                  {title === 'Natural Language Processing'
                    ? ['Content Generation', 'Translation', 'Code Analysis', 'Sentiment Analysis'].map((use, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-purple-500" />
                          {use}
                        </li>
                      ))
                    : title === 'Computer Vision'
                    ? ['Object Detection', 'Image Generation', 'Scene Analysis', 'Visual Search'].map((use, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                          {use}
                        </li>
                      ))
                    : ['Stream Processing', 'Real-time Analytics', 'Event Processing', 'Time Series'].map((use, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-yellow-500" />
                          {use}
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Particle Effects */}
      <AnimatePresence>
        {isHovered && !isFlipped && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(var(--glow-rgb), ${Math.random() * 0.5 + 0.2})`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  borderRadius: '50%',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
