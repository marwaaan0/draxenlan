'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, Zap, Brain } from "lucide-react";

const SplineScene = dynamic(() => import('@/components/client/spline-scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
            delay: i * 0.5,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl" />
        </motion.div>
      ))}
    </div>
  );
}

function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold mb-6"
      >
        Experience{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
        <br />
        artificial intelligence
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg text-gray-400 mb-8 max-w-lg"
      >
        Unlock the potential of AI with our revolutionary platform. Built for visionaries, designed for the future.
      </motion.p>

      <Button
        variant="default"
        size="lg"
        className="relative overflow-hidden group"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-10 flex items-center gap-2"
        >
          Get Started
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        className="relative overflow-hidden group ml-4"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-10 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Watch Demo
        </motion.span>
      </Button>
    </motion.div>
  );
}

export function HeroContent() {
  return (
    <>
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
    </>
  );
}
