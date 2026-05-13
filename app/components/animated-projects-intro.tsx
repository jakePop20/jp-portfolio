"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
};

const blockVariants = {
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: spring,
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, x: -28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { ...spring, stiffness: 280, damping: 32 },
  },
};

export function AnimatedProjectsIntro({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45, once: false });

  if (reduceMotion) {
    return (
      <div className="space-y-2">
        <h2 className="text-headline-lg text-on-surface">{title}</h2>
        <p className="text-body-md text-on-surface-variant">{subtitle}</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="space-y-2"
      variants={blockVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h2 variants={titleVariants} className="text-headline-lg text-on-surface">
        {title}
      </motion.h2>
      <motion.p
        variants={subtitleVariants}
        className="text-body-md text-on-surface-variant"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}
