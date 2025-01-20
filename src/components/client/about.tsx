'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Brain, Rocket, Code2, Globe2 } from 'lucide-react';

const stats = [
  { label: 'Processing Speed', value: '0.1ms', icon: Zap },
  { label: 'Neural Networks', value: '150+', icon: Brain },
  { label: 'Global Users', value: '1M+', icon: Globe2 },
  { label: 'Code Generated', value: '1B+', icon: Code2 }
];

const milestones = [
  {
    year: '2023',
    title: 'Foundation',
    description: 'Draxen AI was born from a vision to revolutionize real-time processing'
  },
  {
    year: '2024',
    title: 'Innovation',
    description: 'Breakthrough in neural network optimization reduces latency by 90%'
  },
  {
    year: '2025',
    title: 'Expansion',
    description: 'Global deployment with edge computing capabilities in 100+ countries'
  }
];

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.5, 0.1],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function CircuitLines() {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 100} ${Math.random() * 100}, ${Math.random() * 100} ${Math.random() * 100}`}
            stroke="rgba(147, 51, 234, 0.2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 p-2.5">
          <Icon className="h-full w-full text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Timeline() {
  return (
    <div className="relative space-y-8">
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.year}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative pl-8"
        >
          <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <div className="h-2 w-2 rounded-full bg-white" />
          </div>
          {index !== milestones.length - 1 && (
            <div className="absolute left-3 top-6 h-full w-[2px] bg-gradient-to-b from-purple-500/50 to-blue-500/50" />
          )}
          <div className="rounded-xl bg-white/5 p-4 backdrop-blur-xl">
            <div className="mb-1 text-sm font-medium text-purple-400">
              {milestone.year}
            </div>
            <div className="mb-2 text-lg font-semibold text-white">
              {milestone.title}
            </div>
            <div className="text-sm text-gray-400">{milestone.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FloatingImages() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-64 w-64 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black py-20"
    >
      <ParticleField />
      <CircuitLines />
      <FloatingImages />
      
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
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-gray-400"
          >
            From inception to innovation, we've been pushing the boundaries of
            what's possible with AI technology.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 backdrop-blur-xl"
            >
              <h3 className="mb-4 text-xl font-semibold text-white">
                Our Mission
              </h3>
              <p className="text-gray-400">
                To democratize AI technology and make real-time processing
                accessible to developers worldwide. We believe in pushing the
                boundaries of what's possible while maintaining the highest
                standards of reliability and security.
              </p>
            </motion.div>
          </div>

          <Timeline />
        </div>
      </motion.div>
    </section>
  );
}
