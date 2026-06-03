"use client"

import { useState, type FormEvent } from 'react'
import type { Locale, Messages } from '../lib/i18n'
import {
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  X,
} from 'lucide-react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'

type Practice = {
  title: string
  label: string
  description: string
  background: string
}

type Package = {
  title: string
  price: string
  timing: string
  description: string
  ideal: string
  cta: string
}

type CaseStudy = {
  title: string
  meta: string
  challenge: string
  work: string
  outcome: string
  attribution: string
  background: string
}
type StudioPageProps = {
  locale: Locale
  messages: Messages
}

const practiceBackgrounds = [
  'radial-gradient(circle at 28% 18%, #f8f6f0 0%, #8f8c84 26%, #111 68%), linear-gradient(135deg, #0b0b0b, #f6f4ef)',
  'linear-gradient(130deg, #0b0b0b 0%, #494741 43%, #f8f6f0 100%)',
  'radial-gradient(circle at 72% 22%, #ffffff 0%, #aaa69d 24%, #0b0b0b 78%)',
]

const caseBackgrounds = [
  'radial-gradient(circle at 30% 20%, #f7f5ef 0%, #d8d5cd 30%, #111 72%)',
  'linear-gradient(135deg, #0b0b0b 0%, #4b4b4b 45%, #eeeeea 100%)',
]

const fadeUp: Variants = {
  hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const slowReveal: Variants = {
  hidden: { opacity: 1, y: '0%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.92, ease: [0.22, 1, 0.36, 1] },
  },
}

function Header({ locale, messages }: StudioPageProps) {
  const [open, setOpen] = useState(false)
  const englishHref = '/'
  const frenchHref = '/fr/'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f6f4ef]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label={messages.nav.homeLabel}>
          <img
            src="/jf-studio-logo-full.png"
            alt="J&F Studio"
            className="h-24 w-auto object-contain mix-blend-multiply transition duration-300 group-hover:scale-105"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-600 lg:flex" aria-label="Main navigation">
          {messages.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 transition hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="inline-flex overflow-hidden rounded-full border border-black/15 text-xs font-semibold">
            <a
              href={englishHref}
              className={`px-3 py-2 transition ${locale === 'en' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'}`}
              aria-current={locale === 'en' ? 'page' : undefined}
            >
              {messages.nav.languages.en}
            </a>
            <a
              href={frenchHref}
              className={`px-3 py-2 transition ${locale === 'fr' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'}`}
              aria-current={locale === 'fr' ? 'page' : undefined}
            >
              {messages.nav.languages.fr}
            </a>
          </div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-black transition hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            {messages.nav.cta}
            <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black lg:hidden"
          aria-label={open ? messages.nav.closeMenu : messages.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-black/10 bg-[#f6f4ef] px-5 py-5 lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-4" aria-label="Mobile navigation">
            {messages.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-black/10 py-3 text-lg text-black"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-4 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {messages.nav.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <div className="mt-2 inline-flex w-fit overflow-hidden rounded-full border border-black/15 text-xs font-semibold">
              <a href={englishHref} className={`px-4 py-2 ${locale === 'en' ? 'bg-black text-white' : 'text-zinc-500'}`}>
                {messages.nav.languages.en}
              </a>
              <a href={frenchHref} className={`px-4 py-2 ${locale === 'fr' ? 'bg-black text-white' : 'text-zinc-500'}`}>
                {messages.nav.languages.fr}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p
      className={`mb-5 text-xs font-semibold uppercase tracking-[0.34em] ${
        dark ? 'text-white/45' : 'text-zinc-500'
      }`}
    >
      {children}
    </p>
  )
}

function AnimatedGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-multiply"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 20%, #000 0 1px, transparent 1px), radial-gradient(circle at 80% 0%, #000 0 1px, transparent 1px)',
        backgroundSize: '22px 22px, 18px 18px',
      }}
    />
  )
}

function HeroVisual({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 90, damping: 22 })
  const springY = useSpring(pointerY, { stiffness: 90, damping: 22 })

  return (
    <motion.div
      initial={{ opacity: 1, y: 0, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(event) => {
        if (reduceMotion) return
        const bounds = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - bounds.left - bounds.width / 2) / 18)
        pointerY.set((event.clientY - bounds.top - bounds.height / 2) / 18)
      }}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      className="relative min-h-[34rem] lg:min-h-[36rem]"
      aria-label="Animated monochrome editorial collage"
    >
      <motion.div
        style={{ x: useTransform(springX, (value) => value * -0.65), y: useTransform(springY, (value) => value * -0.65) }}
        className="absolute right-0 -top-4 h-52 w-[62%] overflow-hidden rounded-[1.45rem] border border-black bg-black p-5 text-white shadow-2xl shadow-black/15"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/45">
          {messages.hero.visualCards[0].label}
        </p>
        <p className="mt-5 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.045em]">
          {messages.hero.visualCards[0].text}
        </p>
      </motion.div>
      <motion.div
        style={{ x: useTransform(springX, (value) => value * 0.8), y: useTransform(springY, (value) => value * 0.45) }}
        className="absolute left-0 top-28 h-48 w-[46%] overflow-hidden rounded-[1.25rem] border border-black bg-black p-5 text-white shadow-xl shadow-black/15"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/45">{messages.hero.visualCards[1].label}</p>
        <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.045em]">
          {messages.hero.visualCards[1].text}
        </p>
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-20 w-64 rounded-[1.25rem] border border-black bg-black p-5 text-white shadow-xl shadow-black/15"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/45">{messages.hero.visualCards[2].label}</p>
        <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.045em]">
          {messages.hero.visualCards[2].text}
        </p>
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 10, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-4 hidden w-52 rounded-[1.15rem] border border-black bg-black p-5 text-white shadow-2xl shadow-black/15 sm:block"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-white/45">{messages.hero.visualCards[3].label}</p>
        <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-0.045em]">
          {messages.hero.visualCards[3].text}
        </p>
      </motion.div>
    </motion.div>
  )
}

function Hero({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.28], reduceMotion ? [0, 0] : [0, 110])
  const scale = useTransform(scrollYProgress, [0, 0.28], reduceMotion ? [1, 1] : [1, 1.1])

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#f6f4ef] pt-32">
      <AnimatedGrain />
      <motion.div style={{ y, scale }} className="absolute inset-0 opacity-80">
        <motion.div
          animate={reduceMotion ? undefined : { rotate: [0, 6, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-24 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full border border-black/10"
        />
        <div className="absolute right-[-12%] top-20 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,#0b0b0b_0%,#6f6f6b_32%,transparent_67%)] opacity-20 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <h1 className="max-w-4xl overflow-hidden pb-1 text-4xl font-semibold leading-none tracking-[-0.07em] text-black sm:text-6xl lg:text-7xl">
            <motion.span variants={slowReveal} className="block">
              {messages.hero.headline}
            </motion.span>
          </h1>
          <h2 className="mt-4 max-w-4xl overflow-hidden text-3xl font-semibold leading-[0.98] tracking-[-0.065em] text-zinc-500 sm:text-5xl lg:text-[3.45rem]">
            <motion.span variants={slowReveal} className="block">
              {messages.hero.subheadline}
            </motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="relative mt-7 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-4xl"
          >
            {messages.hero.tagline}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 block h-px w-48 origin-left bg-black"
            />
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            {messages.hero.body}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
            {messages.hero.bodySecondary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#who-we-are"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-black/15 px-7 py-4 text-sm font-semibold text-black transition hover:border-black hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {messages.hero.primaryCta}
              <ChevronRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {messages.hero.secondaryCta}
              <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <HeroVisual messages={messages} />
      </div>
    </section>
  )
}

function WhoWeAre({ messages }: { messages: Messages }) {
  return (
    <section id="who-we-are" className="relative border-y border-black/10 bg-[#fbfaf7] py-20 sm:py-24">
      <AnimatedGrain />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <Eyebrow>{messages.who.eyebrow}</Eyebrow>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-black sm:text-5xl lg:text-6xl">
            {messages.who.headline}
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid content-start gap-8"
        >
          <motion.p variants={fadeUp} className="text-xl leading-8 tracking-[-0.025em] text-zinc-700 sm:text-2xl">
            {messages.who.body}
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg leading-8 text-zinc-600">
            {messages.who.bodySecondary}
          </motion.p>
          <motion.div variants={fadeUp} className="grid gap-4 border-t border-black/10 pt-8 sm:grid-cols-3">
            {messages.who.principles.map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6, rotate: index === 1 ? 1.2 : -1.2 }}
                className="rounded-[1.1rem] border border-black/10 bg-[#f6f4ef] p-5 shadow-sm"
              >
                <p className="text-5xl font-semibold tracking-[-0.08em] text-zinc-200">0{index + 1}</p>
                <p className="mt-5 font-semibold text-black">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FounderNote({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="founder" className="relative overflow-hidden bg-[#f6f4ef] py-20 sm:py-24">
      <AnimatedGrain />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.36fr_0.64fr]">
        <motion.div
          initial={{ opacity: 1, x: 0, rotate: 0 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid min-h-[18rem] place-items-center overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#fbfaf7] p-6 shadow-xl shadow-black/5 sm:min-h-[22rem] sm:p-8"
        >
          <div className="pointer-events-none absolute inset-4 rounded-[1.15rem] border border-black/[0.04]" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-48 w-48 rounded-full border border-black/[0.06]" />
          <div className="pointer-events-none absolute bottom-8 left-8 h-px w-20 bg-black/10" />
          <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
            <Eyebrow>{messages.founder.panelTitle}</Eyebrow>
          </div>
          <div className="relative mx-auto grid max-w-xs justify-items-center gap-5 text-center">
            <p className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-black">
              {messages.founder.panelNote}
            </p>
            <span className="h-px w-28 bg-black/15" aria-hidden="true" />
          </div>
          <motion.div
            animate={reduceMotion ? undefined : { rotate: [-2, 2, -2], y: [0, -4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-6 top-6 grid h-20 w-20 place-items-center rounded-full border border-black/15 text-center text-[0.62rem] font-semibold uppercase leading-4 tracking-[0.18em] text-zinc-500"
          >
            {messages.founder.stamp}
          </motion.div>
        </motion.div>
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative overflow-hidden rounded-[1.6rem] border border-black/10 bg-[#fbfaf7] p-6 shadow-2xl shadow-black/5 sm:p-10 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[1.5rem] border-b border-l border-black/10 bg-[#f0eee8]" />
          <motion.div variants={fadeUp} className="absolute right-6 top-6 text-zinc-200">
            <Quote size={54} aria-hidden="true" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Eyebrow>{messages.founder.eyebrow}</Eyebrow>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-black sm:text-5xl">
              {messages.founder.greeting}
            </h2>
          </motion.div>
          <motion.div variants={stagger} className="mt-7 grid gap-5 text-base leading-8 text-zinc-600 sm:text-lg">
            {messages.founder.paragraphs.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeUp}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-serif text-2xl italic tracking-[-0.04em] text-black">{messages.founder.signature}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500">
                {messages.founder.role}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
              {messages.founder.credentials.map((credential) => (
                <span key={credential} className="border border-black/10 px-3 py-2">
                  {credential}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  )
}

function HowCanWeHelp({ messages }: { messages: Messages }) {
  const [active, setActive] = useState(0)
  const practices: Practice[] = messages.help.items.map((item, index) => ({
    ...item,
    background: practiceBackgrounds[index] ?? practiceBackgrounds[0],
  }))

  return (
    <section id="how-we-help" className="overflow-hidden border-y border-black/10 bg-[#fbfaf7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-14 max-w-4xl"
        >
          <Eyebrow>{messages.help.eyebrow}</Eyebrow>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-black sm:text-6xl">
            {messages.help.headlineLineOne}
            <span className="block">{messages.help.headlineLineTwo}</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
            {practices.map((practice, index) => (
              <motion.button
                layout
                key={practice.title}
                type="button"
                className={`group grid w-full gap-4 rounded-[1.35rem] border p-5 text-left shadow-sm transition sm:grid-cols-[8rem_1fr_auto] sm:p-6 ${
                  active === index
                    ? 'border-black/25 bg-[#f6f4ef] shadow-xl shadow-black/5'
                    : 'border-black/10 bg-white/45 hover:bg-[#f6f4ef]'
                }`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 170, damping: 22 }}
              >
                <span className="self-start rounded-full border border-black/10 bg-white/55 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  {practice.label}
                </span>
                <span>
                  <span className="relative block text-2xl font-semibold tracking-[-0.055em] text-black sm:text-4xl">
                    {practice.title}
                    {active === index && (
                      <motion.span
                        layoutId="practiceUnderline"
                        className="absolute -bottom-2 left-0 h-px w-28 bg-black"
                      />
                    )}
                  </span>
                  <span className="mt-5 block max-w-2xl text-base leading-7 text-zinc-600">
                    {practice.description}
                  </span>
                </span>
                <span className="self-center rounded-full border border-black/10 bg-white/60 p-3 transition group-hover:rotate-[-8deg] group-hover:bg-black group-hover:text-white">
                  <ArrowRight size={18} aria-hidden="true" />
                </span>
              </motion.button>
            ))}
        </div>
      </div>
    </section>
  )
}

function VisualInterlude({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white sm:py-28">
      <div className="absolute inset-0 opacity-50">
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.18, 1], x: [0, 40, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[-10%] top-[-20%] h-[32rem] w-[32rem] rounded-full bg-white/20 blur-3xl"
        />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[42rem] bg-[radial-gradient(circle_at_50%_50%,#f5f1e8_0%,#4c4a45_28%,transparent_72%)] opacity-45 blur-2xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
          <Eyebrow dark>{messages.interlude.eyebrow}</Eyebrow>
          <p className="max-w-sm text-sm leading-7 text-white/55">
            {messages.interlude.headline}
          </p>
        </motion.div>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-3xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl"
        >
          {messages.interlude.body}
        </motion.h2>
      </div>
    </section>
  )
}

function Services({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()
  const packages: Package[] = messages.services.packages

  return (
    <section id="services" className="relative bg-[#f6f4ef] py-20 sm:py-24">
      <AnimatedGrain />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]"
        >
          <div>
            <Eyebrow>{messages.services.eyebrow}</Eyebrow>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-black sm:text-6xl">
              {messages.services.headline}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-zinc-600 lg:pt-10 sm:text-lg">
            {messages.services.body}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              whileHover={{ y: -10, rotateX: 1.5, rotateY: index === 1 ? 0 : index === 0 ? -1.2 : 1.2 }}
              transition={{ type: 'spring', stiffness: 170, damping: 20 }}
              className={`group relative flex min-h-full flex-col overflow-hidden rounded-[1.45rem] border border-black/10 bg-[#fbfaf7] p-7 shadow-sm transition hover:border-black/35 hover:shadow-2xl hover:shadow-black/10 ${
                index === 1 ? 'lg:mt-10' : ''
              }`}
            >
              <motion.div
                aria-hidden="true"
                className="absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full border border-black/10 bg-[#f0eee8]"
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
                transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="flex items-start justify-between gap-6">
                <p className="text-6xl font-semibold tracking-[-0.08em] text-zinc-200">0{index + 1}</p>
                <span className="relative rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {item.timing}
                </span>
              </div>
              <h3 className="mt-10 text-3xl font-semibold leading-tight tracking-[-0.055em] text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {item.price}
              </p>
              <p className="mt-6 text-base leading-7 text-zinc-600">{item.description}</p>
              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  {messages.services.idealLabel}
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{item.ideal}</p>
              </div>
              <a
                href="#contact"
                className="group/cta mt-auto inline-flex items-center justify-between border-t border-black/10 pt-7 text-sm font-semibold text-black"
              >
                {item.cta}
                <ArrowRight size={17} className="transition group-hover/cta:translate-x-1" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mt-10 border border-black/10 bg-[#fbfaf7] p-5 text-sm leading-7 text-zinc-600"
        >
          {messages.services.note}
        </motion.p>
      </div>
    </section>
  )
}

function CaseStudies({ messages }: { messages: Messages }) {
  const reduceMotion = useReducedMotion()
  const caseStudies: CaseStudy[] = messages.cases.items.map((item, index) => ({
    ...item,
    background: caseBackgrounds[index] ?? caseBackgrounds[0],
  }))

  return (
    <section id="work" className="border-y border-black/10 bg-[#fbfaf7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-4xl"
        >
          <Eyebrow>{messages.cases.eyebrow}</Eyebrow>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-black sm:text-6xl">
            {messages.cases.headline}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-10">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              initial={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="grid overflow-hidden rounded-[1.55rem] border border-black/10 bg-[#f6f4ef] shadow-sm lg:grid-cols-[0.92fr_1.08fr]"
            >
              <div
                className={`relative min-h-[26rem] overflow-hidden bg-black ${
                  index === 1 ? 'lg:order-2' : ''
                }`}
              >
                {index <= 1 ? (
                  <div className="absolute inset-0 bg-black" />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                    style={{ background: study.background }}
                  />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:36px_100%]" />
                {index <= 1 && (
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                      {messages.cases.items[index].kicker}
                    </p>
                    <h3 className="max-w-lg text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl">
                      {study.title}
                    </h3>
                  </div>
                )}
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute bottom-8 left-8 w-44 rounded-[1rem] border border-white/25 bg-white/10 p-4 text-white backdrop-blur-sm ${
                    index <= 1 ? 'hidden sm:block' : ''
                  }`}
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.25em] text-white/50">
                    {messages.cases.eyebrow}
                  </p>
                  <p className="mt-8 text-lg font-semibold leading-tight">
                    {messages.cases.labels.challenge} / {messages.cases.labels.work} / {messages.cases.labels.outcome}
                  </p>
                </motion.div>
                <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/65">
                  <span>Case Study</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <div className="p-6 sm:p-9 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-zinc-500">
                  {study.meta}
                </p>
                {index > 1 && (
                  <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.055em] text-black sm:text-5xl">
                    {study.title}
                  </h3>
                )}
                <div className="mt-10 grid gap-6">
                  {[
                    [messages.cases.labels.challenge, study.challenge],
                    [messages.cases.labels.work, study.work],
                    [messages.cases.labels.outcome, study.outcome],
                  ].map(([label, copy]) => (
                    <div key={label} className="grid gap-3 border-t border-black/10 pt-5 sm:grid-cols-[8rem_1fr]">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                        {label}
                      </p>
                      <p className="text-base leading-7 text-zinc-600">{copy}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 border-l border-black/20 pl-5 text-sm leading-6 text-zinc-500">
                  {study.attribution}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SelectField({
  label,
  name,
  options,
  placeholder,
}: {
  label: string
  name: string
  options: string[]
  placeholder: string
}) {
  return (
    <label className="grid gap-2 text-sm text-white/65">
      {label}
      <select
        required
        name={name}
        className="rounded-[0.9rem] border border-white/15 bg-black px-4 py-4 text-white outline-none transition hover:border-white/35 focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

function Contact({ messages }: { messages: Messages }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative bg-black py-20 text-white sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow dark>{messages.contact.eyebrow}</Eyebrow>
            <h2 className="text-5xl font-semibold leading-[0.96] tracking-[-0.075em] sm:text-7xl">
              {messages.contact.headline}
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-8 max-w-xl text-lg leading-8 text-white/60">
            {messages.contact.body}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-7 text-white/50">
            {messages.contact.bodySecondary}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 rounded-[1.35rem] border border-white/15 bg-white/[0.03] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
              {messages.contact.sidebarTitle}
            </p>
            <p className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em]">
              {messages.contact.sidebarBody}
            </p>
            <a
              href="mailto:info@jelifolks.studio?subject=J%26F%20Studio%20Appointment"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {messages.contact.appointmentCta}
              <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.aside>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-white/15 bg-white/[0.03] p-5 shadow-2xl shadow-white/5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.label variants={fadeUp} className="grid gap-2 text-sm text-white/65">
              {messages.contact.fields.firstName}
              <input
                required
                name="firstName"
                className="rounded-[0.9rem] border border-white/15 bg-black px-4 py-4 text-white outline-none transition placeholder:text-white/25 hover:border-white/35 focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                placeholder={messages.contact.fields.firstName}
              />
            </motion.label>
            <motion.label variants={fadeUp} className="grid gap-2 text-sm text-white/65">
              {messages.contact.fields.lastName}
              <input
                required
                name="lastName"
                className="rounded-[0.9rem] border border-white/15 bg-black px-4 py-4 text-white outline-none transition placeholder:text-white/25 hover:border-white/35 focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                placeholder={messages.contact.fields.lastName}
              />
            </motion.label>
            <motion.label variants={fadeUp} className="grid gap-2 text-sm text-white/65">
              {messages.contact.fields.email}
              <input
                required
                type="email"
                name="email"
                className="rounded-[0.9rem] border border-white/15 bg-black px-4 py-4 text-white outline-none transition placeholder:text-white/25 hover:border-white/35 focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                placeholder="you@example.com"
              />
            </motion.label>
            <motion.label variants={fadeUp} className="grid gap-2 text-sm text-white/65">
              {messages.contact.fields.organization}
              <input
                required
                name="organization"
                className="rounded-[0.9rem] border border-white/15 bg-black px-4 py-4 text-white outline-none transition placeholder:text-white/25 hover:border-white/35 focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                placeholder={messages.contact.fields.organization}
              />
            </motion.label>
          </div>

          <motion.div variants={fadeUp} className="mt-5 grid gap-5">
            <SelectField
              label={messages.contact.fields.engagement}
              name="engagement"
              options={messages.contact.options.engagement}
              placeholder={messages.contact.selectPlaceholder}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label={messages.contact.fields.timeline}
                name="timeline"
                options={messages.contact.options.timeline}
                placeholder={messages.contact.selectPlaceholder}
              />
              <SelectField
                label={messages.contact.fields.budget}
                name="budget"
                options={messages.contact.options.budget}
                placeholder={messages.contact.selectPlaceholder}
              />
            </div>
            <label className="grid gap-2 text-sm text-white/65">
              {messages.contact.fields.project}
              <textarea
                required
                name="message"
                rows={6}
                className="resize-none rounded-[0.9rem] border border-white/15 bg-black px-4 py-4 text-white outline-none transition placeholder:text-white/25 hover:border-white/35 focus:border-white focus:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
                placeholder={messages.contact.fields.project}
              />
            </label>
          </motion.div>

          <motion.button
            variants={fadeUp}
            type="submit"
            className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {messages.contact.submit}
            <MessageCircle size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </motion.button>
          {sent && (
            <p className="mt-5 border border-white/15 bg-white/[0.04] p-4 text-sm leading-6 text-white/70" role="status">
              {messages.contact.success}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

function Footer({ messages }: { messages: Messages }) {
  return (
    <footer className="bg-black px-5 pb-10 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/15 pt-8 text-sm text-white/50 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-semibold uppercase tracking-[0.28em] text-white">J&F Studio</p>
          <p className="mt-4 max-w-xl leading-7">
            {messages.footer.description}
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.24em] text-white/70">{messages.footer.locationsLabel}</p>
          <div className="mt-4 grid gap-3">
            {messages.footer.locations.map((location) => (
              <p key={location} className="flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" />
                {location}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.24em] text-white/70">{messages.footer.contactLabel}</p>
          <div className="mt-4 grid gap-3">
            <a href="mailto:info@jelifolks.studio" className="flex items-center gap-2 transition hover:text-white">
              <Mail size={14} aria-hidden="true" />
              {messages.footer.email}
            </a>
            <a href="tel:+15144471696" className="flex items-center gap-2 transition hover:text-white">
              <Phone size={14} aria-hidden="true" />
              {messages.footer.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function StudioPage({ locale, messages }: StudioPageProps) {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-black">
      <Header locale={locale} messages={messages} />
      <Hero messages={messages} />
      <WhoWeAre messages={messages} />
      <FounderNote messages={messages} />
      <HowCanWeHelp messages={messages} />
      <VisualInterlude messages={messages} />
      <Services messages={messages} />
      <CaseStudies messages={messages} />
      <Contact messages={messages} />
      <Footer messages={messages} />
    </main>
  )
}

export default StudioPage
