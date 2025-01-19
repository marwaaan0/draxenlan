import Image from "next/image";
import { Hero } from "@/components/ui/animated-hero";
import Spotlight from '../components/Spotlight';
import { MainNav } from '@/components/ui/dock-demo';
import { AIModels } from '@/components/sections/ai-models';
import { Features } from '@/components/sections/features';
import { Demo } from '@/components/sections/demo';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

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
