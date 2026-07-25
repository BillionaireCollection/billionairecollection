/* ============================================================
   BILLIONAIRE COLLECTION — SphereAnimation
   Design: Neo-Deco Maximalism
   Three.js point-cloud sphere with OrbitControls.
   Central glowing orb + orbiting dots in atomic formation.
   Gold/white palette to match BC brand.
   ============================================================ */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SphereAnimationProps {
  size?: number;          // canvas size in px (square)
  className?: string;
  style?: React.CSSProperties;
}

export default function SphereAnimation({ size = 600, className, style }: SphereAnimationProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Use full device pixel ratio on mobile for crisp, bright dots
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 14;

    // ── Point Cloud Sphere ────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 6000 : 12000;
    const RADIUS = 5;

    // Track which dots are "white sparkle" dots for animation
    const isSparkle: boolean[] = [];

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    // Brighter gold base — boosted from #C9A84C to a more vivid warm gold
    const colorGold = new THREE.Color("#C9A84C"); // BC brand gold — warm amber, no green cast
    const colorWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere distribution for even spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = RADIUS * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 55% gold / 45% white — more white dots for a denser sparkle effect on desktop
      const t = Math.abs(Math.sin(phi)); // 0 at poles, 1 at equator
      const r = Math.random();
      const whiteThreshold = isMobile ? 0.40 : 0.45;
      let col: THREE.Color;
      if (r >= whiteThreshold) {
        if (isMobile) {
          // Mobile: NormalBlending — use clamped 0–1 values, vivid warm gold
          // #C9A84C = r:0.788, g:0.659, b:0.298 — suppress green further for warm amber
          colors[i * 3]     = 0.95;   // red — near full
          colors[i * 3 + 1] = 0.62;   // green — suppressed for warm gold
          colors[i * 3 + 2] = 0.10;   // blue — minimal
        } else {
          // Desktop: AdditiveBlending — use boosted values for glow
          const goldBright = 2.2 + Math.random() * 0.8;
          col = colorGold.clone();
          colors[i * 3]     = col.r * goldBright;
          colors[i * 3 + 1] = col.g * goldBright * 0.55;
          colors[i * 3 + 2] = col.b * goldBright * 0.15;
        }
        isSparkle.push(false);
      } else {
        if (isMobile) {
          // Mobile: NormalBlending — pure white (1,1,1)
          colors[i * 3]     = 1.0;
          colors[i * 3 + 1] = 1.0;
          colors[i * 3 + 2] = 1.0;
        } else {
          // Desktop: AdditiveBlending — boosted for glow
          const sparkle = 5.5 + Math.random() * 1.0;
          colors[i * 3]     = sparkle;
          colors[i * 3 + 1] = sparkle;
          colors[i * 3 + 2] = sparkle;
        }
        isSparkle.push(true);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.20 : 0.055,
      vertexColors: true,
      transparent: false,
      opacity: 1.0,
      // Mobile: NormalBlending renders dots as solid opaque colours — no additive dimming
      // Desktop: AdditiveBlending gives the glowing bloom effect
      blending: isMobile ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    points.renderOrder = 2; // render last so particles appear on top of dark fill
    scene.add(points);

    // Central glow orb removed — pure point-cloud sphere

    // ── Dark background sphere to block hero image bleed-through ──
    // Only needed on desktop where the sphere overlaps the hero background image.
    // On mobile the sphere sits on a plain black section, so no fill needed.
    let bgSphereGeo: THREE.SphereGeometry | null = null;
    let bgSphereMat: THREE.MeshBasicMaterial | null = null;
    let bgSphere: THREE.Mesh | null = null;
    if (!isMobile) {
      bgSphereGeo = new THREE.SphereGeometry(RADIUS * 0.98, 48, 48);
      bgSphereMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: false,
        side: THREE.FrontSide,
        depthWrite: false,
      });
      bgSphere = new THREE.Mesh(bgSphereGeo, bgSphereMat);
      bgSphere.renderOrder = 1;
      scene.add(bgSphere);
    }

    // ── Mouse interaction ─────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let dragRotX = 0;
    let dragRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!mount) return;
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (isDragging) {
        dragRotY += (e.clientX - lastMouseX) * 0.005;
        dragRotX += (e.clientY - lastMouseY) * 0.005;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        if (isDragging) {
          dragRotY += (t.clientX - lastMouseX) * 0.005;
          dragRotX += (t.clientY - lastMouseY) * 0.005;
          lastMouseX = t.clientX;
          lastMouseY = t.clientY;
        }
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { isDragging = false; };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    mount.addEventListener("touchmove", onTouchMove, { passive: true });
    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    mount.addEventListener("touchend", onTouchEnd);

    // ── Resize handler ────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────
    let frameId: number;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005;

      // Pulsing sparkle — desktop uses additive boosted values; mobile uses 0–1 range
      const colAttr = geometry.attributes.color as THREE.BufferAttribute;
      if (!isMobile) {
        const sparkleBase = 4.5;
        const sparkleRange = 2.0;
        const pulseSpeed = 3.0;
        for (let i = 0; i < COUNT; i++) {
          if (isSparkle[i]) {
            const phase = (i * 0.37 + t * pulseSpeed) % (Math.PI * 2);
            const dotPulse = sparkleBase + (Math.sin(phase) * 0.5 + 0.5) * sparkleRange;
            colAttr.setXYZ(i, dotPulse, dotPulse, dotPulse);
          }
        }
        colAttr.needsUpdate = true;
      } else {
        // Mobile: pulse white dots between 0.7 and 1.0 for a shimmer effect
        const pulseSpeed = 4.5;
        for (let i = 0; i < COUNT; i++) {
          if (isSparkle[i]) {
            const phase = (i * 0.37 + t * pulseSpeed) % (Math.PI * 2);
            const dotPulse = 0.75 + (Math.sin(phase) * 0.5 + 0.5) * 0.25; // 0.75–1.0
            colAttr.setXYZ(i, dotPulse, dotPulse, dotPulse);
          }
        }
        colAttr.needsUpdate = true;
      }

      // Auto-rotation
      const autoRotX = 0.0025;
      const autoRotY = 0.005;

      // Smooth mouse parallax
      targetRotX += (mouseY * 0.15 - targetRotX) * 0.04;
      targetRotY += (mouseX * 0.15 - targetRotY) * 0.04;

      points.rotation.x += autoRotX + (isDragging ? 0 : targetRotX * 0.01);
      points.rotation.y += autoRotY + (isDragging ? 0 : targetRotY * 0.01);

      if (isDragging) {
        points.rotation.x += (dragRotX - points.rotation.x) * 0.15;
        points.rotation.y += (dragRotY - points.rotation.y) * 0.15;
        dragRotX = points.rotation.x;
        dragRotY = points.rotation.y;
      }

      // Keep background sphere aligned with particle cloud (desktop only)
      if (bgSphere) bgSphere.rotation.copy(points.rotation);

      // (core removed)

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mousedown", onMouseDown);
      mount.removeEventListener("touchmove", onTouchMove);
      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (bgSphereGeo) bgSphereGeo.dispose();
      if (bgSphereMat) bgSphereMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          position: "relative",
        }}
      />
    </div>
  );
}
