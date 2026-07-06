"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

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
    <section className="relative flex w-full min-h-svh sm:min-h-auto flex-col items-start overflow-hidden bg-cover bg-center px-4 pt-36 pb-36 sm:items-center sm:px-6 sm:pt-36 sm:pb-10">
      <div className="absolute bottom-40 z-50 hidden gap-2 rounded-full border border-muted/50 bg-background/60 p-2 shadow-md backdrop-blur-sm sm:flex">
        <Link href={"/resume"}>
          <Button
            variant={"ghost"}
            size={"lg"}
            className="transition-all duration-200 ease-in-out hover:scale-105"
          >
            Resume
          </Button>
        </Link>
        <Link href={"/contact"}>
          <Button size={"lg"} className="group/contact cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
            Contact Me{" "}
            <ArrowRight className="-rotate-45 transition-all duration-300 ease-in-out group-hover/contact:rotate-0" />
          </Button>
        </Link>
      </div>
      <Image
        src={"/images/bg-light.jpg"}
        fill
        alt=""
        sizes="(max-width: 2000px) 100vw, 33vw"
        className="pointer-events-none hidden object-cover select-none dark:block"
        loading="lazy"
      />
      <Image
        src={"/images/bg-dark.jpg"}
        fill
        alt=""
        sizes="(max-width: 2000px) 100vw, 33vw"
        className="pointer-events-none object-cover select-none dark:hidden"
        loading="lazy"
      />

      {/* ── Hello badge ── */}
      <motion.div
        className="relative mb-3 flex items-center gap-1 self-center sm:mb-4"
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="show"
      >
        <span className="rounded-full border border-primary bg-primary/10 px-4 py-1 text-xs font-medium tracking-wide text-primary shadow-sm sm:px-5 sm:py-1.5 sm:text-sm">
          Hello!
        </span>
        {/* Spark lines */}
        <Image
          src={"/images/icon.svg"}
          alt=""
          width={30}
          height={30}
          className="pointer-events-none absolute bottom-full left-full h-5 w-5 object-contain select-none sm:h-[30px] sm:w-[30px]"
        />
      </motion.div>

      {/* ── Headline ── */}
      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center text-center">
        <motion.h1
          className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
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
          className="mt-1 inline-block border border-primary bg-primary px-2.5 text-3xl leading-tight font-semibold text-primary-foreground sm:mt-0 sm:px-3 sm:text-4xl md:text-5xl lg:text-6xl"
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="show"
        >
          Software Developer
        </motion.h2>
      </div>

      {/* ── Mobile/tablet testimonial + stats overlay — visible from base through the sm range,
           handed off to the desktop quote/stats columns exactly at md so there's no gap ── */}
      <motion.div
        className="absolute bottom-20 left-6 z-20 mt-4 flex flex-col items-start gap-3 text-left md:hidden"
        variants={fadeUp(0.45)}
        initial="hidden"
        animate="show"
      >
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="h-3 w-3 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 5.14 1.18 7.09L12 18.27l-6.18 3.23L7 14.41 2 9.27l7.1-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="text-4xl leading-none font-black text-foreground sm:text-5xl">
          3+
        </p>
        <span className="text-sm font-medium tracking-wide text-muted-foreground">
          years experience
        </span>
        <p className="mt-2 max-w-[220px] text-xs leading-relaxed font-semibold text-muted-foreground sm:max-w-xs">
          Rajesh&apos;s Exceptional product design ensure our website&apos;s
          success. <span className="font-bold">Highly Recommended</span>
        </p>
        <div className="flex gap-2 rounded-full border border-muted/50 bg-background/60 p-2 shadow-md backdrop-blur-sm sm:hidden mt-4">
          <Link href={"/resume"}>
            <Button
              variant={"ghost"}
              className="transition-all duration-200 ease-in-out hover:scale-105"
            >
              Resume
            </Button>
          </Link>
          <Link href={"/contact"}>
            <Button className="group/contact cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
              Contact Me{" "}
              <ArrowRight className="-rotate-45 transition-all duration-300 ease-in-out group-hover/contact:rotate-0" />
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* ── Orange accent squiggle (bottom-left of headline) — hidden on small screens to avoid overlap ── */}
      <motion.svg
        className="absolute top-[38%] left-[12%] hidden h-20 w-16 text-primary sm:block"
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
      <div className="relative z-10 mt-4 flex w-full max-w-7xl flex-col items-end justify-between md:grid md:grid-cols-3 md:items-end md:gap-4">
        {/* LEFT — Testimonial quote */}
        <motion.div
          className="hidden max-w-[240px] flex-col gap-2 pb-24 md:flex md:justify-self-start"
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

        {/* CENTER — Photo */}
        <motion.div
          className="pointer-events-none relative mt-[-30px] mr-[-30%] flex shrink-0 flex-col items-center select-none md:mx-0 md:mt-[-45px] md:mr-0 md:justify-self-center"
          variants={scaleIn(0.25)}
          initial="hidden"
          animate="show"
        >
          <motion.div className="relative flex flex-col items-center">
            {/* Photo — replace src with your actual image */}
            <div className="pointer-events-none relative z-10 h-[min(90vw,500px)] w-[min(90vw,400px)] select-none md:h-[480px] md:w-[480px] lg:h-[600px] lg:w-[600px]">
              <Image
                src="/images/me-faded.png"
                alt="Rajesh, Product Designer"
                fill
                className="pointer-events-none object-contain object-top select-none"
                sizes="(max-width: 1440px) 70vw, 33vw"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — Stats */}
        <motion.div
          className="hidden flex-col items-end gap-1 pb-24 md:flex md:justify-self-end"
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
            3+
          </p>
          <p className="text-base font-medium tracking-wide text-muted-foreground">
            years experience
          </p>
        </motion.div>
      </div>
    </section>
  )
}
