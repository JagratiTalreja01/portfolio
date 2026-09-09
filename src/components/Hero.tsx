import { useEffect, useRef, useState } from 'react'
import DataGlobe from './DataGlobe'
import { profile } from '../data/profile'
import { asset, srcSet } from '../lib/asset'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SPECIALTIES = profile.specialties

export default function Hero() {
  const [specialtyIdx, setSpecialtyIdx] = useState(0)
  const [fade, setFade] = useState(true)
  const reduced = useReducedMotion()
  const mouse = useRef({ x: 0, y: 0 })
  const [mouseState, setMouseState] = useState({ x: 0, y: 0 })

  // Rotate specialties
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setSpecialtyIdx((i) => (i + 1) % SPECIALTIES.length)
        setFade(true)
      }, 340)
    }, 2600)
    return () => clearInterval(id)
  }, [reduced])

  // Mouse parallax — throttled
  useEffect(() => {
    let ticking = false
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
      if (!ticking) {
        requestAnimationFrame(() => {
          setMouseState({ ...mouse.current })
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Scroll hint
  const [heroVisible, setHeroVisible] = useState(true)
  useEffect(() => {
    const onScroll = () => setHeroVisible(window.scrollY < 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-svh flex items-center overflow-hidden"
    >
      {/* ── Photo background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={asset('media/images/hero-geoweek.webp')}
          srcSet={srcSet('media/images/hero-geoweek')}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="h-full w-full object-cover object-[60%_22%]"
        />
        {/* Gradient: left reads dark; right is slightly lighter for the globe */}
        <div className="absolute inset-0 bg-gradient-to-r from-void/96 via-void/82 to-void/55" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* ── Globe: right column, behind text on mobile ───────────────────── */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden sm:block w-[55%]"
        aria-hidden="true"
      >
        <DataGlobe mouseX={mouseState.x} mouseY={mouseState.y} />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12 pt-28 pb-20">
        <div className="max-w-[34rem]">
          {/* Availability tag */}
          <p className="mb-8 inline-flex items-center gap-2.5 border border-signal/30 bg-signal/[0.07] px-3.5 py-2 font-mono text-[0.72rem] text-signal">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse" aria-hidden="true" />
            Open to new roles
          </p>

          {/* Name */}
          <h1 className="text-display font-semibold leading-[0.96] tracking-[-0.035em] text-paper">
            Dr. Jagrati<br />Talreja
          </h1>

          {/* Role */}
          <p className="mt-5 text-sub text-muted font-medium tracking-[-0.01em]">
            AI Research Scientist<span className="mx-2.5 text-graticule" aria-hidden="true">·</span>
            Machine Learning Engineer
          </p>

          {/* Rotating specialty */}
          <p
            className="mt-3 font-mono text-[0.85rem] text-signal"
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              style={{
                opacity: fade ? 1 : 0,
                transition: reduced ? 'none' : 'opacity 0.32s ease',
                display: 'inline-block',
              }}
            >
              {SPECIALTIES[specialtyIdx]}
            </span>
          </p>

          {/* Statement */}
          <p className="lede mt-8 max-w-[52ch]">
            {profile.statement}
          </p>

          {/* Availability note */}
          <p className="mt-4 font-mono text-[0.72rem] text-dim">
            {profile.availability}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#research"
              className="inline-flex items-center gap-2.5 bg-signal px-5 py-3 font-semibold text-[0.86rem] text-void transition-opacity hover:opacity-88"
            >
              Explore research
              <ArrowRight />
            </a>
            <a
              href="#publications"
              className="inline-flex items-center gap-2.5 border hairline px-5 py-3 font-semibold text-[0.86rem] text-paper hover:border-signal/60 hover:text-signal transition-colors"
            >
              Publications
            </a>
            <a
              href={asset(profile.documents.resume)}
              download
              className="inline-flex items-center gap-2.5 border hairline px-5 py-3 font-semibold text-[0.86rem] text-paper hover:border-signal/60 hover:text-signal transition-colors"
            >
              <DownloadIcon />
              Résumé
            </a>
          </div>

          {/* Social links */}
          <div className="mt-9 flex items-center gap-1" aria-label="Social and professional profiles">
            <SocialLink href={profile.links.github} label="GitHub profile">
              <GithubIcon />
            </SocialLink>
            <SocialLink href={profile.links.linkedin} label="LinkedIn profile">
              <LinkedinIcon />
            </SocialLink>
            <SocialLink href={`mailto:${profile.links.email}`} label="Send email">
              <MailIcon />
            </SocialLink>
            {profile.links.scholar && !profile.links.scholar.startsWith('[') && (
              <SocialLink href={profile.links.scholar} label="Google Scholar profile">
                <ScholarIcon />
              </SocialLink>
            )}
            {profile.links.orcid && !profile.links.orcid.startsWith('[') && (
              <SocialLink href={profile.links.orcid} label="ORCID profile">
                <OrcidIcon />
              </SocialLink>
            )}
          </div>
        </div>
      </div>

      {/* ── Scroll hint ───────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500"
        style={{ opacity: heroVisible ? 0.5 : 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[0.65rem] text-muted">scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-muted to-transparent" />
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="grid h-11 w-11 place-items-center text-muted hover:text-signal transition-colors"
    >
      {children}
    </a>
  )
}

/* Inline SVG icons ─────────────────────────────────────────────────────── */
const I = ({ children, vb = '0 0 24 24' }: { children: React.ReactNode; vb?: string }) => (
  <svg viewBox={vb} width="19" height="19" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const ArrowRight = () => <I><path d="M5 12h14M12 5l7 7-7 7" /></I>
const DownloadIcon = () => <I><path d="M12 3v10M7 9l5 5 5-5M3 17v2h18v-2" /></I>
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const MailIcon = () => <I><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></I>
const ScholarIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
)
const OrcidIcon = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.753 0 3.928-1.856 3.928-3.722 0-2.016-1.159-3.722-3.984-3.722h-2.241z" />
  </svg>
)
