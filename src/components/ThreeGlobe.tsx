/**
 * ThreeGlobe — the actual Three.js canvas.
 * Lazy-loaded so Three (≈600 KB) doesn't block the hero.
 *
 * Points are stored as pairs of int16 values (lat × 100, lon × 100) in
 * /public/data/land-points.bin and fetched once on mount.
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { asset } from '../lib/asset'

const R = 1.0 // globe radius
const SWATH_WIDTH = 0.18 // radians — radar beam width
const SWATH_SPEED = 0.0025 // rad/frame — full circuit ≈ 42 s

function latLonToVec3(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

export default function ThreeGlobe({
  mouseX,
  mouseY,
  paused,
}: {
  mouseX: number
  mouseY: number
  paused: boolean
}) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef({ x: mouseX, y: mouseY })

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // ── Renderer
    const W = container.clientWidth
    const H = container.clientHeight
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Camera
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 20)
    camera.position.z = 2.55

    // ── Scene
    const scene = new THREE.Scene()

    // ── Globe wireframe — faint latitude/longitude lines
    const sphereGeo = new THREE.SphereGeometry(R, 48, 24)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1b2a45,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // ── Soft atmospheric glow behind the sphere
    const glowGeo = new THREE.SphereGeometry(R * 1.18, 32, 16)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x3fe0ff,
      transparent: true,
      opacity: 0.035,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(glowGeo, glowMat))

    // ── Orbital ring — a simple torus representing a satellite orbit
    const ringGeo = new THREE.TorusGeometry(R * 1.32, 0.004, 4, 128)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3d6dff,
      transparent: true,
      opacity: 0.55,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI * 0.32
    ring.rotation.y = Math.PI * 0.15
    scene.add(ring)

    // Satellite dot on the ring
    const satGeo = new THREE.SphereGeometry(0.018, 6, 4)
    const satMat = new THREE.MeshBasicMaterial({ color: 0x3fe0ff })
    const sat = new THREE.Mesh(satGeo, satMat)
    scene.add(sat)

    // ── Land point cloud — loaded from binary
    const pointGroup = new THREE.Group()
    scene.add(pointGroup)

    let swathLon = -Math.PI // current swath position in radians

    // A flat triangle to represent the swath footprint on the globe
    const swathGeo = new THREE.BufferGeometry()
    const swathPositions = new Float32Array(3 * 3) // 3 verts × xyz
    swathGeo.setAttribute('position', new THREE.BufferAttribute(swathPositions, 3))
    // We'll update this every frame; skip for now and use a cone instead.

    // Swath: a thin meridian band quad drawn as two triangles
    const swathMesh = buildSwathMesh()
    scene.add(swathMesh)

    let landPoints: Float32Array | null = null
    let pointsMesh: THREE.Points | null = null

    fetch(asset('data/land-points.bin'))
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        const raw = new Int16Array(buf)
        const n = raw.length / 2
        const positions = new Float32Array(n * 3)
        const colors = new Float32Array(n * 3)
        for (let i = 0; i < n; i++) {
          const lat = raw[i * 2] / 100
          const lon = raw[i * 2 + 1] / 100
          const v = latLonToVec3(lat, lon, R * 1.008)
          positions[i * 3] = v.x
          positions[i * 3 + 1] = v.y
          positions[i * 3 + 2] = v.z
          colors[i * 3] = 0.15
          colors[i * 3 + 1] = 0.35
          colors[i * 3 + 2] = 0.55
        }
        landPoints = positions
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        const mat = new THREE.PointsMaterial({
          size: 0.012,
          vertexColors: true,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.85,
        })
        pointsMesh = new THREE.Points(geo, mat)
        pointGroup.add(pointsMesh)
      })
      .catch(() => undefined) // graceful — fallback looks fine without points

    // ── Resize
    function onResize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(container)

    // ── Animate
    let rafId: number
    let frame = 0

    function animate() {
      rafId = requestAnimationFrame(animate)
      if (paused) return
      frame++

      // Auto-rotate globe slowly + gentle mouse parallax
      const mx = mouseRef.current.x * 0.38
      const my = mouseRef.current.y * 0.22
      pointGroup.rotation.y = frame * 0.0018 + mx
      pointGroup.rotation.x = my
      sphere.rotation.y = frame * 0.0018 + mx
      sphere.rotation.x = my

      // Satellite orbits the ring
      const satAngle = frame * 0.012
      const rr = R * 1.32
      sat.position.set(
        rr * Math.cos(satAngle) * Math.cos(ring.rotation.x),
        rr * Math.sin(satAngle),
        rr * Math.cos(satAngle) * Math.sin(ring.rotation.x),
      )

      // Swath sweeps west-to-east
      swathLon = (swathLon + SWATH_SPEED) % (Math.PI * 2)
      updateSwath(swathMesh, swathLon, frame)

      // Colour points on the swath bright cyan, others dim
      if (pointsMesh && landPoints) {
        const colAttr = pointsMesh.geometry.attributes.color as THREE.BufferAttribute
        const colArr = colAttr.array as Float32Array
        const swathCenter = swathLon - Math.PI // actual lon in rad
        for (let i = 0; i < landPoints.length / 3; i++) {
          const x = landPoints[i * 3]
          const z = landPoints[i * 3 + 2]
          const ptLon = Math.atan2(z, -x) // lon in rad (−π to π)
          // Wrap-aware distance
          let diff = ptLon - swathCenter
          while (diff > Math.PI) diff -= Math.PI * 2
          while (diff < -Math.PI) diff += Math.PI * 2
          const t = Math.max(0, 1 - Math.abs(diff) / SWATH_WIDTH)
          const lit = t > 0.35
          colArr[i * 3] = lit ? 0.25 + t * 0.75 : 0.15
          colArr[i * 3 + 1] = lit ? 0.88 + t * 0.12 : 0.35
          colArr[i * 3 + 2] = lit ? 1.0 : 0.55
        }
        colAttr.needsUpdate = true
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Track paused without re-mounting
  const pausedRef = useRef(paused)
  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  return <div ref={mountRef} className="h-full w-full" />
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function buildSwathMesh() {
  const STEPS = 64
  const positions = new Float32Array(STEPS * 2 * 3)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const indices: number[] = []
  for (let i = 0; i < STEPS - 1; i++) {
    const a = i * 2, b = i * 2 + 1, c = (i + 1) * 2, d = (i + 1) * 2 + 1
    indices.push(a, b, c, b, d, c)
  }
  geo.setIndex(indices)
  const mat = new THREE.MeshBasicMaterial({
    color: 0x3fe0ff,
    transparent: true,
    opacity: 0.08,
    side: THREE.DoubleSide,
  })
  return new THREE.Mesh(geo, mat)
}

function updateSwath(mesh: THREE.Mesh, swathLon: number, frame: number) {
  const STEPS = 64
  const lonCenter = swathLon - Math.PI
  const halfW = SWATH_WIDTH * 0.5
  const posAttr = mesh.geometry.attributes.position as THREE.BufferAttribute
  const arr = posAttr.array as Float32Array
  const pulse = 0.09 + Math.sin(frame * 0.12) * 0.03

  for (let i = 0; i < STEPS; i++) {
    const lat = -80 + (160 * i) / (STEPS - 1)
    const vL = latLonToVec3(lat, ((lonCenter - halfW) * 180) / Math.PI, R * 1.003)
    const vR = latLonToVec3(lat, ((lonCenter + halfW) * 180) / Math.PI, R * 1.003)
    arr[i * 6] = vL.x; arr[i * 6 + 1] = vL.y; arr[i * 6 + 2] = vL.z
    arr[i * 6 + 3] = vR.x; arr[i * 6 + 4] = vR.y; arr[i * 6 + 5] = vR.z
  }
  posAttr.needsUpdate = true;
  (mesh.material as THREE.MeshBasicMaterial).opacity = pulse
}
