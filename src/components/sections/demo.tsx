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
              y: [-20, 20],
              x: [-20, 20],
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
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
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-gradient-to-r from-purple-500/20 to-blue-500/20"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

function DataFlowEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
          }}
          animate={{
            y: ['0%', '2000%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <div className="w-full h-full relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-sm" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-400/50 to-purple-500/50" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function GlowingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl" />
        </motion.div>
      ))}
    </div>
  );
}

function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="relative w-full h-full" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.1' fill='%23ffffff' stroke='%23ffffff' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

function CodeWindow({ content }: { content: string }) {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = content.split('\n');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine < lines.length && isTyping) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines.length, isTyping]);

  return (
    <div className="relative rounded-xl bg-neutral-900/50 backdrop-blur-xl p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
      </div>
      <div className="space-y-1">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={index <= currentLine ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            className="text-neutral-300"
          >
            {line || '\u00A0'}
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsTyping(!isTyping)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {isTyping ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setCurrentLine(0)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function EnhancedCodeWindow({ content }: { content: string }) {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = content.split('\n');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine < lines.length && isTyping) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines.length, isTyping]);

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
      
      <div className="relative rounded-xl bg-neutral-900/80 backdrop-blur-xl p-4 font-mono text-sm border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          
          {/* Line Numbers */}
          <div className="absolute left-16 top-14 bottom-4 w-8 border-r border-white/10 flex flex-col text-xs text-neutral-500">
            {lines.map((_, i) => (
              <div key={i} className="h-6 text-right pr-2">
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-1 pl-12">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={index <= currentLine ? { 
                opacity: 1, 
                x: 0,
                background: index === currentLine ? "rgba(255,255,255,0.05)" : "transparent"
              } : { opacity: 0, x: -20 }}
              className="px-2 py-0.5 rounded"
            >
              <span className="text-neutral-300">{line || '\u00A0'}</span>
              {index === currentLine && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-white/50 ml-1"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsTyping(!isTyping)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isTyping ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentLine(0)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function OutputWindow({ outputs }: { outputs: typeof demoContent.output }) {
  const [currentOutput, setCurrentOutput] = useState(0);

  useEffect(() => {
    if (currentOutput < outputs.length) {
      const timer = setTimeout(() => {
        setCurrentOutput(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentOutput, outputs.length]);

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
      
      <div className="relative rounded-xl bg-neutral-900/80 backdrop-blur-xl p-4 font-mono text-sm border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-4 h-4 text-neutral-400" />
          <span className="text-neutral-400">Output</span>
        </div>
        <div className="space-y-2">
          {outputs.slice(0, currentOutput).map((output, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 ${
                output.type === 'success' ? 'text-green-400' :
                output.type === 'info' ? 'text-blue-400' :
                output.type === 'metric' ? 'text-yellow-400' :
                'text-neutral-300'
              }`}
            >
              <div className="w-1 h-1 rounded-full bg-current" />
              <span>{output.content}</span>
            </motion.div>
          ))}
          {currentOutput < outputs.length && (
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-2 h-4 bg-neutral-400"
            />
          )}
        </div>
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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="demo" className="relative py-32 overflow-hidden bg-neutral-900/50">
      <GlowingOrbs />
      <HexGrid />
      <NeuralNetwork />
      <DataFlowEffect />

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
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Interactive Demo</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
            See It In Action
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Experience the power of Draxen&apos;s real-time processing capabilities
            with our interactive demo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <EnhancedCodeWindow content={demoContent.input} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <OutputWindow outputs={demoContent.output} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
