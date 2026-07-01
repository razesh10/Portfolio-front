"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
})

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
})

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
})

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
})

const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
})

// Wiggle for the "Hello!" badge spark lines
const wiggle = {
  animate: {
    rotate: [0, 12, -8, 10, 0],
    transition: { duration: 2, repeat: Infinity, repeatDelay: 3 },
  },
}

// Floating bob for the photo
const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center px-6 pt-24 pb-0 md:pt-32">
      <Image src={"/images/bg-light.jpg"} fill alt="" sizes="(max-width: 2000px) 100vw, 33vw" className="object-cover hidden dark:block pointer-events-none select-none" loading="lazy" />
      <Image src={"/images/bg-dark.jpg"} fill alt="" sizes="(max-width: 2000px) 100vw, 33vw" className="object-cover dark:hidden pointer-events-none select-none" loading="lazy" />
      
      {/* ── Hello badge ── */}
      <motion.div
        className="relative mb-4 flex items-center gap-1"
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="show"
      >
        <span className="rounded-full border border-border px-5 py-1.5 text-sm font-medium tracking-wide text-muted-foreground shadow-sm">
          Hello!
        </span>
        {/* Spark lines */}
        <Image src={"/images/icon.svg"} alt="" width={30} height={30} className="object-contain absolute bottom-full left-full" />
      </motion.div>

      {/* ── Headline ── */}
      <div className="pointer-events-none relative z-10 text-center">
        <motion.h1
          className="text-5xl leading-tight font-semibold text-foreground sm:text-6xl md:text-7xl"
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="show"
        >
          I&apos;m{" "}
          <motion.span
            className="text-foreground"
            variants={fadeUp(0.3)}
            initial="hidden"
            animate="show"
          >
            Rajesh
          </motion.span>
          ,
        </motion.h1>
        <motion.h2
          className="text-5xl leading-tight font-semibold sm:text-6xl md:text-7xl border border-primary px-3 bg-primary text-primary-foreground"
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="show"
        >
          Software Developer
        </motion.h2>
      </div>

      {/* ── Orange accent squiggle (bottom-left of headline) ── */}
      <motion.svg
        className="absolute top-[38%] left-[12%] h-20 w-16 text-primary"
        viewBox="0 0 64 80"
        fill="none"
        variants={fadeIn(0.5)}
        initial="hidden"
        animate="show"
      >
        <path
          d="M52 8 C20 12, 8 32, 20 52"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M36 16 C12 22, 4 44, 16 64"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* ── Main content row: quote | photo | stats ── */}
      <div className="relative z-10 mt-4 flex w-full max-w-6xl items-end justify-between">
        {/* LEFT — Testimonial quote */}
        <motion.div
          className="hidden max-w-[240px] flex-col gap-2 pb-24 md:flex"
          variants={slideLeft(0.5)}
          initial="hidden"
          animate="show"
        >
          <svg
            className="h-6 w-8 text-primary"
            viewBox="0 0 32 24"
            fill="currentColor"
          >
            <path d="M0 24V14.4C0 6.08 5.12 1.28 15.36 0l1.28 2.56C11.52 3.84 9.6 6.4 9.6 9.6H16V24H0zm16 0V14.4C16 6.08 21.12 1.28 31.36 0l1.28 2.56C27.52 3.84 25.6 6.4 25.6 9.6H32V24H16z" />
          </svg>
          <p className="text-sm leading-relaxed font-semibold text-muted-foreground">
            Rajesh&apos;s Exceptional product design ensure our website&apos;s
            success. <span className="font-bold">Highly Recommended</span>
          </p>
        </motion.div>

        {/* CENTER — Photo with orange semicircle backing */}
        {/* Outer div: entrance animation (scaleIn) */}
        <motion.div
          className="relative mx-auto mt-[-60px] flex shrink-0 flex-col items-center justify-end pointer-events-none select-none"
          variants={scaleIn(0.25)}
          initial="hidden"
          animate="show"
        >
          {/* Inner div: continuous float animation, separate from entrance */}
          <motion.div className="relative flex flex-col items-center justify-end">
            {/* Photo — replace src with your actual image */}
            <div className="relative z-10 h-[600px] w-[600px] pointer-events-none select-none">
              <Image
                src="/images/me.png" // ← replace with your photo path
                alt="Jenny, Product Designer"
                fill
                className="object-cover object-top pointer-events-none select-none"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — Stats */}
        <motion.div
          className="hidden flex-col items-end gap-1 pb-24 md:flex"
          variants={slideRight(0.5)}
          initial="hidden"
          animate="show"
        >
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className="h-6 w-6 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.55 + i * 0.07,
                  duration: 0.35,
                  ease: "backOut",
                }}
              >
                <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.09L12 18.27l-6.18 3.23L7 14.41 2 9.27l7.1-1.01L12 2z" />
              </motion.svg>
            ))}
          </div>

          <p className="mt-2 text-5xl leading-none font-black text-foreground">
            3 Years
          </p>
          <p className="text-base font-medium tracking-wide text-muted-foreground">
            Experience
          </p>
        </motion.div>
      </div>
    </section>
  )
}
