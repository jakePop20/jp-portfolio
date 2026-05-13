import { RESUME_DOWNLOAD_FILENAME, RESUME_PDF_PATH } from "@/lib/resume";
import { AnimatedHero } from "./components/animated-hero";
import { AnimatedProjectRow } from "./components/animated-project-row";
import { AnimatedProjectsIntro } from "./components/animated-projects-intro";
import { AnimatedStats } from "./components/animated-stats";
import { AnimatedTechStack } from "./components/animated-tech-stack";
import { SiteNav } from "./components/site-nav";

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

const HERO_PORTRAIT = "/face.jpg";

const projects = [
  {
    category: "01 / INVESTMENT",
    title: "Private Assets Investment Platform",
    description:
      "Built a full-stack investment platform using React Native, .NET 8, Go, and PostgreSQL. Designed secure authentication and resilient backend pipelines.",
    tags: ["React Native", ".NET 8", "Go", "PostgreSQL", "GitHub Actions"],
    image: "/poler_screenshot_1.jpeg",
    imageAlt: "Poler project screenshot",
    imageFrame: "mobile" as const,
  },
  {
    category: "02 / E-COMMERCE",
    title: "Modern Sole - Headless Storefront",
    description:
      "Built a custom React-based storefront, integrating with the Shopify API for product data, cart management, and seamless checkout via Shopify’s hosted flow.",
    tags: ["React", "Shopify API", "Node.js"],
    image: "/e-commerce_screenshot.png",
    imageAlt: "Modern Sole headless storefront screenshot",
    imageFit: "contain" as const,
  },
  {
    category: "03 / GOVERNMENT",
    title: "Government Systems",
    description:
      "Developed secure Angular + Spring Boot features for government applications. Integrated AWS Lambda for automated document processing.",
    tags: ["Angular", "Spring Boot", "AWS", "PostgreSQL"],
    image: "/gov_website_generic.jpg",
    imageAlt: "Government systems web interface",
  },
];

const techStackSmallTiles = [
  { icon: "database", label: "PostgreSQL" },
  { icon: "deployed_code", label: "Docker" },
  { icon: "storefront", label: "Shopify & e-commerce" },
] as const;

const stats = [
  {
    icon: "terminal",
    title: "Full stack",
    subtitle: "React • Angular • Node.js\n .NET • Spring Boot",
  },
  {
    icon: "rocket_launch",
    title: "CI/CD & cloud",
    subtitle: "Pipelines & AWS integrations",
  },
  {
    icon: "groups",
    title: "Collaboration",
    subtitle: "Cross-functional delivery",
  },
];

export default function Home() {
  return (
    <main>
      <SiteNav />

      <header
        id="home"
        className="relative flex min-h-[100dvh] min-h-screen items-center bg-background px-margin-mobile pb-16 pt-24 hero-gradient md:px-margin-desktop md:pb-20 md:pt-32"
      >
        <AnimatedHero
          portraitSrc={HERO_PORTRAIT}
          portraitAlt="Jakub Popiolek — full-stack engineer"
          badgeText="Open to freelance & remote opportunities"
          name="Jakub Popiolek"
          role="Full Stack Developer"
          tagline="I build scalable web applications using React, Angular, .NET, and Spring Boot - from government systems to cloud-based platforms."
          actions={
            <>
              <a
                href="#contact"
                className="inline-flex w-full min-h-11 items-center justify-center rounded-lg bg-primary px-6 py-3 text-label-mono text-white transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] sm:w-auto sm:min-w-[10.5rem] sm:px-8"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="inline-flex w-full min-h-11 items-center justify-center rounded-lg border border-outline-variant px-6 py-3 text-label-mono text-on-surface transition-all hover:bg-surface-variant/50 sm:w-auto sm:min-w-[10.5rem] sm:px-8"
              >
                View Projects
              </a>
            </>
          }
        />
      </header>

      <section className="bg-surface-container-lowest px-margin-mobile py-12 md:px-margin-desktop">
        <AnimatedStats items={stats} />
      </section>

      <section
        id="projects"
        className="bg-background px-margin-mobile py-8 md:px-margin-desktop"
      >
        <div className="mx-auto max-w-container">
          <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
            <AnimatedProjectsIntro
              title="Projects"
              subtitle="A selection of shipped work and technical depth."
            />
          </div>
          <div className="space-y-12 md:space-y-24">
            {projects.map((project, index) => (
              <AnimatedProjectRow
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="bg-surface-container-lowest px-margin-mobile py-8 md:px-margin-desktop"
      >
        <div className="mx-auto max-w-container">
          <div className="mb-12 space-y-2 text-center md:text-left">
            <h2 className="text-headline-lg text-on-surface">
              Tech stack favorites
            </h2>
            <p className="text-body-md text-on-surface-variant">
              Languages, frameworks, and platforms I reach for most often.
            </p>
          </div>
          <AnimatedTechStack smallTiles={techStackSmallTiles} />
        </div>
      </section>

      <section
        id="contact"
        className="bg-background px-margin-mobile py-8 md:px-margin-desktop"
      >
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-on-surface sm:text-5xl md:text-display-lg">
            Want to work{" "}
            <span className="text-primary">together</span>
            ?
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            I&apos;m open to freelance and full-time work. Tell me about your
            stack, constraints, and timeline - I&apos;ll respond with a clear
            technical plan.
          </p>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href="mailto:jakubpopiolek20@gmail.com"
                className="text-label-mono text-lg text-primary transition-colors hover:text-primary/80 hover:underline sm:text-xl"
              >
                jakubpopiolek20@gmail.com
              </a>
            </div>
            <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-lg sm:flex-row sm:justify-center sm:gap-4">
              <a
                href="https://github.com/jakePop20"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-outline-variant bg-surface-container px-6 py-4 text-body-md font-semibold text-on-surface shadow-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <IconGitHub className="h-6 w-6 shrink-0" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jakubpopiolek"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-outline-variant bg-surface-container px-6 py-4 text-body-md font-semibold text-on-surface shadow-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <IconLinkedIn className="h-6 w-6 shrink-0" />
                LinkedIn
              </a>
            </div>
            <a
              href={RESUME_PDF_PATH}
              download={RESUME_DOWNLOAD_FILENAME}
              className="inline-flex w-full max-w-xs min-h-11 items-center justify-center rounded-lg border border-outline-variant px-6 py-4 text-label-mono text-on-surface transition-all hover:bg-surface-variant/50 sm:w-auto sm:max-w-none sm:px-10"
            >
              View my Resume
            </a>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-outline-variant/20 bg-surface-container-lowest py-12">
        <div className="mx-auto max-w-container px-margin-mobile text-center md:px-margin-desktop md:text-left">
          <div className="flex flex-col gap-2">
            <div className="text-headline-md font-bold text-on-surface">
              Jakub Popiolek
            </div>
            <p className="text-label-mono text-outline">
              © {new Date().getFullYear()} Jakub Popiolek. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
