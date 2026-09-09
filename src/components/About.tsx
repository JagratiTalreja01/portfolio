
import { Section, Img } from './ui/Primitives'
import { about } from '../data/profile'
import { stats } from '../data/portfolio'
import { useInView } from '../hooks/useInView'

export default function About() {
  return (
    <>
      {/* ── About ──────────────────────────────────────────────────────────── */}
      <Section
        id="about"
        label="Profile"
        title="Research that touches the ground."
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-12 lg:gap-16">
          {/* Text */}
          <div>
            <p className="lede mb-8">{about.lead}</p>
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-5 max-w-prose text-[1.02rem] leading-[1.72] text-muted"
              >
                {p}
              </p>
            ))}

            {/* Capabilities grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {about.capabilities.map((c) => (
                <p key={c} className="flex items-baseline gap-2.5 text-[0.9rem] text-muted">
                  <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                  {c}
                </p>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="flex flex-col gap-5">
            <Img
              src="media/images/portrait-about.webp"
              alt="Dr. Jagrati Talreja, headshot — a professional portrait in a dark jacket."
              ratio="3 / 4"
              position="50% 15%"
              className="ring-1 ring-graticule"
            />
            <Img
              src="media/images/talk-igarss.webp"
              alt="Presenting Cross-Polarization Fusion at a conference podium."
              ratio="16 / 9"
              position="center 25%"
              className="ring-1 ring-graticule"
            />
          </div>
        </div>
      </Section>

      {/* ── Impact metrics ─────────────────────────────────────────────────── */}
      <div className="mx-auto mt-16 w-full max-w-[84rem] px-5 sm:px-8 lg:px-12">
        <div className="border hairline bg-hull py-10 px-6 sm:px-10">
          <p className="meta mb-7">By the numbers</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function StatItem({ stat }: { stat: typeof stats[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="transition-opacity duration-700"
      style={{ opacity: inView ? 1 : 0, transitionDelay: '50ms' }}
      title={stat.source}
    >
      <p
        className={`tnum text-[2.2rem] sm:text-[2.6rem] font-semibold leading-none tracking-[-0.04em] ${
          stat.tone === 'gold' ? 'text-gold' : stat.tone === 'signal' ? 'text-signal' : 'text-paper'
        }`}
      >
        {stat.value}
      </p>
      <p className="mt-2 text-[0.82rem] leading-snug text-muted max-w-[18ch]">{stat.label}</p>
    </div>
  )
}
