import { useEffect, useState } from 'react'

/** Tracks which section id is currently occupying the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const seen = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.intersectionRatio)
        let best = ''
        let ratio = 0
        for (const [id, r] of seen) {
          if (r > ratio) {
            ratio = r
            best = id
          }
        }
        if (best && ratio > 0.05) setActive(best)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.3, 0.6, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])

  return active
}
