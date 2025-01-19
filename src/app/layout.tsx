import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import './globals.css'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Draxen AI - Next Generation Artificial Intelligence',
  description: 'Experience innovative artificial intelligence with our revolutionary platform. Built for visionaries, designed for the future.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-black font-sans antialiased',
        fontSans.variable
      )}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
