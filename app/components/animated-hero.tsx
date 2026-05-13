"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type AnimatedHeroProps = {
  portraitSrc: string;
  portraitAlt: string;
  badgeText: string;
  name: string;
  role: string;
  tagline: string;
  actions: ReactNode;
};

const springReveal = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.95,
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 48,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springReveal,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...springReveal, stiffness: 340, damping: 32 },
  },
};

/** `fill` images need a non-zero box; abs-positioned img does not size its parent */
const portraitShellClass =
  "relative aspect-square w-[min(100%,400px)] max-w-full shrink-0 justify-self-center overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low shadow-[0_0_40px_rgba(59,130,246,0.45)] md:justify-self-end";

const heroGridClass =
  "mx-auto grid min-w-0 w-full max-w-container grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-[1fr_minmax(0,400px)] md:items-start";

export function AnimatedHero({
  portraitSrc,
  portraitAlt,
  badgeText,
  name,
  role,
  tagline,
  actions,
}: AnimatedHeroProps) {
  const reduceMotion = useReducedMotion();

  const portraitFrame = (
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent" />
  );

  const portraitContent = (
    <>
      <Image
        src={portraitSrc}
        alt={portraitAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
        priority
      />
      {portraitFrame}
    </>
  );

  if (reduceMotion) {
    return (
      <div className={heroGridClass}>
        <div className="col-start-1 space-y-6 md:col-span-1 md:min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
            <span className="min-w-0 break-words text-label-mono text-primary">{badgeText}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-on-surface sm:text-5xl md:text-[64px] md:leading-tight">
            <span className="text-primary">{name}</span> <br />
            {role}
          </h1>
          <p className="max-w-xl text-body-lg text-on-surface-variant">{tagline}</p>
          <div className="flex min-w-0 flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:gap-4">
            {actions}
          </div>
        </div>
        <div className={`${portraitShellClass} md:col-start-2 md:row-span-4 md:row-start-1`}>
          {portraitContent}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={heroGridClass}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUpBlur} className="col-start-1 min-w-0">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
          <span className="min-w-0 break-words text-label-mono text-primary">{badgeText}</span>
        </div>
      </motion.div>
      <motion.div variants={fadeUpBlur} className="col-start-1 min-w-0">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-on-surface sm:text-5xl md:text-[64px] md:leading-tight">
          <span className="text-primary">{name}</span> <br />
          {role}
        </h1>
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="col-start-1 min-w-0 max-w-xl text-body-lg text-on-surface-variant"
      >
        {tagline}
      </motion.p>
      <motion.div
        variants={fadeUp}
        className="col-start-1 flex min-w-0 flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap sm:gap-4"
      >
        {actions}
      </motion.div>
      <motion.div
        variants={fadeUpBlur}
        className={`${portraitShellClass} md:col-start-2 md:row-span-4 md:row-start-1 md:self-start`}
      >
        {portraitContent}
      </motion.div>
    </motion.div>
  );
}
