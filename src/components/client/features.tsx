'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Code2, Fingerprint, Workflow, Zap, Sparkles, Brain } from 'lucide-react';

const features = [
  {
    title: 'Stream Processing',
    description: 'Handle continuous data streams with microsecond latency',
    icon: Workflow,
    color: 'purple',
    details: [
      'Real-time data ingestion',
      'Sub-millisecond processing',
      'Scalable architecture',
      'Fault tolerance'
    ]
  },
  {
    title: 'Adaptive Scaling',
    description: 'Automatically scale resources based on processing demands',
    icon: Zap,
    color: 'blue',
    details: [
      'Dynamic resource allocation',
      'Load balancing',
      'Auto-scaling policies',
      'Cost optimization'
    ]
  },
  {
    title: 'Edge Computing',
    description: 'Process data locally on edge devices for instant results',
    icon: Brain,
    color: 'yellow',
    details: [
      'Distributed processing',
      'Low latency inference',
      'Offline capabilities',
      'Resource efficiency'
    ]
  },
  {
    title: 'Parallel Processing',
    description: 'Distribute workloads across multiple cores for maximum speed',
    icon: Sparkles,
    color: 'green',
    details: [
      'Multi-threading',
      'Workload distribution',
      'Pipeline optimization',
      'Core utilization'
    ]
  },
  {
    title: 'Security',
    description: 'Enterprise-grade security with end-to-end encryption',
    icon: Fingerprint,
    color: 'red',
    details: [
      'End-to-end encryption',
      'Access control',
      'Audit logging',
      'Compliance'
    ]
  },
  {
    title: 'API Integration',
    description: 'Seamlessly integrate with existing systems via RESTful APIs',
    icon: Code2,
    color: 'pink',
    details: [
      'RESTful endpoints',
      'WebSocket support',
      'SDK libraries',
      'Documentation'
    ]
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMouseX(x / rect.width);
    setMouseY(y / rect.height);
  };

  const colors = {
    purple: 'from-purple-500/10 to-purple-500/5 group-hover:from-purple-500/50 group-hover:to-purple-500/20',
    blue: 'from-blue-500/10 to-blue-500/5 group-hover:from-blue-500/50 group-hover:to-blue-500/20',
    yellow: 'from-yellow-500/10 to-yellow-500/5 group-hover:from-yellow-500/50 group-hover:to-yellow-500/20',
    green: 'from-green-500/10 to-green-500/5 group-hover:from-green-500/50 group-hover:to-green-500/20',
    red: 'from-red-500/10 to-red-500/5 group-hover:from-red-500/50 group-hover:to-red-500/20',
    pink: 'from-pink-500/10 to-pink-500/5 group-hover:from-pink-500/50 group-hover:to-pink-500/20',
  };

  const iconColors = {
    purple: 'text-purple-500 group-hover:text-purple-400',
    blue: 'text-blue-500 group-hover:text-blue-400',
    yellow: 'text-yellow-500 group-hover:text-yellow-400',
    green: 'text-green-500 group-hover:text-green-400',
    red: 'text-red-500 group-hover:text-red-400',
    pink: 'text-pink-500 group-hover:text-pink-400',
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseX(0.5);
        setMouseY(0.5);
      }}
      className="group relative"
      style={{
        perspective: '1000px',
        transform: isHovered
          ? `
              rotateX(${(mouseY - 0.5) * 20}deg)
              rotateY(${(mouseX - 0.5) * 20}deg)
            `
          : 'none',
        transition: 'transform 0.5s ease',
      }}
    >
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 transition-all duration-500 ${colors[feature.color as keyof typeof colors]}`}>
        <div className="relative z-10">
          <div className={`mb-4 inline-block rounded-xl bg-white/10 p-3 ${iconColors[feature.color as keyof typeof iconColors]}`}>
            <Icon size={24} />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
          <p className="mb-4 text-gray-400">{feature.description}</p>
          <AnimatePresence>
            {isHovered && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {feature.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-sm text-gray-400"
                  >
                    <span className="mr-2">•</span>
                    {detail}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,17,17,1),rgba(0,0,0,1))]" />
      
      <motion.div
        style={{ opacity, y }}
        className="container relative mx-auto px-4"
      >
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-gray-400"
          >
            Our platform is packed with cutting-edge features designed to deliver
            exceptional performance and reliability.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </motion.div>
    </section>
  );
}
