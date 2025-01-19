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
          }}
        />
      ))}
    </div>
  );
}

function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg className="w-full h-full">
        <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M0 25h50 M25 0v50"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-white/20"
          />
          <circle cx="25" cy="25" r="3" fill="currentColor" className="text-white/20" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
      
      <div className="relative flex items-center gap-4 p-6 rounded-xl bg-neutral-900/50 backdrop-blur-xl border border-white/10">
        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
          <Icon className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-sm text-neutral-400">{stat.label}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Timeline() {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent" />
      
      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-12"
          >
            {/* Dot */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            </div>
            
            {/* Content */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
              
              <div className="relative p-6 rounded-xl bg-neutral-900/50 backdrop-blur-xl border border-white/10">
                <div className="text-sm text-purple-400 mb-2">{milestone.year}</div>
                <div className="text-xl font-bold text-white mb-2">{milestone.title}</div>
                <div className="text-neutral-400">{milestone.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FloatingImages() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {['/tech1.png', '/tech2.png', '/tech3.png'].map((src, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 150,
            height: 150,
            left: `${25 + i * 25}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, i % 2 ? 10 : -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i,
          }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10" />
        </motion.div>
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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-neutral-900">
      <ParticleField />
      <CircuitLines />
      <FloatingImages />

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
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Our Journey</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
            Pioneering the Future of AI
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            We&apos;re on a mission to revolutionize real-time processing with cutting-edge
            neural networks and innovative solutions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Our Vision
            </h3>
            <div className="space-y-4 text-neutral-300">
              <p>
                At Draxen, we envision a future where AI processing happens in real-time,
                enabling new possibilities across industries and applications.
              </p>
              <p>
                Our cutting-edge neural networks and innovative architecture push the
                boundaries of what&apos;s possible in AI technology.
              </p>
              <p>
                We&apos;re committed to making this technology accessible to developers
                worldwide, fostering a new era of intelligent applications.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Timeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
