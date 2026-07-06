"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
})

// ─── Data ─────────────────────────────────────────────────────────────────────

type Service = {
  title: string
  image: string
}

const services: Service[] = [
  { title: "UI/ UX Design", image: "/images/services/ui-ux.webp" },
  { title: "Web Design", image: "/images/services/web.png" },
  { title: "Graphic Design", image: "/images/services/graphic.png" },
  { title: "Mobile App", image: "/images/services/mobile-app.png" },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.children[i] as HTMLElement | undefined
    if (card) {
      el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" })
    }
    setActive(i)
  }

  const handleScroll = () => {
    const el = scrollerRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    let closest = 0
    let min = Infinity
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - el.offsetLeft - el.scrollLeft)
      if (dist < min) {
        min = dist
        closest = i
      }
    })
    setActive(closest)
  }

  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-10 rounded-[40px] md:rounded-[60px] mt-[-60px]">
      {/* ── Texture overlay (swap for your real background image/photo) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background:repeating-linear-gradient(115deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_64px)]"
      />

      {/* ── Decorative blurred blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -top-10 h-72 w-72 rounded-full bg-linear-to-br from-primary via-primary/80 to-transparent opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[26%] top-6 hidden h-40 w-40 rounded-full bg-linear-to-br from-orange-300 to-transparent opacity-30 blur-2xl md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-linear-to-tl from-orange-500 via-red-500 to-transparent opacity-40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.h2
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-bold text-foreground sm:text-5xl"
          >
            What <span className="text-primary">I Offer</span>
          </motion.h2>
          <motion.p
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Delivering thoughtful digital solutions through the perfect blend of technology, design, and creativity.
          </motion.p>
        </div>

        {/* ── Cards (scroll-snap carousel — works on every breakpoint) ── */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp(0.15 + i * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group relative min-w-[85%] shrink-0 snap-center rounded-[28px] border border-border/50 bg-background/30 backdrop-blur-sm p-6 sm:min-w-[60%] sm:p-8 lg:min-w-[calc(33.333%-1rem)]"
            >
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                {service.title}
              </h3>
              <div className="mt-5 h-px w-full bg-foreground/10" />

              <div className="relative mt-8 h-[280px] sm:h-[320px] lg:h-[340px]">
                {/* stacked "paper" layers behind the screenshot */}
                <div className="absolute inset-x-6 top-4 h-full rounded-2xl bg-foreground/6" />
                <div className="absolute inset-x-3 top-2 h-full rounded-2xl bg-foreground/9" />

                {/* screenshot */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl bg-foreground shadow-2xl">
                  <Image
                    src={service.image}
                    alt={`${service.title} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 80vw, 30vw"
                  />
                </div>

                {/* arrow button, overlapping the bottom-right corner */}
                <button
                  type="button"
                  aria-label={`View ${service.title} projects`}
                  className="absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-background text-foreground shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary"
                >
                  <ArrowUpRight className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Pagination dots ── */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-primary" : "w-2 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}