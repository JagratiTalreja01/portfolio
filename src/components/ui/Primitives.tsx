import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { asset, srcSet } from '../../lib/asset'
import { useVisible } from '../../hooks/useInView'

/* ── Section shell ───────────────────────────────────────────────────────── */

export function Section({
  id,
  label,
  title,
  intro,
  children,
  bleed = false,
}: {
  id: string
  label: string
  title: string
  intro?: ReactNode
  children: ReactNode
  bleed?: boolean
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="relative scroll-mt-24">
      <div className={bleed ? '' : 'mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12'}>
        <div className="border-t hairline pt-8 sm:pt-10">
          <p className="meta mb-6">{label}</p>
          <h2
            id={`${id}-heading`}
            className="text-title font-semibold text-paper max-w-[22ch]"
          >
            {title}
          </h2>
          {intro ? (
            <div className="mt-5 max-w-measure text-[1.02rem] leading-relaxed text-muted">
              {intro}
            </div>
          ) : null}
        </div>
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}

/* ── Responsive image with reserved space (no layout shift) ─────────────── */

export function Img({
  src,
  alt,
  ratio = '4 / 3',
  className = '',
  imgClassName = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  position = 'center',
}: {
  src: string
  alt: string
  ratio?: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  position?: string
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      className={`relative overflow-hidden bg-hull ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={asset(src)}
        srcSet={srcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: position }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}

/* ── Looping muted video: pauses off-screen, skips on save-data ─────────── */

export function VideoLoop({
  src,
  poster,
  alt,
  ratio = '9 / 16',
  className = '',
}: {
  src: string
  poster: string
  alt: string
  ratio?: string
  className?: string
}) {
  const { ref, visible } = useVisible<HTMLDivElement>()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [allowVideo, setAllowVideo] = useState(true)

  useEffect(() => {
    // Respect Save-Data and slow connections: poster only.
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
    const c = nav.connection
    const slow = c?.saveData === true || /2g/.test(c?.effectiveType ?? '')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (slow || reduced) setAllowVideo(false)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !allowVideo) return
    if (visible) {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => undefined)
    } else {
      v.pause()
    }
  }, [visible, allowVideo])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-hull ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {allowVideo && visible ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={asset(poster)}
          aria-label={alt}
          className="h-full w-full object-cover"
        >
          <source src={asset(src)} type="video/mp4" />
        </video>
      ) : (
        <img
          src={asset(poster)}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}

/* ── Modal: focus trap, escape, scroll lock, restores focus ─────────────── */

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    panel?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain p-0 sm:p-6">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 h-full w-full cursor-default bg-void/88 backdrop-blur-sm"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative z-10 my-0 w-full max-w-4xl bg-hull ring-1 ring-graticule sm:my-8"
      >
        {children}
      </div>
    </div>
  )
}

/* ── Lightbox for the photo story ───────────────────────────────────────── */

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: { src: string; alt: string; caption: string }[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onIndex((index + delta + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, go])

  if (index === null) return null
  const item = items[index]

  return (
    <Modal open onClose={onClose} labelledBy="lightbox-caption">
      <div className="relative">
        <img
          src={asset(item.src)}
          srcSet={srcSet(item.src)}
          sizes="(max-width: 900px) 100vw, 900px"
          alt={item.alt}
          className="max-h-[72vh] w-full bg-void object-contain"
        />
        <div className="flex items-start justify-between gap-4 border-t hairline p-4 sm:p-5">
          <p id="lightbox-caption" className="max-w-prose text-sm leading-relaxed text-muted">
            {item.caption}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <span className="meta tnum mr-2">
              {index + 1}/{items.length}
            </span>
            <IconButton label="Previous image" onClick={() => go(-1)}>
              <path d="M15 5l-7 7 7 7" />
            </IconButton>
            <IconButton label="Next image" onClick={() => go(1)}>
              <path d="M9 5l7 7-7 7" />
            </IconButton>
            <IconButton label="Close gallery" onClick={onClose}>
              <path d="M6 6l12 12M18 6L6 18" />
            </IconButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center text-muted transition-colors hover:bg-shelf hover:text-signal"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  )
}

/* ── Small building blocks ──────────────────────────────────────────────── */

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border hairline px-2.5 py-1 font-mono text-[0.7rem] text-muted">
      {children}
    </span>
  )
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === 'published'
      ? 'text-signal border-signal/40 bg-signal/[0.07]'
      : status === 'accepted'
        ? 'text-gold border-gold/40 bg-gold/[0.07]'
        : 'text-muted border-graticule bg-shelf'
  const text =
    status === 'published' ? 'Published' : status === 'accepted' ? 'Accepted' : 'Under review'
  return (
    <span className={`border px-2 py-[3px] font-mono text-[0.68rem] ${tone}`}>{text}</span>
  )
}
