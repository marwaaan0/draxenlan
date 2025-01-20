'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};
type DockItemProps = {
  className?: string;
  children: React.ReactNode;
};
type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};
type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type DocContextType = {
  mouseX: MotionValue;
  distance: number;
  magnification: number;
  panelHeight: number;
};

type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    function handleMouseMove(event: MouseEvent) {
      const { left } = ref.current!.getBoundingClientRect();
      mouseX.set(event.clientX - left);
    }

    function handleMouseLeave() {
      mouseX.set(0);
    }

    ref.current.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX]);

  const value = useMemo(
    () => ({
      mouseX,
      distance,
      magnification,
      panelHeight,
    }),
    [mouseX, distance, magnification, panelHeight]
  );

  return (
    <DockProvider value={value}>
      <div
        ref={ref}
        className={cn('fixed bottom-0 left-1/2 -translate-x-1/2 z-50', className)}
      >
        <div className="flex h-[128px] items-end gap-4 px-4 pb-4">
          {children}
        </div>
      </div>
    </DockProvider>
  );
}

function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, distance, magnification, panelHeight } = useDock();
  const [elCenterX, setElCenterX] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    const { left, width } = ref.current.getBoundingClientRect();
    setElCenterX(left + width / 2);
  }, []);

  const springConfig = {
    stiffness: 150,
    damping: 12,
    mass: 0.1,
  };

  const distanceFromMouseToCenter = useTransform(mouseX, (value) =>
    value === 0 ? 0 : value - elCenterX
  );

  const scale = useSpring(
    useTransform(distanceFromMouseToCenter, [-distance, 0, distance], [1, 2, 1], {
      clamp: true,
    }),
    springConfig
  );

  const height = useTransform(scale, [1, 2], [panelHeight, DOCK_HEIGHT]);

  return (
    <motion.div
      ref={ref}
      style={{ height }}
      className={cn('relative flex w-16 items-center justify-center', className)}
    >
      <motion.div style={{ scale }}>{children}</motion.div>
    </motion.div>
  );
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX } = useDock();
  const [elCenterX, setElCenterX] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    const { left, width } = ref.current.getBoundingClientRect();
    setElCenterX(left + width / 2);
  }, []);

  const springConfig = {
    stiffness: 150,
    damping: 12,
    mass: 0.1,
  };

  const distanceFromMouseToCenter = useTransform(mouseX, (value) =>
    value === 0 ? 0 : value - elCenterX
  );

  const opacity = useSpring(
    useTransform(distanceFromMouseToCenter, [-50, 0, 50], [0, 1, 0], {
      clamp: true,
    }),
    springConfig
  );

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        style={{ opacity }}
        className={cn(
          'pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[120%] rounded-lg bg-black/80 px-3 py-1.5 text-sm text-white shadow-lg backdrop-blur-md',
          className
        )}
        {...rest}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  return (
    <div
      className={cn('h-full w-full rounded-2xl bg-neutral-900', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
