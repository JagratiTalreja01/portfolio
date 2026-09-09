/**
 * DataGlobe — a rotating sphere made of real land-surface points
 * loaded from /public/data/land-points.bin (Natural Earth 110m).
 * A cyan radar swath sweeps the globe longitude-by-longitude.
 *
 * Rendered only when Three.js has loaded and the browser is not in reduced-motion
 * or Save-Data mode. A static fallback renders immediately.
 */

import {
  Suspense,
  lazy,
  useEffect,
  useState,
} from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useVisible } from '../hooks/useInView'


/* ── Fallback ────────────────────────────────────────────────────────────── */
function GlobeFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="rounded-full opacity-[0.18]"
        style={{
          width: 440,
          height: 440,
          background:
            'radial-gradient(circle at 38% 38%, #3FE0FF 0%, #0B1220 60%)',
        }}
      />
    </div>
  )
}

/* ── Three.js canvas — lazy-loaded so it doesn't block the hero ─────────── */
const ThreeGlobe = lazy(() => import('./ThreeGlobe'))

/* ── Public-facing component ─────────────────────────────────────────────── */
export default function DataGlobe({
  mouseX,
  mouseY,
}: {
  mouseX: number
  mouseY: number
}) {
  const reduced = useReducedMotion()
  const { ref, visible } = useVisible<HTMLDivElement>()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
    const c = nav.connection
    const slow = c?.saveData === true || /2g/.test(c?.effectiveType ?? '')
    // Defer Three until idle so critical text paints first.
    const id =
      'requestIdleCallback' in window
        ? (window as unknown as { requestIdleCallback: (fn: () => void) => number }).requestIdleCallback(
            () => setEnabled(!slow),
          )
        : setTimeout(() => setEnabled(!slow), 800)
    return () => {
      if ('cancelIdleCallback' in window)
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id as number)
      else clearTimeout(id as ReturnType<typeof setTimeout>)
    }
  }, [])

  return (
    <div ref={ref} className="h-full w-full" aria-hidden="true">
      {enabled && !reduced ? (
        <Suspense fallback={<GlobeFallback />}>
          {visible || true /* keep mounted once active */ ? (
            <ThreeGlobe
              mouseX={mouseX}
              mouseY={mouseY}
              paused={!visible}
            />
          ) : (
            <GlobeFallback />
          )}
        </Suspense>
      ) : (
        <GlobeFallback />
      )}
    </div>
  )
}
