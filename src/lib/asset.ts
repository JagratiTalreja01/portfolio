/**
 * Resolves a path inside /public against the Vite base URL.
 * This is what makes the site work at https://user.github.io/REPO/ as well as
 * at a domain root — never hard-code a leading slash for public assets.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

/** Builds a srcset from the -800 / -400 variants produced by the media script. */
export function srcSet(path: string): string {
  const stem = path.replace(/\.webp$/, '')
  return [
    `${asset(`${stem}-400.webp`)} 400w`,
    `${asset(`${stem}-800.webp`)} 800w`,
    `${asset(path)} 1600w`,
  ].join(', ')
}
