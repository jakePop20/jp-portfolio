"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type ProjectCard = {
  category: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
  /** Tall phone-shaped frame for mobile app screenshots; default is 16:9. */
  imageFrame?: "wide" | "mobile";
  /**
   * How the image fills the wide (16:9) frame. Use "contain" for full-page or
   * tall website screenshots so nothing is cropped. Ignored when imageFrame is "mobile".
   */
  imageFit?: "cover" | "contain";
  /** Public demo or production URL; opens in a new tab. */
  liveUrl?: string;
};

const rowStagger = {
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.05 },
  },
};

/** Shared by wide + mobile project thumbnails */
const projectImageHoverOverlayClass =
  "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/50 via-primary/[0.08] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex-row sm:gap-2";

const projectImageFitHoverClass =
  "transition-[filter,transform] duration-500 ease-out saturate-[0.88] brightness-[0.98] contrast-[1.02] group-hover:saturate-100 group-hover:brightness-100";

export function AnimatedProjectRow({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const inView = useInView(ref, {
    amount: 0.15,
    margin: "0px 0px -12% 0px",
    once: false,
  });

  const fromLeft = index % 2 === 0;

  const { imageVariants, textVariants } = useMemo(() => {
    const slide = isNarrow ? (fromLeft ? -56 : 56) : fromLeft ? -115 : 115;
    const textDrift = isNarrow ? (fromLeft ? 18 : -18) : fromLeft ? 36 : -36;
    return {
      imageVariants: {
        hidden: {
          opacity: 0,
          x: slide,
          scale: 0.88,
          filter: "blur(16px)",
          transition: { duration: 0.24, ease: "easeIn" as const },
        },
        visible: {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            type: "spring" as const,
            stiffness: 190,
            damping: 22,
            mass: 0.95,
          },
        },
      },
      textVariants: {
        hidden: {
          opacity: 0,
          y: 48,
          x: textDrift,
          filter: "blur(12px)",
          transition: { duration: 0.2, ease: "easeIn" as const },
        },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          filter: "blur(0px)",
          transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 28,
            mass: 0.85,
          },
        },
      },
    };
  }, [fromLeft, isNarrow]);

  const isMobileFrame = project.imageFrame === "mobile";

  const rowClass =
    "flex flex-col gap-8 md:flex-row " +
    (isMobileFrame
      ? "items-center md:items-start md:gap-14 lg:gap-16 "
      : "items-center md:gap-12 ") +
    (index % 2 === 1 ? "md:flex-row-reverse" : "");

  const mobilePedestalClass =
    "mx-auto w-full max-w-[min(100%,332px)] shrink-0 rounded-[2rem] border border-outline-variant/20 bg-gradient-to-b from-surface-container-highest to-surface-container p-3 shadow-[0_28px_56px_-14px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06] md:mx-0 md:w-[332px] md:max-w-none md:p-4";
  const mobileScreenClass =
    "group relative aspect-[9/13] w-full overflow-hidden rounded-[1.2rem] bg-[#07090e] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_18px_48px_rgba(0,0,0,0.55)] md:rounded-[1.35rem]";

  const imageOuterClass = isMobileFrame ? mobilePedestalClass : "w-full md:w-3/5";
  const imageInnerClass = isMobileFrame
    ? mobileScreenClass
    : "group relative aspect-video w-full overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container";

  const wideImageFit = project.imageFit ?? "cover";
  const imageFitClass =
    (isMobileFrame
      ? "object-cover object-center "
      : wideImageFit === "contain"
        ? "object-contain object-top "
        : "object-cover object-top ") + projectImageFitHoverClass;

  const textColClass = isMobileFrame
    ? "w-full min-w-0 space-y-6 md:flex-1 md:space-y-8"
    : "w-full space-y-6 md:w-2/5";

  const liveSiteLink =
    project.liveUrl != null && project.liveUrl.length > 0 ? (
      <p className="pt-1">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-label-mono text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline"
        >
          View live site
        </a>
      </p>
    ) : null;

  const imageHoverContent =
    project.liveUrl != null && project.liveUrl.length > 0 ? (
      <>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-white px-6 py-3 text-label-mono text-black transition-opacity hover:opacity-95"
        >
          View live site
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-white/45 bg-black/25 px-6 py-3 text-label-mono text-white backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          Discuss this project
        </a>
      </>
    ) : (
      <a
        href="#contact"
        className="rounded-lg bg-white px-6 py-3 text-label-mono text-black"
      >
        Discuss this project
      </a>
    );

  const imageBlock = (
    <div className={imageOuterClass}>
      <div className={imageInnerClass}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className={imageFitClass}
          sizes={
            isMobileFrame
              ? "(max-width: 768px) 90vw, 300px"
              : "(max-width: 768px) 100vw, 60vw"
          }
        />
        <div className={projectImageHoverOverlayClass}>{imageHoverContent}</div>
      </div>
    </div>
  );

  const textBlock = (
    <div className={textColClass}>
      <div className="flex gap-3">
        <span className="text-[12px] text-label-mono text-primary">
          {project.category}
        </span>
      </div>
      <h3 className="text-headline-lg text-on-surface md:text-[40px] md:leading-tight">
        {project.title}
      </h3>
      <p className="text-body-md text-on-surface-variant">{project.description}</p>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-outline-variant bg-surface-variant px-3 py-1 text-[12px] text-label-mono"
          >
            {tag}
          </li>
        ))}
      </ul>
      {liveSiteLink}
    </div>
  );

  if (reduceMotion) {
    return (
      <div className={rowClass}>
        {imageBlock}
        {textBlock}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={rowClass}
      variants={rowStagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        variants={imageVariants}
        className={imageOuterClass}
        style={{ willChange: "transform, opacity, filter" }}
      >
        <div className={imageInnerClass}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className={imageFitClass}
            sizes={
              isMobileFrame
                ? "(max-width: 768px) 90vw, 300px"
                : "(max-width: 768px) 100vw, 60vw"
            }
          />
          <div className={projectImageHoverOverlayClass}>{imageHoverContent}</div>
        </div>
      </motion.div>
      <motion.div
        variants={textVariants}
        className={textColClass}
        style={{ willChange: "transform, opacity, filter" }}
      >
        <div className="flex gap-3">
          <span className="text-[12px] text-label-mono text-primary">
            {project.category}
          </span>
        </div>
        <h3 className="text-headline-lg text-on-surface md:text-[40px] md:leading-tight">
          {project.title}
        </h3>
        <p className="text-body-md text-on-surface-variant">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-outline-variant bg-surface-variant px-3 py-1 text-[12px] text-label-mono"
            >
              {tag}
            </li>
          ))}
        </ul>
        {liveSiteLink}
      </motion.div>
    </motion.div>
  );
}
