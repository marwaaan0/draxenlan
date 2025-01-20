import dynamic from 'next/dynamic';
import { Hero } from "@/components/ui/animated-hero";
import { Footer } from '@/components/sections/footer';

const MainNav = dynamic(() => import('@/components/client/dock-demo').then(mod => ({ default: mod.MainNav })), {
  ssr: false
});

const AIModels = dynamic(() => import('@/components/client/ai-models').then(mod => ({ default: mod.AIModels })), {
  ssr: false
});

const Features = dynamic(() => import('@/components/client/features').then(mod => ({ default: mod.Features })), {
  ssr: false
});

const Demo = dynamic(() => import('@/components/client/demo').then(mod => ({ default: mod.Demo })), {
  ssr: false
});

const About = dynamic(() => import('@/components/client/about').then(mod => ({ default: mod.About })), {
  ssr: false
});

const Contact = dynamic(() => import('@/components/client/contact').then(mod => ({ default: mod.Contact })), {
  ssr: false
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <AIModels />
      <Features />
      <Demo />
      <About />
      <Contact />
      <Footer />
      <MainNav />
    </main>
  )
}

const features = [
  {
    title: "Natural Language Processing",
    description: "Advanced understanding of Arabic, French, and English with cultural context awareness.",
    icon: "🗣️"
  },
  {
    title: "Moroccan Culture Integration",
    description: "Deep understanding of Moroccan traditions, customs, and social norms.",
    icon: "🇲🇦"
  },
  {
    title: "Multi-Modal Interaction",
    description: "Seamlessly communicate through text, voice, and visual inputs.",
    icon: "🔄"
  }
]
