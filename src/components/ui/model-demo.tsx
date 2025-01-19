'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send, X, ChevronLeft, ChevronRight, Upload, Download, Copy, Check, RefreshCw } from 'lucide-react';

interface ModelDemoProps {
  title: string;
  icon: React.ReactNode;
  demoPrompt: string;
  examples: string[];
  onClose: () => void;
  modelType: 'nlp' | 'vision' | 'realtime';
}

export function ModelDemo({ title, icon, demoPrompt, examples, onClose, modelType }: ModelDemoProps) {
  const [currentExample, setCurrentExample] = useState(0);
  const [demoInput, setDemoInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoResponse, setDemoResponse] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const [streamingData, setStreamingData] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // Simulated streaming data for real-time processing
  useEffect(() => {
    if (isStreaming && modelType === 'realtime') {
      const interval = setInterval(() => {
        setStreamingData(prev => [...prev, `Data point ${prev.length + 1}: ${Math.random().toFixed(4)}`]);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isStreaming, modelType]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(demoResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDemoSubmit = async () => {
    if (!demoInput.trim() && !uploadedImage) return;
    
    setIsLoading(true);
    setActiveTab('output');
    
    // Simulate API call with typing effect
    const response = "Here's a simulated response that demonstrates the capabilities of our AI model. This response is being typed out character by character to create an engaging effect. In a real implementation, this would be connected to the actual AI model backend.";
    setDemoResponse('');
    
    for (let i = 0; i < response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setDemoResponse(prev => prev + response[i]);
    }
    
    setIsLoading(false);
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setDemoInput(examples[(currentExample + 1) % examples.length]);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
    setDemoInput(examples[(currentExample - 1 + examples.length) % examples.length]);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-neutral-900 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden glass"
        onClick={e => e.stopPropagation()}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-white">{title} Demo</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('input')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'input'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Input
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'output'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Output
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'input' ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Examples Carousel */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-white/70 mb-2">Examples</h4>
                  <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3">
                    <button
                      onClick={prevExample}
                      className="p-1 text-white/50 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <p className="flex-1 text-sm text-neutral-400 text-center">
                      {examples[currentExample]}
                    </p>
                    <button
                      onClick={nextExample}
                      className="p-1 text-white/50 hover:text-white transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  {modelType === 'vision' && (
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="block w-full aspect-video rounded-lg border-2 border-dashed border-white/10 hover:border-purple-500/50 transition-colors cursor-pointer"
                      >
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full">
                            <Upload className="h-8 w-8 text-white/30 mb-2" />
                            <p className="text-sm text-white/50">
                              Drop an image here or click to upload
                            </p>
                          </div>
                        )}
                      </label>
                      {uploadedImage && (
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-white/70" />
                        </button>
                      )}
                    </div>
                  )}

                  {modelType === 'realtime' && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-white/70">Data Stream</span>
                      <button
                        onClick={() => setIsStreaming(!isStreaming)}
                        className={`px-3 py-1 rounded-md flex items-center gap-2 ${
                          isStreaming
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-green-500/20 text-green-300'
                        }`}
                      >
                        <RefreshCw className={`h-4 w-4 ${isStreaming ? 'animate-spin' : ''}`} />
                        {isStreaming ? 'Stop' : 'Start'} Stream
                      </button>
                    </div>
                  )}

                  <div className="relative">
                    <textarea
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder={demoPrompt}
                      className="w-full h-32 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                    <button
                      onClick={handleDemoSubmit}
                      disabled={isLoading}
                      className="absolute bottom-3 right-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="output"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {modelType === 'realtime' && isStreaming ? (
                  <div className="h-64 overflow-auto bg-black/30 rounded-lg p-4">
                    <div className="space-y-2">
                      {streamingData.map((data, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-neutral-300 font-mono"
                        >
                          {data}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : demoResponse ? (
                  <div className="relative">
                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-purple-500/20 p-1">
                            {icon}
                          </div>
                          <span className="text-sm text-white/70">AI Response</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCopy}
                            className="p-1 text-white/50 hover:text-white transition-colors"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setDemoResponse('')}
                            className="p-1 text-white/50 hover:text-white transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-300 typing">{demoResponse}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-white/30">
                    No output yet. Try sending a prompt!
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
