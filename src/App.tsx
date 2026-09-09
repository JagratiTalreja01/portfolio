import { Component, type ReactNode } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Research from './components/Research'
import Publications from './components/Publications'
import {
  Patents,
  Skills,
  Repos,
  Adventures,
  Contact,
} from './components/Sections'

/* ── Error boundary ──────────────────────────────────────────────────────── */
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { error: Error | null }
> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="p-8 text-center font-mono text-[0.8rem] text-muted">
            Something went wrong in this section.{' '}
            <button
              onClick={() => this.setState({ error: null })}
              className="text-signal hover:text-paper"
            >
              Reload
            </button>
          </div>
        )
      )
    }
    return this.props.children
  }
}

/* ── Spacer between sections ─────────────────────────────────────────────── */
function Gap() {
  return <div className="h-20 sm:h-28 lg:h-36" aria-hidden="true" />
}

/* ── App ─────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      {/* Skip link — accessible keyboard shortcut to bypass nav */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-signal focus:text-void focus:px-4 focus:py-2 focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Sticky navigation */}
      <Nav />

      {/* Hero: full-bleed, no outer padding */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* Main content — sections are spaced by Gap */}
      <main id="main-content">
        <Gap />
        <ErrorBoundary>
          <About />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Experience />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Research />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Publications />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Patents />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Skills />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Repos />
        </ErrorBoundary>

        <Gap />
        <ErrorBoundary>
          <Adventures />
        </ErrorBoundary>
      </main>

      <Gap />

      {/* Contact / footer */}
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    </>
  )
}
