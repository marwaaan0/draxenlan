'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SplineScene from "@/components/ui/spline-scene";
import { Sparkles, ArrowRight, Zap, Brain } from "lucide-react";

function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.2)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
          </linearGradient>
        </defs>
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
            stroke="url(#circuit-gradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 blur-[60px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: [-20, -120],
            opacity: [0, 1, 0],
            scale: [1, Math.random() * 2 + 1, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function HeroText() {
  const words = ["innovative", "intelligent", "powerful", "limitless", "advanced"];
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-sm mb-8"
      >
        <Brain className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium bg-gradient-to-r from-purple-200 to-blue-200 text-transparent bg-clip-text">
          The Future of AI is Here
        </span>
      </motion.div>

      <motion.h1 
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
          Experience{' '}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
          artificial intelligence
        </span>
      </motion.h1>

      <motion.p
        className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Unleash the power of next-generation AI with our revolutionary platform.
        Built for visionaries, designed for the future.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button
          size="lg"
          className="group relative overflow-hidden bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white px-8 py-6 text-lg hover:scale-105 transition-transform duration-300"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            animate={{ scale: 1.05 }}
          />
          <motion.span 
            className="relative flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            Get Early Access
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.span>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="group relative overflow-hidden bg-transparent border-white/10 hover:border-white/20 text-white px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
        >
          <motion.span 
            className="relative flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <Sparkles className="w-5 h-5" />
            Watch Demo
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <CircuitLines />
      <GlowingOrbs />
      <FloatingParticles />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 pt-40 pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroText />
          
          <div className="relative z-10 order-first lg:order-last">
            <div className="relative">
              <SplineScene />
              
              {/* Glowing orb behind the 3D model */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="absolute inset-0 blur-[120px] bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
