import { useState } from 'react'
import { Section, Tag } from './ui/Primitives'
import { experience, education, engagements, reviewService } from '../data/experience'
import { useInView } from '../hooks/useInView'

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Background"
      title="From labs to production pipelines."
      intro="Five years moving between Bangkok, Kanpur and Greensboro — each role adding a different layer to the engineering stack."
    >
      {/* Timeline */}
      <div className="relative">
        {/* Vertical rail */}
        <div
          className="absolute top-0 bottom-0 left-[7px] w-px bg-gradient-to-b from-signal/80 via-graticule to-transparent"
          aria-hidden="true"
        />

        <ol className="space-y-0" aria-label="Professional experience timeline">
          {experience.map((role, i) => (
            <RoleCard key={role.id} role={role} first={i === 0} />
          ))}
        </ol>
      </div>

      {/* Education */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {education.map((deg) => (
          <div key={deg.id} className="border hairline bg-hull p-6 sm:p-7">
            <p className="meta mb-3">{deg.period}</p>
            <h3 className="text-[1.04rem] font-semibold text-paper leading-snug">
              {deg.qualification}
            </h3>
            <p className="mt-1 text-[0.88rem] text-signal">{deg.institution}</p>
            <p className="meta mt-[2px]">{deg.location}</p>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">{deg.detail}</p>
            {deg.honours.length > 0 && (
              <ul className="mt-4 space-y-1.5" aria-label="Honours">
                {deg.honours.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[0.82rem] text-muted">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Speaking and service */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
        <div>
          <h3 className="mb-5 text-[0.95rem] font-semibold text-paper">Speaking and leadership</h3>
          <ol className="space-y-3" aria-label="Conference and event engagements">
            {engagements.map((e, i) => (
              <li key={i} className="flex gap-4 items-baseline">
                <span
                  className={`shrink-0 border px-2 py-[3px] font-mono text-[0.65rem] ${
                    e.role === 'Speaker'
                      ? 'border-signal/40 text-signal bg-signal/[0.07]'
                      : 'border-graticule text-dim'
                  }`}
                >
                  {e.role}
                </span>
                <div>
                  <p className="text-[0.88rem] text-paper leading-snug">{e.title}</p>
                  <p className="meta mt-[2px]">{e.detail} · {e.date}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:w-64">
          <h3 className="mb-5 text-[0.95rem] font-semibold text-paper">Peer review service</h3>
          <ul className="space-y-2.5" aria-label="Journals and venues reviewed for">
            {reviewService.map((v) => (
              <li key={v} className="flex gap-2.5 text-[0.82rem] text-muted">
                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-signal/60" aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function RoleCard({ role, first }: { role: typeof experience[number]; first: boolean }) {
  const [open, setOpen] = useState(first)
  const { ref, inView } = useInView<HTMLLIElement>()

  return (
    <li
      ref={ref}
      className="relative pl-8 pb-10 transition-opacity duration-500"
      style={{ opacity: inView ? 1 : 0 }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-[6px] h-4 w-4 rounded-full border-2 ${
          role.current
            ? 'border-signal bg-signal/30'
            : 'border-cobalt/60 bg-hull'
        }`}
        aria-hidden="true"
      />
      {role.current && (
        <span className="sr-only">(Current position)</span>
      )}

      <div className="border-l border-transparent pl-0">
        <p className="meta mb-1">{role.period}</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="text-left w-full group"
        >
          <h3 className="text-[1.06rem] font-semibold text-paper group-hover:text-signal transition-colors leading-snug">
            {role.title}
          </h3>
          <p className="mt-0.5 text-[0.88rem] text-signal">{role.org}</p>
          <p className="meta mt-[2px]">{role.location}</p>
        </button>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? '60rem' : '0' }}
          aria-hidden={!open}
        >
          <p className="mt-4 text-[0.88rem] leading-relaxed text-muted max-w-prose">
            {role.scope}
          </p>
          <ul className="mt-4 space-y-2" aria-label="Responsibilities">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3 text-[0.85rem] text-muted max-w-prose">
                <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-signal/50" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {role.stack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-2 font-mono text-[0.72rem] text-signal hover:text-paper transition-colors"
            aria-label={`Expand ${role.title} details`}
          >
            Show details
          </button>
        )}
      </div>
    </li>
  )
}
