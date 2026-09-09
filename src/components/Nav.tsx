import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { asset } from '../lib/asset'
import { profile } from '../data/profile'

const NAV_ITEMS = [
  { id: 'about',        label: 'About' },
  { id: 'experience',   label: 'Experience' },
  { id: 'research',     label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'patents',      label: 'Patents' },
  { id: 'skills',       label: 'Skills' },
  { id: 'adventures',   label: 'Adventures' },
  { id: 'contact',      label: 'Contact' },
]

export default function Nav() {
  const active = useActiveSection(['hero', ...NAV_ITEMS.map((i) => i.id)])
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const linkClass = (id: string) =>
    `relative font-mono text-[0.73rem] tracking-[0.04em] transition-colors duration-200 ${
      active === id ? 'text-signal' : 'text-muted hover:text-paper'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/92 backdrop-blur-md border-b hairline'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        aria-label="Site navigation"
        className="mx-auto flex max-w-[84rem] items-center justify-between gap-4 px-5 py-3.5 sm:px-8"
      >
        {/* Wordmark */}
        <a
          href="#hero"
          className="shrink-0 font-semibold text-paper tracking-[-0.025em] text-[0.92rem]"
          aria-label="Back to top — Dr. Jagrati Talreja"
        >
          Dr. Jagrati Talreja
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)}>
                {item.label}
                {active === item.id && (
                  <span
                    className="absolute -bottom-[3px] left-0 right-0 h-px bg-signal"
                    aria-hidden="true"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA and mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={asset(profile.documents.resume)}
            download
            className="hidden sm:inline-flex items-center gap-2 border hairline px-3.5 py-2 font-mono text-[0.72rem] text-signal hover:bg-signal/10 transition-colors"
          >
            <DownloadIcon />
            Résumé
          </a>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden grid h-11 w-11 place-items-center text-muted hover:text-paper transition-colors"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen border-b hairline bg-abyss' : 'max-h-0'
        }`}
      >
        <ul className="px-5 py-4 space-y-1" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 ${linkClass(item.id)}`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-3 border-t hairline">
            <a
              href={asset(profile.documents.resume)}
              download
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-signal"
              onClick={() => setMenuOpen(false)}
            >
              <DownloadIcon />
              Download résumé
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2v8M4 8l4 4 4-4M2 13h12" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
