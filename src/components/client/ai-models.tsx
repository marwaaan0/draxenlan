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
        icon: 'message' as const
      },
      {
        title: 'Semantic Analysis',
        description: 'Deep comprehension of context, sentiment, and underlying meaning',
        icon: 'code' as const
      },
      {
        title: 'Content Generation',
        description: 'Create high-quality content from articles to poetry with creative flair',
        icon: 'message' as const
      },
      {
        title: 'Code Intelligence',
        description: 'Understand, generate, and explain code across programming languages',
        icon: 'code' as const
      },
      {
        title: 'Real-time Translation',
        description: 'Instant translation with context preservation and cultural adaptation',
        icon: 'message' as const
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
        icon: 'image' as const
      },
      {
        title: 'Image Generation',
        description: 'Create photorealistic images from textual descriptions',
        icon: 'image' as const
      },
      {
        title: 'Scene Understanding',
        description: 'Comprehend complex visual scenes and their relationships',
        icon: 'image' as const
      },
      {
        title: 'Facial Recognition',
        description: 'Advanced facial detection and recognition capabilities',
        icon: 'image' as const
      },
      {
        title: 'Visual Search',
        description: 'Find similar images based on visual content and features',
        icon: 'image' as const
      }
    ],
    examples: [
      "Generate an image of a futuristic city",
      "Detect objects in this surveillance footage",
      "Find similar products from this image",
      "Analyze the composition of this artwork",
      "Create variations of this logo design"
    ],
    demoPrompt: 'Upload an image or describe what you want to generate.',
  },
  {
    title: 'Speech Recognition',
    description: 'Advanced audio processing AI that can understand, transcribe, and generate natural speech with high accuracy.',
    icon: 'zap' as const,
    features: [
      {
        title: 'Voice Recognition',
        description: 'Identify and authenticate speakers from voice patterns',
        icon: 'message' as const
      },
      {
        title: 'Speech-to-Text',
        description: 'Convert spoken words to text with high accuracy',
        icon: 'message' as const
      },
      {
        title: 'Text-to-Speech',
        description: 'Generate natural-sounding speech from text',
        icon: 'message' as const
      },
      {
        title: 'Emotion Detection',
        description: 'Analyze emotional content in speech patterns',
        icon: 'message' as const
      },
      {
        title: 'Language Translation',
        description: 'Real-time translation of spoken language',
        icon: 'message' as const
      }
    ],
    examples: [
      "Transcribe this audio recording",
      "Generate speech from this text",
      "Identify the speaker in this clip",
      "Detect emotions in this conversation",
      "Translate this speech to Spanish"
    ],
    demoPrompt: 'Upload an audio file or enter text to convert to speech.',
  }
] as const;

export function AIModels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section id="models" className="relative py-20 overflow-hidden">
      <motion.div
        ref={containerRef}
        style={{ opacity, y }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Our AI Models
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model, index) => (
            <ModelCard key={model.title} {...model} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
