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

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/client/dock';

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
];

export function MainNav() {
  return (
    <Dock>
      {data.map((item) => (
        <a key={item.title} href={item.href}>
          <DockItem>
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.title}</DockLabel>
          </DockItem>
        </a>
      ))}
    </Dock>
  );
}
