import { useState } from 'react'
import { Section, Img, Tag, VideoLoop, Lightbox } from './ui/Primitives'
import { patents } from '../data/portfolio'
import { skillGroups, repos, adventures } from '../data/portfolio'
import { researchLife } from '../data/portfolio'
import { profile } from '../data/profile'
import { asset } from '../lib/asset'
import { useInView } from '../hooks/useInView'

/* ═════════════════════════════════════════════════════════════════════════
   Patents
   ══════════════════════════════════════════════════════════════════════ */
export function Patents() {
  return (
    <Section
      id="patents"
      label="Innovation"
      title="Two filings. One in the US, one in India."
      intro="Patent status is transcribed exactly from the CV. Application does not mean grant."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {patents.map((p) => (
          <div key={p.id} className="border hairline bg-hull p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="meta mb-1">{p.jurisdiction} · {p.filed}</p>
                <h3 className="text-[1.06rem] font-semibold text-paper leading-tight">{p.title}</h3>
              </div>
              <span className="shrink-0 border border-violet/40 bg-violet/[0.07] px-2 py-[3px] font-mono text-[0.66rem] text-violet">
                {p.status}
              </span>
            </div>

            <p className="font-mono text-[0.72rem] text-dim mb-1">{p.numberLabel}: {p.number}</p>

            <p className="mt-4 text-[0.86rem] leading-relaxed text-muted">{p.summary}</p>

            <div className="mt-4 flex flex-wrap gap-x-1.5 text-[0.78rem] text-dim">
              <span>Inventors:</span>
              {p.inventors.map((inv, i) => (
                <span key={i} className={inv === 'Jagrati Talreja' ? 'text-paper' : ''}>
                  {inv}{i < p.inventors.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>

            <p className="mt-4 text-[0.78rem] text-dim italic">{p.statusNote}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Skills
   ══════════════════════════════════════════════════════════════════════ */
export function Skills() {
  const [open, setOpen] = useState<string | null>(skillGroups[0].name)

  return (
    <Section
      id="skills"
      label="Capabilities"
      title="Organized by what I actually do."
      intro="No percentage bars. Skills are listed where they appear in the résumé, CV or a public repository."
    >
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Category tabs — vertical on lg */}
        <div
          className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible border hairline bg-hull shrink-0 lg:w-64"
          role="tablist"
          aria-label="Skill categories"
        >
          {skillGroups.map((g) => (
            <button
              key={g.name}
              role="tab"
              aria-selected={open === g.name}
              aria-controls={`skill-panel-${g.name}`}
              id={`skill-tab-${g.name}`}
              onClick={() => setOpen(g.name)}
              className={`shrink-0 lg:w-full text-left px-4 py-3.5 border-b lg:border-b-0 lg:border-r hairline font-mono text-[0.74rem] transition-colors ${
                open === g.name
                  ? 'bg-signal/10 text-signal border-l-2 lg:border-l-2 border-signal'
                  : 'text-muted hover:text-paper hover:bg-shelf'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex-1 border hairline border-l-0 bg-abyss p-6 sm:p-8">
          {skillGroups.map((g) => (
            <div
              key={g.name}
              role="tabpanel"
              id={`skill-panel-${g.name}`}
              aria-labelledby={`skill-tab-${g.name}`}
              hidden={open !== g.name}
            >
              <p className="text-[0.86rem] text-muted mb-6 max-w-prose">{g.note}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   GitHub Repos
   ══════════════════════════════════════════════════════════════════════ */
export function Repos() {
  return (
    <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12 mt-20">
      <div className="border-t hairline pt-8 sm:pt-10">
        <p className="meta mb-6">Engineering</p>
        <h2 className="text-title font-semibold text-paper max-w-[22ch]">
          Open research code.
        </h2>
        <p className="mt-4 max-w-measure text-[1.02rem] text-muted">
          Every featured project has a public repository. The metadata below is maintained in a centralized data file so the site doesn't need a GitHub token or a build-time network call.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {repos.map((r) => (
          <RepoCard key={r.name} repo={r} />
        ))}
      </div>
    </div>
  )
}

function RepoCard({ repo: r }: { repo: typeof repos[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="flex flex-col border hairline bg-hull p-5 transition-opacity duration-500"
      style={{ opacity: inView ? 1 : 0 }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[0.93rem] text-signal hover:text-paper transition-colors link-swath"
        >
          {r.name}
        </a>
        <span className="font-mono text-[0.66rem] border hairline text-dim px-2 py-[2px] shrink-0">
          {r.language}
        </span>
      </div>
      <p className="text-[0.83rem] leading-relaxed text-muted flex-1">{r.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {r.frameworks.map((f) => <Tag key={f}>{f}</Tag>)}
      </div>
      {r.publication && (
        <p className="mt-3 font-mono text-[0.68rem] text-gold">{r.publication}</p>
      )}
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Adventures
   ══════════════════════════════════════════════════════════════════════ */
export function Adventures() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const imageItems = adventures
    .filter((a) => a.type === 'image')
    .map((a) => ({ src: a.media, alt: a.alt, caption: a.caption }))

  return (
    <Section
      id="adventures"
      label="Beyond the models"
      title="There is a life outside the GPU cluster."
    >
      {/* Masonry-ish grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {adventures.map((a) => {
          const wide = a.span === 'wide'
          const tall = a.span === 'tall'
          const imgIdx = imageItems.findIndex((x) => x.src === a.media)

          return (
            <div
              key={a.id}
              className={`relative group overflow-hidden bg-hull ring-1 ring-graticule/60 ${
                wide ? 'col-span-2' : tall ? 'row-span-2' : ''
              }`}
              style={{ aspectRatio: tall ? '9/16' : wide ? '16/7' : '1/1' }}
            >
              {a.type === 'video' ? (
                <VideoLoop
                  src={a.media}
                  poster={a.poster!}
                  alt={a.alt}
                  ratio={tall ? '9/16' : wide ? '16/7' : '1/1'}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setLightbox(imgIdx)}
                  aria-label={`Open full image: ${a.title}`}
                  className="h-full w-full"
                >
                  <Img
                    src={a.media}
                    alt={a.alt}
                    ratio={tall ? '9/16' : wide ? '16/7' : '1/1'}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </button>
              )}

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[0.74rem] font-medium text-paper leading-tight">{a.title}</p>
                <p className="text-[0.66rem] text-muted mt-0.5 line-clamp-2">{a.caption}</p>
              </div>
            </div>
          )
        })}
      </div>

      <Lightbox
        items={imageItems}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />

      {/* Research and conference photo strip */}
      <div className="mt-16">
        <h3 className="text-[0.95rem] font-semibold text-paper mb-7">Research and conferences</h3>
        <ResearchGallery />
      </div>
    </Section>
  )
}

function ResearchGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {researchLife.map((f, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={`Open image: ${f.caption}`}
            className="group relative overflow-hidden bg-hull ring-1 ring-graticule/40"
            style={{ aspectRatio: '4/3' }}
          >
            <Img src={f.src} alt={f.alt} ratio="4/3" sizes="(max-width: 640px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
              <p className="text-[0.68rem] text-paper line-clamp-2 leading-tight">{f.caption}</p>
            </div>
          </button>
        ))}
      </div>
      <Lightbox
        items={researchLife.map((f) => ({ src: f.src, alt: f.alt, caption: f.caption }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════════════════
   Contact
   ══════════════════════════════════════════════════════════════════════ */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 bg-hull border-t hairline"
    >
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="meta mb-6">Get in touch</p>
            <h2
              id="contact-heading"
              className="text-title font-semibold text-paper leading-tight"
            >
              Looking for an AI research partner or a senior engineer?
            </h2>
            <p className="lede mt-6 max-w-[46ch]">
              I'm open to AI research scientist, applied scientist, machine learning engineer and data science positions, as well as collaborations on geospatial AI, remote sensing, or multimodal vision.
            </p>
            <p className="mt-4 text-[0.9rem] text-muted">
              {profile.availability}
            </p>
          </div>

          <div className="space-y-6">
            <ContactLine
              label="Email"
              href={`mailto:${profile.links.email}`}
              value={profile.links.email}
            />
            <ContactLine
              label="Academic email"
              href={`mailto:${profile.links.academicEmail}`}
              value={profile.links.academicEmail}
            />
            <ContactLine
              label="GitHub"
              href={profile.links.github}
              value="github.com/JagratiTalreja01"
            />
            <ContactLine
              label="LinkedIn"
              href={profile.links.linkedin}
              value="linkedin.com/in/dr-jagrati-talreja-phd-113054136"
            />
            {profile.links.scholar && !profile.links.scholar.startsWith('[') && (
              <ContactLine label="Google Scholar" href={profile.links.scholar} value="Google Scholar" />
            )}
            {profile.links.orcid && !profile.links.orcid.startsWith('[') && (
              <ContactLine label="ORCID" href={profile.links.orcid} value="ORCID" />
            )}

            {/* Downloads */}
            <div className="pt-4 border-t hairline flex flex-wrap gap-3">
              <a
                href={asset(profile.documents.resume)}
                download
                className="inline-flex items-center gap-2 border hairline px-5 py-3 font-mono text-[0.76rem] text-signal hover:bg-signal/10 transition-colors"
              >
                <DownArrow />
                Résumé (PDF)
              </a>
              <a
                href={asset(profile.documents.cv)}
                download
                className="inline-flex items-center gap-2 border hairline px-5 py-3 font-mono text-[0.76rem] text-muted hover:text-signal transition-colors"
              >
                <DownArrow />
                Full CV (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 border-t hairline pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[0.71rem] text-dim">
            © {new Date().getFullYear()} Jagrati Talreja. Greensboro, North Carolina, USA.
          </p>
          <p className="font-mono text-[0.71rem] text-dim">
            Built with React + Vite + Three.js. Hosted on GitHub Pages.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactLine({
  label,
  href,
  value,
}: {
  label: string
  href: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="font-mono text-[0.68rem] text-dim">{label}</p>
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="font-mono text-[0.83rem] text-signal hover:text-paper transition-colors link-swath break-all"
      >
        {value}
      </a>
    </div>
  )
}

const DownArrow = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 2v8M4 8l4 4 4-4M2 13h12" />
  </svg>
)
