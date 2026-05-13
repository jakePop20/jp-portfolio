"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export type TechStackTile = {
  icon: string;
  label: string;
};

const dropBounce = {
  hidden: {
    opacity: 0,
    y: -96,
    rotate: -1.5,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 420,
      damping: 10,
      mass: 0.72,
    },
  },
};

const row1Container = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0 },
  },
};

const row2Container = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.22 },
  },
};

const row3Container = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.52 },
  },
};

export function AnimatedTechStack({
  smallTiles,
}: {
  smallTiles: readonly TechStackTile[];
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: false });

  if (reduceMotion) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glow-card group flex min-h-[280px] flex-col justify-between rounded-xl border border-outline-variant bg-surface-container p-8 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="material-symbols-outlined text-4xl text-primary">
                language
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] text-label-mono text-primary">
                FRONTEND &amp; MOBILE
              </span>
            </div>
            <div>
              <h3 className="mb-2 text-headline-lg text-on-surface">
                Angular, React &amp; React Native
              </h3>
              <p className="text-body-md text-on-surface-variant">
                JavaScript and TypeScript across Angular for enterprise UIs,
                React for product surfaces and integrations, and React Native
                when the experience needs to live on a device.
              </p>
            </div>
          </div>
          <div className="glow-card group flex min-h-[280px] flex-col justify-between rounded-xl border border-outline-variant bg-surface-container p-8 transition-all">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <span className="material-symbols-outlined text-4xl text-primary">
                dns
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] text-label-mono text-primary">
                BACKEND &amp; APIS
              </span>
            </div>
            <div>
              <h3 className="mb-2 text-headline-lg text-on-surface">
                Spring Boot, .NET &amp; Node
              </h3>
              <p className="text-body-md text-on-surface-variant">
                Spring-backed and Java services for regulated domains; C# and
                .NET for APIs and enterprise backends; Node.js for integrations,
                BFFs, and JavaScript-first server work.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {smallTiles.map((tile) => (
            <div
              key={tile.label}
              className="glow-card flex min-h-[132px] flex-col items-center justify-center rounded-xl border border-outline-variant bg-surface-container p-4 text-center transition-all"
            >
              <span className="material-symbols-outlined mb-2 text-3xl text-primary">
                {tile.icon}
              </span>
              <span className="text-label-mono text-on-surface leading-snug">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
        <div className="glow-card flex flex-col gap-6 rounded-xl border border-outline-variant bg-surface-container p-6 transition-all sm:flex-row sm:items-center sm:p-8">
          <span className="material-symbols-outlined shrink-0 text-4xl text-primary sm:text-5xl">
            rocket_launch
          </span>
          <div>
            <h4 className="text-headline-md text-on-surface">
              From commit to production — and locked down
            </h4>
            <p className="mt-2 text-body-md text-on-surface-variant">
              CI/CD pipelines with GitHub Actions, scalable workloads on AWS, VPS
              infrastructure management, and frontend deployments via Vercel.
              Emphasis on secure architectures, including JWT-based authentication
              and access control.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <motion.div
        className="grid gap-4 lg:grid-cols-2"
        variants={row1Container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          variants={dropBounce}
          className="glow-card group flex min-h-[280px] flex-col justify-between rounded-xl border border-outline-variant bg-surface-container p-8 transition-all"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className="material-symbols-outlined text-4xl text-primary">
              language
            </span>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] text-label-mono text-primary">
              FRONTEND &amp; MOBILE
            </span>
          </div>
          <div>
            <h3 className="mb-2 text-headline-lg text-on-surface">
              Angular, React &amp; React Native
            </h3>
            <p className="text-body-md text-on-surface-variant">
              JavaScript and TypeScript across Angular for enterprise UIs, React
              for product surfaces and integrations, and React Native when the
              experience needs to live on a device.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={dropBounce}
          className="glow-card group flex min-h-[280px] flex-col justify-between rounded-xl border border-outline-variant bg-surface-container p-8 transition-all"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <span className="material-symbols-outlined text-4xl text-primary">
              dns
            </span>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] text-label-mono text-primary">
              BACKEND &amp; APIS
            </span>
          </div>
          <div>
            <h3 className="mb-2 text-headline-lg text-on-surface">
              Spring Boot, .NET &amp; Node
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Spring-backed and Java services for regulated domains; C# and .NET
              for APIs and enterprise backends; Node.js for integrations, BFFs,
              and JavaScript-first server work.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        variants={row2Container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {smallTiles.map((tile) => (
          <motion.div
            key={tile.label}
            variants={dropBounce}
            className="glow-card flex min-h-[132px] flex-col items-center justify-center rounded-xl border border-outline-variant bg-surface-container p-4 text-center transition-all"
            style={{ willChange: "transform, opacity" }}
          >
            <span className="material-symbols-outlined mb-2 text-3xl text-primary">
              {tile.icon}
            </span>
            <span className="text-label-mono text-on-surface leading-snug">
              {tile.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={row3Container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          variants={dropBounce}
          className="glow-card flex flex-col gap-6 rounded-xl border border-outline-variant bg-surface-container p-6 transition-all sm:flex-row sm:items-center sm:p-8"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="material-symbols-outlined shrink-0 text-4xl text-primary sm:text-5xl">
            rocket_launch
          </span>
          <div>
            <h4 className="text-headline-md text-on-surface">
              From commit to production — and locked down
            </h4>
            <p className="mt-2 text-body-md text-on-surface-variant">
              CI/CD pipelines with GitHub Actions, scalable workloads on AWS, VPS
              infrastructure management, and frontend deployments via Vercel.
              Emphasis on secure architectures, including JWT-based authentication
              and access control.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
