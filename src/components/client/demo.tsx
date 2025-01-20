'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Wand2, Zap, ArrowRight, Play, Pause } from 'lucide-react';

const demoContent = {
  input: `// Example: Real-time data processing
const stream = new DraxenStream({
  source: "sensor-data",
  batchSize: 1000,
  window: "1s"
});

stream.process(async (data) => {
  const result = await model.predict(data);
  return result;
});`,
  output: [
    { type: 'info', content: 'Initializing Draxen Engine...' },
    { type: 'success', content: 'Connected to data stream' },
    { type: 'data', content: 'Processing batch: 1000 records' },
    { type: 'metric', content: 'Latency: 0.3ms' },
    { type: 'success', content: 'Prediction complete' },
    { type: 'data', content: 'Accuracy: 99.8%' }
  ]
};

const particleCount = 50;
const createParticle = () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  velocity: Math.random() * 0.5 + 0.2,
  opacity: Math.random() * 0.5 + 0.3
});

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => {
        const particle = createParticle();
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity
            }}
            animate={{
              y: [0, -1000],
              opacity: [particle.opacity, 0]
            }}
            transition={{
              duration: particle.velocity * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          />
        );
      })}
    </div>
  );
}

function NeuralNetwork() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Neural network nodes */}
        {[...Array(20)].map((_, i) => {
          const x = Math.random() * 80 + 10;
          const y = Math.random() * 80 + 10;
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="1"
              fill="rgba(147, 51, 234, 0.5)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function DataFlowEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 100} ${Math.random() * 100}, ${Math.random() * 100} ${Math.random() * 100}`}
            stroke="rgba(147, 51, 234, 0.2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function GlowingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        return (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-purple-500/20 rounded-full filter blur-xl"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        );
      })}
    </div>
  );
}

function HexGrid() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000000_70%,transparent_100%)]" />
  );
}

function CodeWindow({ content }: { content: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">demo.ts</span>
        </div>
      </div>
      <div className="p-4">
        <pre className="text-sm text-gray-300">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
}

function EnhancedCodeWindow({ content }: { content: string }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const lines = content.split('\n');

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, lines.length]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-400 transition-colors hover:bg-white/10"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </button>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">demo.ts</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <pre className="text-sm">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={`transition-colors ${
                  i === currentLine ? 'bg-white/10 text-white' : 'text-gray-400'
                }`}
              >
                {line}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function OutputWindow({ outputs }: { outputs: typeof demoContent.output }) {
  const [currentOutput, setCurrentOutput] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOutput((prev) => (prev + 1) % outputs.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [outputs.length]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Terminal className="h-4 w-4" />;
      case 'success':
        return <Sparkles className="h-4 w-4" />;
      case 'data':
        return <Zap className="h-4 w-4" />;
      case 'metric':
        return <Wand2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">output</span>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOutput}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2 text-sm"
          >
            <span className="text-gray-400">
              {getIcon(outputs[currentOutput].type)}
            </span>
            <span className="text-gray-300">{outputs[currentOutput].content}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="demo"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black py-20"
    >
      <FloatingParticles />
      <NeuralNetwork />
      <DataFlowEffect />
      <GlowingOrbs />
      <HexGrid />
      
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
            See It In Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-gray-400"
          >
            Experience the power and simplicity of our platform with this live demo.
            Watch as data flows through our system in real-time.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <EnhancedCodeWindow content={demoContent.input} />
          <OutputWindow outputs={demoContent.output} />
        </div>
      </motion.div>
    </section>
  );
}
