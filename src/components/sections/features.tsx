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
      'Concurrent execution'
    ]
  },
  {
    title: 'Real-time Analytics',
    description: 'Instant insights from streaming data with live visualization',
    icon: Code2,
    color: 'pink',
    details: [
      'Live dashboards',
      'Metric tracking',
      'Alert systems',
      'Performance monitoring'
    ]
  },
  {
    title: 'Secure Processing',
    description: 'Enterprise-grade security with end-to-end encryption',
    icon: Fingerprint,
    color: 'orange',
    details: [
      'Data encryption',
      'Access control',
      'Audit logging',
      'Compliance'
    ]
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const Icon = feature.icon;
  const colorVariants = {
    purple: 'from-purple-500/20 to-purple-500/0 hover:from-purple-500/30',
    blue: 'from-blue-500/20 to-blue-500/0 hover:from-blue-500/30',
    yellow: 'from-yellow-500/20 to-yellow-500/0 hover:from-yellow-500/30',
    green: 'from-green-500/20 to-green-500/0 hover:from-green-500/30',
    pink: 'from-pink-500/20 to-pink-500/0 hover:from-pink-500/30',
    orange: 'from-orange-500/20 to-orange-500/0 hover:from-orange-500/30'
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
          colorVariants[feature.color as keyof typeof colorVariants]
        } transition-all duration-300`}
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
          }}
        />

        <div className="relative p-6 h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-2 rounded-xl bg-${feature.color}-500/20`}>
              <Icon className={`w-6 h-6 text-${feature.color}-400`} />
            </div>
            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          </div>

          <p className="text-neutral-300 mb-6">{feature.description}</p>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {feature.details.map((detail, i) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-1 h-1 rounded-full bg-${feature.color}-500`} />
                    <span className="text-sm text-neutral-400">{detail}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Neural Network Background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
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

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    { stiffness: 400, damping: 90 }
  );

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-neutral-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full aspect-square bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full aspect-square bg-gradient-to-br from-yellow-500/10 via-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powerful Features</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
            Advanced Processing Capabilities
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Experience lightning-fast neural networks optimized for real-time applications,
            delivering instant responses with minimal latency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}
