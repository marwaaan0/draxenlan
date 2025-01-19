'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ModelCard } from '@/components/ui/model-card';
import { useRef } from 'react';

const models = [
  {
    title: 'Natural Language Processing',
    description: 'Experience human-like conversations with our advanced NLP models, capable of understanding context, emotions, and cultural nuances.',
    icon: 'brain' as const,
    features: [
      {
        title: 'Multilingual Understanding',
        description: 'Process and generate text in over 100 languages with native-level understanding',
        icon: 'message'
      },
      {
        title: 'Semantic Analysis',
        description: 'Deep comprehension of context, sentiment, and underlying meaning',
        icon: 'code'
      },
      {
        title: 'Content Generation',
        description: 'Create high-quality content from articles to poetry with creative flair',
        icon: 'message'
      },
      {
        title: 'Code Intelligence',
        description: 'Understand, generate, and explain code across programming languages',
        icon: 'code'
      },
      {
        title: 'Real-time Translation',
        description: 'Instant translation with context preservation and cultural adaptation',
        icon: 'message'
      }
    ],
    examples: [
      "Explain quantum computing in simple terms",
      "Write a poem about artificial intelligence",
      "Analyze the sentiment of this customer review",
      "Translate this paragraph to Japanese",
      "Debug this Python code and explain the issue"
    ],
    demoPrompt: 'Enter your prompt here. Try asking questions, requesting analysis, or generating content.',
  },
  {
    title: 'Computer Vision',
    description: 'State-of-the-art visual AI that can analyze, understand, and generate images with unprecedented accuracy and creativity.',
    icon: 'sparkles' as const,
    features: [
      {
        title: 'Image Generation',
        description: 'Create stunning images from text descriptions with precise control',
        icon: 'image'
      },
      {
        title: 'Object Detection',
        description: 'Identify and track multiple objects in real-time with high accuracy',
        icon: 'code'
      },
      {
        title: 'Scene Understanding',
        description: 'Comprehend complex scenes, spatial relationships, and activities',
        icon: 'image'
      },
      {
        title: 'Style Transfer',
        description: 'Apply artistic styles while preserving content integrity',
        icon: 'image'
      },
      {
        title: 'Visual QA',
        description: 'Answer questions about images with detailed understanding',
        icon: 'message'
      }
    ],
    examples: [
      "Generate a photorealistic image of a futuristic city",
      "Detect and count objects in this surveillance footage",
      "Apply the style of Van Gogh to this photograph",
      "Describe what's happening in this image",
      "Remove the background from this product photo"
    ],
    demoPrompt: 'Describe the image you want to generate, or upload an image for analysis.',
  },
  {
    title: 'Real-time Processing',
    description: 'Lightning-fast neural networks optimized for real-time applications, delivering instant responses with minimal latency.',
    icon: 'zap' as const,
    features: [
      {
        title: 'Stream Processing',
        description: 'Handle continuous data streams with microsecond latency',
        icon: 'code'
      },
      {
        title: 'Adaptive Scaling',
        description: 'Automatically scale resources based on processing demands',
        icon: 'code'
      },
      {
        title: 'Edge Computing',
        description: 'Process data locally on edge devices for instant results',
        icon: 'code'
      },
      {
        title: 'Parallel Processing',
        description: 'Distribute workloads across multiple cores for maximum speed',
        icon: 'code'
      },
      {
        title: 'Real-time Analytics',
        description: 'Instant insights from streaming data with live visualization',
        icon: 'message'
      }
    ],
    examples: [
      "Process this video stream for motion detection",
      "Analyze network traffic in real-time",
      "Monitor system metrics with millisecond precision",
      "Track object movement in live video",
      "Generate real-time predictions from sensor data"
    ],
    demoPrompt: 'Enter your real-time processing requirements or start a live data stream.',
  },
];

export function AIModels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section 
      id="models" 
      className="relative py-32 overflow-hidden bg-neutral-900"
      ref={containerRef}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity }}
      >
        <div className="absolute -top-1/2 left-0 w-3/4 aspect-square bg-gradient-to-r from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 right-0 w-3/4 aspect-square bg-gradient-to-l from-blue-500/20 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Mesh Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
      
      <motion.div 
        className="container mx-auto px-4 relative"
        style={{ scale, opacity }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powered by Advanced AI Models
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-neutral-300/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the future of AI with our cutting-edge models, designed to deliver 
            exceptional performance and push the boundaries of what's possible.
          </motion.p>
        </motion.div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {models.map((model, index) => (
            <ModelCard
              key={model.title}
              {...model}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
