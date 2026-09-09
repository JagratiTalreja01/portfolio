import { useState } from 'react'
import { Section, Tag, Modal } from './ui/Primitives'
import { projects, type Project } from '../data/projects'
import { useInView } from '../hooks/useInView'
import { asset } from '../lib/asset'

export default function Research() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <Section
      id="research"
      label="Projects"
      title="Six systems. Real data. Verified numbers."
      intro="Every project has an open repository, a publication or filing, and a number that comes from an experiment — not a benchmark estimated at announcement time."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
        ))}
      </div>

      {active && (
        <CaseStudyModal project={active} onClose={() => setActive(null)} />
      )}
    </Section>
  )
}

/* ── Card ────────────────────────────────────────────────────────────────── */
function ProjectCard({
  project: p,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const accentColor = { signal: '#3FE0FF', cobalt: '#3D6DFF', violet: '#8A6CFF' }[p.accent]

  const firstFig = p.figures[0]

  return (
    <div
      ref={ref}
      className="group flex flex-col border hairline bg-hull transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(12px)',
      }}
    >
      {/* Figure or accent block */}
      {firstFig ? (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
          <img
            src={asset(firstFig.src.replace('.png', '-900.webp').replace('.PNG', '-900.webp'))}
            alt={firstFig.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain bg-abyss transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1"
            style={{ background: accentColor, opacity: 0.8 }}
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center h-32"
          style={{
            background: `linear-gradient(135deg, rgba(11,18,32,1) 0%, ${accentColor}18 100%)`,
          }}
          aria-hidden="true"
        >
          <GlobeIcon color={accentColor} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="meta mb-2">{p.kicker}</p>
        <h3 className="text-[1.04rem] font-semibold text-paper leading-snug">{p.name}</h3>
        <p className="mt-3 text-[0.86rem] leading-relaxed text-muted flex-1">{p.proposition}</p>

        {/* Key metrics */}
        {p.metrics.slice(0, 2).map((m) => (
          <div key={m.label} className="mt-4 border-t hairline pt-4 flex items-baseline gap-2">
            <span className="tnum font-semibold text-[1.15rem] text-paper">{m.value}</span>
            <span className="text-[0.76rem] text-muted leading-tight">{m.label}</span>
          </div>
        ))}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {p.stack.length > 4 && (
            <Tag>+{p.stack.length - 4}</Tag>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {p.paper && (
              <a
                href={p.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.71rem] text-signal hover:text-paper transition-colors link-swath"
                onClick={(e) => e.stopPropagation()}
              >
                {p.paperLabel ?? 'Paper'}
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.71rem] text-muted hover:text-paper transition-colors link-swath"
                onClick={(e) => e.stopPropagation()}
              >
                Code
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="font-mono text-[0.71rem] text-muted hover:text-signal transition-colors"
            aria-label={`Open case study for ${p.name}`}
          >
            Case study →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Modal case study ────────────────────────────────────────────────────── */
function CaseStudyModal({
  project: p,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [figIdx, setFigIdx] = useState(0)

  return (
    <Modal open onClose={onClose} labelledBy={`cs-${p.id}-title`}>
      {/* Header */}
      <div className="border-b hairline flex items-start justify-between gap-4 p-5 sm:p-7">
        <div>
          <p className="meta mb-1">{p.kicker}</p>
          <h2 id={`cs-${p.id}-title`} className="text-[1.3rem] font-semibold text-paper leading-tight">
            {p.name}
          </h2>
          <p className="mt-1 font-mono text-[0.72rem] text-dim">{p.status}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="shrink-0 grid h-11 w-11 place-items-center text-muted hover:text-signal transition-colors"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto max-h-[75vh] p-5 sm:p-7 space-y-7">
        {/* Figures carousel */}
        {p.figures.length > 0 && (
          <div>
            <div className="relative overflow-hidden bg-abyss ring-1 ring-graticule" style={{ aspectRatio: '16/9' }}>
              <img
                key={figIdx}
                src={asset(p.figures[figIdx].src.replace(/\.(png|PNG)$/, '-900.webp'))}
                alt={p.figures[figIdx].alt}
                className="h-full w-full object-contain"
              />
            </div>
            {p.figures.length > 1 && (
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                {p.figures.map((_f, i) => (
                  <button
                    key={i}
                    onClick={() => setFigIdx(i)}
                    className={`border text-[0.7rem] font-mono px-2 py-1 transition-colors ${
                      i === figIdx ? 'border-signal text-signal bg-signal/10' : 'border-graticule text-dim hover:text-paper'
                    }`}
                    aria-label={`Show figure ${i + 1}`}
                    aria-pressed={i === figIdx}
                  >
                    Fig {i + 1}
                  </button>
                ))}
              </div>
            )}
            <p className="mt-2 text-[0.78rem] text-dim leading-snug">
              {p.figures[figIdx].caption}
            </p>
          </div>
        )}

        {/* One-liner */}
        <p className="lede">{p.proposition}</p>

        {/* Sections */}
        <CsSection title="Problem">
          <p>{p.problem}</p>
        </CsSection>
        <CsSection title="Why it matters">
          <p>{p.stakes}</p>
        </CsSection>
        <CsSection title="My role">
          <p>{p.role}</p>
        </CsSection>
        <CsSection title="Data">
          <p>{p.data}</p>
        </CsSection>
        <CsSection title="Methodology">
          <ul className="space-y-2">
            {p.method.map((m) => (
              <li key={m} className="flex gap-3">
                <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-signal/60" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
        </CsSection>
        <CsSection title="Engineering notes">
          <p>{p.engineering}</p>
        </CsSection>
        <CsSection title="Experiments">
          <p>{p.experiment}</p>
        </CsSection>

        {/* Metrics */}
        <div>
          <h3 className="text-[0.78rem] font-semibold text-paper uppercase tracking-[0.08em] mb-4">Results</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="border hairline bg-abyss p-4">
                <p className="tnum text-[1.5rem] font-semibold text-signal leading-none">{m.value}</p>
                <p className="mt-1 text-[0.76rem] text-muted leading-tight">{m.label}</p>
                {m.note && <p className="meta mt-0.5">{m.note}</p>}
              </div>
            ))}
          </div>
        </div>

        <CsSection title="Limitations">
          <p>{p.limitations}</p>
        </CsSection>

        {/* Stack */}
        <div>
          <h3 className="text-[0.78rem] font-semibold text-paper uppercase tracking-[0.08em] mb-3">Stack</h3>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {p.paper && (
            <a href={p.paper} target="_blank" rel="noopener noreferrer"
              className="border hairline px-4 py-2.5 font-mono text-[0.73rem] text-signal hover:bg-signal/10 transition-colors">
              Read the paper →
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer"
              className="border hairline px-4 py-2.5 font-mono text-[0.73rem] text-muted hover:text-signal transition-colors">
              GitHub repository
            </a>
          )}
        </div>
      </div>
    </Modal>
  )
}

function CsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.78rem] font-semibold text-paper uppercase tracking-[0.08em] mb-2">{title}</h3>
      <div className="text-[0.88rem] leading-[1.72] text-muted space-y-2">{children}</div>
    </div>
  )
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 56 56" width="48" height="48" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="22" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="28" cy="28" rx="11" ry="22" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <line x1="6" y1="28" x2="50" y2="28" stroke={color} strokeWidth="1.2" opacity="0.25" />
      <line x1="28" y1="6" x2="28" y2="50" stroke={color} strokeWidth="1.2" opacity="0.25" />
    </svg>
  )
}
