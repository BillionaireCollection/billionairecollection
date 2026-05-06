/* ============================================================
   BILLIONAIRE COLLECTION — Flower of Life (3D)
   Three.js sphere with Flower of Life geometry lines projected
   onto its surface. Gold glow, auto-rotation, depth shading.
   ============================================================ */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FlowerOfLifeProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GOLD = new THREE.Color(0xc9a84c);

/**
 * Projects a 2D point (in the Flower of Life plane) onto the surface
 * of a unit sphere using spherical mapping, then scales by radius.
 */
function projectOnSphere(
  x: number,
  y: number,
  planeRadius: number,
  sphereRadius: number
): THREE.Vector3 {
  // Normalise to [-1, 1]
  const nx = x / planeRadius;
  const ny = y / planeRadius;
  const len = Math.sqrt(nx * nx + ny * ny);

  if (len >= 1) {
    // Clamp to equator
    return new THREE.Vector3(
      (nx / len) * sphereRadius,
      (ny / len) * sphereRadius,
      0
    );
  }

  // Map onto sphere surface via inverse stereographic-like projection
  const nz = Math.sqrt(Math.max(0, 1 - len * len));
  return new THREE.Vector3(nx * sphereRadius, ny * sphereRadius, nz * sphereRadius);
}

/**
 * Creates arc segments for a circle projected onto the sphere.
 * cx, cy = circle centre in 2D plane
 * r      = circle radius in 2D plane
 * planeR = radius of the Flower of Life pattern in 2D
 * sphR   = Three.js sphere radius
 */
function makeCircleOnSphere(
  cx: number,
  cy: number,
  r: number,
  planeR: number,
  sphR: number,
  segments = 96
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    pts.push(projectOnSphere(x, y, planeR, sphR));
  }
  return pts;
}

export default function FlowerOfLife({
  size = 600,
  className = "",
  style = {},
}: FlowerOfLifeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    // ── Sphere radius & Flower of Life plane radius ───────────
    const SPHERE_R = 1.0;
    const PLANE_R = 1.05; // slightly larger so the pattern fills the sphere

    // ── Outer boundary double ring ────────────────────────────
    const RING_R = SPHERE_R * 0.98;

    // ── Gold line material with glow ──────────────────────────
    const lineMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.85,
      linewidth: 1,
    });

    // ── Helper: add a projected circle to the scene ───────────
    function addCircle(cx: number, cy: number, r: number) {
      const pts = makeCircleOnSphere(cx, cy, r, PLANE_R, SPHERE_R);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, lineMat));
    }

    // ── Flower of Life circles ────────────────────────────────
    // The pattern uses circles of radius `cr` (= half the plane radius / 1.73)
    // arranged in the classic hexagonal grid.
    const cr = PLANE_R / 3.46; // circle radius in plane coords

    // Central circle
    addCircle(0, 0, cr);

    // First ring: 6 circles at distance cr from centre
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      addCircle(cr * Math.cos(a), cr * Math.sin(a), cr);
    }

    // Second ring: 6 circles at distance 2cr (on-axis)
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      addCircle(2 * cr * Math.cos(a), 2 * cr * Math.sin(a), cr);
    }

    // Second ring: 6 circles at distance 2cr (off-axis, 30° offset)
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      addCircle(2 * cr * Math.cos(a), 2 * cr * Math.sin(a), cr);
    }

    // Outer partial ring: 6 circles at distance 2cr√3 (corners)
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      const d = cr * Math.sqrt(3) * 2;
      addCircle(d * Math.cos(a), d * Math.sin(a), cr);
    }

    // ── Outer boundary rings (two concentric) ─────────────────
    {
      const pts1 = makeCircleOnSphere(0, 0, RING_R * 0.995, PLANE_R, SPHERE_R, 128);
      const pts2 = makeCircleOnSphere(0, 0, RING_R * 1.04, PLANE_R, SPHERE_R, 128);
      const g1 = new THREE.BufferGeometry().setFromPoints(pts1);
      const g2 = new THREE.BufferGeometry().setFromPoints(pts2);
      scene.add(new THREE.Line(g1, lineMat));
      scene.add(new THREE.Line(g2, lineMat));
    }

    // ── Invisible sphere for depth reference (no mesh needed) ─
    // Add a very faint sphere mesh so the 3D depth reads correctly
    const sphereGeo = new THREE.SphereGeometry(SPHERE_R, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
      shininess: 60,
      specular: new THREE.Color(0xc9a84c).multiplyScalar(0.15),
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);

    // ── Lighting ──────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xc9a84c, 2.5, 8);
    goldLight.position.set(2, 2, 3);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight(0xffffff, 0.6, 8);
    rimLight.position.set(-2, -1, -2);
    scene.add(rimLight);

    // ── Group all lines for rotation ──────────────────────────
    const group = new THREE.Group();
    scene.children
      .filter((c) => c instanceof THREE.Line)
      .forEach((c) => {
        scene.remove(c);
        group.add(c);
      });
    group.add(sphereMesh);
    scene.add(group);

    // ── Mouse interaction ─────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / size - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / size - 0.5) * 2;
    };
    mount.addEventListener("mousemove", handleMouseMove);

    // ── Animation loop ────────────────────────────────────────
    let rafId: number;
    const clock = new THREE.Clock();

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Primary auto-rotation (slow, majestic)
      group.rotation.y = t * 0.18;
      group.rotation.x = Math.sin(t * 0.07) * 0.25;

      // Subtle mouse parallax
      group.rotation.y += mouseX * 0.06;
      group.rotation.x += mouseY * 0.04;

      // Gold light orbit
      goldLight.position.x = Math.cos(t * 0.4) * 3;
      goldLight.position.z = Math.sin(t * 0.4) * 3 + 1;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      mount.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: size,
        height: size,
        display: "block",
        ...style,
      }}
    />
  );
}
