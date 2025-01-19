'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MessageSquare, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';

function FlyingMessages() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: -100, 
            y: Math.random() * window.innerHeight,
            rotate: -30,
            scale: 0.5,
          }}
          animate={{
            x: window.innerWidth + 100,
            y: Math.random() * window.innerHeight,
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
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
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
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative group space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
      
      <div className="relative p-8 rounded-xl bg-neutral-900/50 backdrop-blur-xl border border-white/10">
        {/* Input Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </motion.div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </motion.div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <textarea
                value={formState.message}
                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-neutral-800/50 border border-white/10 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32 resize-none"
                placeholder="Your message..."
              />
            </motion.div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="mt-6 w-full relative group overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || isSubmitted}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center"
              >
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </motion.div>
            ) : isSubmitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center gap-2"
              >
                <span>Message Sent!</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="send"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      </div>
    </motion.form>
  );
}

function ContactInfo() {
  const contacts = [
    { icon: Mail, label: 'Email', value: 'contact@draxen.ai' },
    { icon: Github, label: 'Github', value: '@draxen' },
    { icon: Twitter, label: 'Twitter', value: '@draxen_ai' },
    { icon: Linkedin, label: 'LinkedIn', value: '/draxen-ai' }
  ];

  return (
    <div className="space-y-6">
      {contacts.map((contact, index) => {
        const Icon = contact.icon;
        return (
          <motion.a
            key={contact.label}
            href="#"
            className="relative group block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 backdrop-blur-xl border border-white/10">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-neutral-400">{contact.label}</div>
                <div className="text-white font-medium">{contact.value}</div>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-neutral-900">
      <FlyingMessages />
      <FloatingParticles />

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
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Get in Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Have questions about Draxen AI? We&apos;d love to hear from you.
            Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
