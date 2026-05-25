"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MOTION_EASE, REVEAL_VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, REVEAL_VIEWPORT);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, delay, ease: MOTION_EASE }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, REVEAL_VIEWPORT);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger } },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={
        reduceMotion
          ? {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.25, ease: MOTION_EASE },
              },
            }
          : {
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: MOTION_EASE },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
