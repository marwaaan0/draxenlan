'use client';

import {
  HomeIcon,
  Brain,
  Sparkles,
  Activity,
  ScrollText,
  MessageSquare,
  Sun,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-300' />
    ),
    href: '#hero',
  },
  {
    title: 'AI Models',
    icon: (
      <Brain className='h-full w-full text-neutral-300' />
    ),
    href: '#models',
  },
  {
    title: 'Features',
    icon: (
      <Sparkles className='h-full w-full text-neutral-300' />
    ),
    href: '#features',
  },
  {
    title: 'Demo',
    icon: (
      <Activity className='h-full w-full text-neutral-300' />
    ),
    href: '#demo',
  },
  {
    title: 'About',
    icon: (
      <ScrollText className='h-full w-full text-neutral-300' />
    ),
    href: '#about',
  },
  {
    title: 'Contact',
    icon: (
      <MessageSquare className='h-full w-full text-neutral-300' />
    ),
    href: '#contact',
  },
  {
    title: 'Theme',
    icon: (
      <Sun className='h-full w-full text-neutral-300' />
    ),
    href: '#',
  },
];

export function MainNav() {
  return (
    <div className='fixed bottom-8 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <a key={idx} href={item.href}>
            <DockItem
              className='aspect-square rounded-full bg-neutral-900/90 backdrop-blur-md hover:bg-neutral-800/90 transition-colors border border-neutral-800'
            >
              <DockLabel className="bg-neutral-900 border-neutral-800 text-neutral-300">{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </a>
        ))}
      </Dock>
    </div>
  );
}
