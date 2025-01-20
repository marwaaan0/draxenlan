'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ModelCard } from '@/components/client/model-card';
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
        title: 'Object Detection',
        description: 'Identify and track multiple objects in real-time with high precision',
        icon: 'image'
      },
      {
        title: 'Image Generation',
        description: 'Create stunning, realistic images from textual descriptions',
        icon: 'image'
      },
      {
        title: 'Scene Understanding',
        description: 'Comprehend complex scenes and spatial relationships between objects',
        icon: 'image'
      },
      {
        title: 'Facial Recognition',
        description: 'Advanced facial detection and analysis with privacy protection',
        icon: 'image'
      },
      {
        title: 'Style Transfer',
        description: 'Apply artistic styles to images while preserving content integrity',
        icon: 'image'
      }
    ],
    examples: [
      "Generate a photorealistic image of a futuristic city",
      "Detect and count objects in this surveillance footage",
      "Apply an impressionist style to this photograph",
      "Analyze the emotion in this facial expression",
      "Remove the background from this product image"
    ],
    demoPrompt: 'Describe the image you want to generate or upload an image for analysis.',
  },
  {
    title: 'Multimodal AI',
    description: 'Cutting-edge AI that seamlessly combines text, vision, and audio understanding for comprehensive analysis and generation.',
    icon: 'zap' as const,
    features: [
      {
        title: 'Cross-modal Learning',
        description: 'Understand relationships between different types of data',
        icon: 'code'
      },
      {
        title: 'Audio Processing',
        description: 'Convert speech to text and analyze audio patterns',
        icon: 'message'
      },
      {
        title: 'Video Analysis',
        description: 'Extract insights from video content with temporal understanding',
        icon: 'image'
      },
      {
        title: 'Interactive Learning',
        description: 'Adapt and improve through multimodal interactions',
        icon: 'code'
      },
      {
        title: 'Data Synthesis',
        description: 'Generate coordinated outputs across multiple modalities',
        icon: 'message'
      }
    ],
    examples: [
      "Create a video with matching audio from this script",
      "Extract key moments from this podcast",
      "Generate an image that matches this music",
      "Analyze the emotion in this video clip",
      "Convert this presentation to an interactive format"
    ],
    demoPrompt: 'Try our multimodal AI by combining different types of inputs (text, image, audio).',
  }
];

export function AIModels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      id="models"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black py-20"
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4"
      >
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Our AI Models
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-gray-400"
          >
            Experience the power of our advanced AI models, each designed to excel in
            specific domains while working seamlessly together.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model, index) => (
            <ModelCard key={model.title} {...model} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
