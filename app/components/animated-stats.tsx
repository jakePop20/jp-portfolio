"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export type StatCard = {
  icon: string;
  title: string;
  subtitle: string;
};

const springPop = {
  type: "spring" as const,
  stiffness: 380,
  damping: 19,
  mass: 0.72,
};

const containerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.055,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 64,
    rotateX: -26,
    rotateZ: i % 2 === 0 ? -5 : 5,
    scale: 0.86,
    transition: { duration: 0.22, ease: "easeIn" as const },
  }),
  visible: () => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    transition: springPop,
  }),
};

export function AnimatedStats({ items }: { items: readonly StatCard[] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.22, once: false });

  if (reduceMotion) {
    return (
      <div className="mx-auto grid max-w-container grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="glow-card rounded-xl border border-outline-variant bg-surface-container-low p-6 text-center transition-all"
          >
            <span className="material-symbols-outlined mb-4 block text-primary">
              {item.icon}
            </span>
            <h3 className="mb-2 text-headline-md text-on-surface">
              {item.title}
            </h3>
            <p className="whitespace-pre-line text-label-mono text-on-surface-variant">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-container [perspective:1200px]"
      style={{ perspectiveOrigin: "50% 0%" }}
    >
      <motion.div
        ref={ref}
        className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            custom={index}
            variants={itemVariants}
            className="glow-card rounded-xl border border-outline-variant bg-surface-container-low p-6 text-center transition-all"
            style={{
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            }}
          >
            <span className="material-symbols-outlined mb-4 block text-primary">
              {item.icon}
            </span>
            <h3 className="mb-2 text-headline-md text-on-surface">{item.title}</h3>
            <p className="whitespace-pre-line text-label-mono text-on-surface-variant">
              {item.subtitle}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
