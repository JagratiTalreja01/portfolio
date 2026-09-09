import { useState, useMemo } from 'react'
import { Section, StatusPill } from './ui/Primitives'
import { publications, pubTopics, bibtex, SELF, type Publication } from '../data/publications'

type Filter = {
  type: '' | 'journal' | 'conference' | 'book-chapter'
  status: '' | 'published' | 'accepted' | 'under-review'
  topic: string
}

export default function Publications() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>({ type: '', status: '', topic: '' })
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const visible = useMemo(() => {
    const ql = q.toLowerCase()
    return publications.filter((p) => {
      if (filter.type && p.type !== filter.type) return false
      if (filter.status && p.status !== filter.status) return false
      if (filter.topic && !p.topics.includes(filter.topic)) return false
      if (q) {
        const hay = `${p.title} ${p.authors.join(' ')} ${p.venue}`.toLowerCase()
        if (!hay.includes(ql)) return false
      }
      return true
    })
  }, [q, filter])

  const copyBibtex = (p: Publication) => {
    navigator.clipboard?.writeText(bibtex(p)).then(() => {
      setCopiedId(p.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  return (
    <Section
      id="publications"
      label="Scholarship"
      title="16 papers. Five venues. All verified."
      intro="Publications are sourced from the CV. Status is transcribed exactly — nothing under review is shown as published."
    >
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="search"
          placeholder="Search title, author, venue…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 border hairline bg-hull px-4 py-2.5 font-mono text-[0.82rem] text-paper placeholder:text-dim focus:border-signal/70 focus:outline-none"
          aria-label="Search publications"
        />
        <div className="flex flex-wrap gap-2">
          <Select
            label="Type"
            value={filter.type}
            onChange={(v) => setFilter((f) => ({ ...f, type: v as Filter['type'] }))}
            options={[
              { value: '', label: 'All types' },
              { value: 'journal', label: 'Journal' },
              { value: 'conference', label: 'Conference' },
              { value: 'book-chapter', label: 'Book chapter' },
            ]}
          />
          <Select
            label="Status"
            value={filter.status}
            onChange={(v) => setFilter((f) => ({ ...f, status: v as Filter['status'] }))}
            options={[
              { value: '', label: 'All statuses' },
              { value: 'published', label: 'Published' },
              { value: 'accepted', label: 'Accepted' },
              { value: 'under-review', label: 'Under review' },
            ]}
          />
          <Select
            label="Topic"
            value={filter.topic}
            onChange={(v) => setFilter((f) => ({ ...f, topic: v }))}
            options={[
              { value: '', label: 'All topics' },
              ...pubTopics.map((t) => ({ value: t, label: t })),
            ]}
          />
        </div>
      </div>

      {/* Count */}
      <p className="meta mb-6">{visible.length} / {publications.length} records</p>

      {/* List */}
      <ol className="space-y-3" aria-label="Publications list" aria-live="polite" aria-relevant="all">
        {visible.length === 0 && (
          <li className="py-12 text-center text-muted font-mono text-[0.82rem]">
            No publications match these filters.
          </li>
        )}
        {visible.map((p) => (
          <PubCard
            key={p.id}
            pub={p}
            expanded={expandedId === p.id}
            copied={copiedId === p.id}
            onToggle={() => setExpandedId((id) => (id === p.id ? null : p.id))}
            onCopy={() => copyBibtex(p)}
          />
        ))}
      </ol>
    </Section>
  )
}

function PubCard({
  pub: p,
  expanded,
  copied,
  onToggle,
  onCopy,
}: {
  pub: Publication
  expanded: boolean
  copied: boolean
  onToggle: () => void
  onCopy: () => void
}) {
  const typeLabel = { journal: 'Journal', conference: 'Conference', 'book-chapter': 'Book chapter' }[p.type]

  return (
    <li className="border hairline bg-hull">
      <div className="p-5 sm:p-6">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={onToggle}
              className="text-left group"
              aria-expanded={expanded}
              aria-controls={`pub-${p.id}-detail`}
            >
              <p className="text-[0.93rem] font-semibold text-paper leading-snug group-hover:text-signal transition-colors">
                {p.title}
              </p>
            </button>
            <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
              {p.authors.map((a, i) => (
                <span key={i}>
                  {i > 0 && ', '}
                  <span className={a === SELF ? 'text-paper font-medium' : ''}>{a}</span>
                </span>
              ))}
            </p>
            <p className="mt-1 font-mono text-[0.73rem] text-dim">
              {p.venue}{p.year ? `, ${p.year}` : ''}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <StatusPill status={p.status} />
            <span className="font-mono text-[0.65rem] text-dim border hairline px-2 py-[2px]">
              {typeLabel}
            </span>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {p.doi && (
            <a
              href={`https://doi.org/${p.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] text-signal hover:text-paper transition-colors link-swath"
            >
              DOI
            </a>
          )}
          {p.url && !p.doi && (
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.7rem] text-signal hover:text-paper transition-colors link-swath">
              Paper
            </a>
          )}
          {p.code && (
            <a href={p.code} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.7rem] text-muted hover:text-paper transition-colors link-swath">
              Code
            </a>
          )}
          <button
            type="button"
            onClick={onCopy}
            className="font-mono text-[0.7rem] text-muted hover:text-signal transition-colors"
            aria-label="Copy BibTeX citation"
          >
            {copied ? 'Copied!' : 'BibTeX'}
          </button>
          <div className="flex flex-wrap gap-1.5 ml-auto">
            {p.topics.map((t) => (
              <span key={t} className="font-mono text-[0.65rem] text-dim border border-graticule/60 px-2 py-[2px]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable abstract */}
        {p.abstract && (
          <div
            id={`pub-${p.id}-detail`}
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: expanded ? '20rem' : '0' }}
            aria-hidden={!expanded}
          >
            <p className="mt-5 border-t hairline pt-5 text-[0.84rem] leading-[1.72] text-muted max-w-prose">
              {p.abstract}
            </p>
          </div>
        )}
      </div>
    </li>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border hairline bg-hull px-3 py-2.5 font-mono text-[0.78rem] text-muted focus:border-signal/70 focus:outline-none appearance-none pr-7"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238CA0BD' stroke-width='1.7'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '16px',
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
