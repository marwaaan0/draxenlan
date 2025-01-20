'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MessageSquare, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';

function FlyingMessages() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: -100, 
            y: Math.random() * (windowSize.height || 800),
            rotate: -30,
            scale: 0.5,
          }}
          animate={{
            x: (windowSize.width || 1200) + 100,
            y: Math.random() * (windowSize.height || 800),
            rotate: 30,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          <div className="relative w-32 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl backdrop-blur-sm border border-white/10 p-4 transform -rotate-6">
            <div className="w-full h-2 bg-white/20 rounded mb-2" />
            <div className="w-2/3 h-2 bg-white/20 rounded" />
            <motion.div
              className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-purple-500/50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
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
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 backdrop-blur-xl"
    >
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-gray-400">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm text-gray-400">
            Message
          </label>
          <textarea
            id="message"
            value={formState.message}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, message: e.target.value }))
            }
            required
            rows={4}
            className="w-full rounded-lg bg-white/5 px-4 py-2.5 text-white placeholder:text-gray-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 py-2.5 text-white transition-all hover:opacity-80 disabled:opacity-50"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Message Sent!
              </h3>
              <p className="text-gray-400">
                We'll get back to you as soon as possible.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-8"
    >
      <div>
        <h3 className="mb-4 text-xl font-semibold text-white">Get in Touch</h3>
        <p className="text-gray-400">
          Have questions about our platform? Want to partner with us? Let's talk!
        </p>
      </div>

      <div className="space-y-4">
        <a
          href="mailto:contact@draxen.ai"
          className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white"
        >
          <Mail className="h-5 w-5" />
          contact@draxen.ai
        </a>
        <div className="flex gap-4">
          <a
            href="#"
            className="rounded-lg bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="rounded-lg bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="rounded-lg bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black py-20"
    >
      <FlyingMessages />
      <FloatingParticles />
      
      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-gray-400"
          >
            Ready to revolutionize your AI processing? Get in touch with our team.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
