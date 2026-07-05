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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 14;

    // ── Point Cloud Sphere ────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 2800 : 5500;
    const RADIUS = 5;

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const colorGold = new THREE.Color("#C9A84C");
    const colorWhite = new THREE.Color("#ffffff");
    const colorBlue = new THREE.Color("#a8d4ff");

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

      // Color gradient: gold near equator, white at poles, blue accent
      const t = Math.abs(Math.sin(phi)); // 0 at poles, 1 at equator
      const r = Math.random();
      let col: THREE.Color;
      if (r < 0.55) col = colorWhite.clone().lerp(colorGold, t * 0.6);
      else if (r < 0.8) col = colorGold.clone().lerp(colorWhite, 0.4);
      else col = colorBlue.clone().lerp(colorWhite, 0.5);

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.055 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Central Glow Orb ──────────────────────────────────────
    // Inner core
    const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfff8e7, transparent: true, opacity: 0.95 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Outer glow layers (additive blending sprites)
    const glowLayers = [
      { radius: 0.7, opacity: 0.35, color: 0xfff0c0 },
      { radius: 1.2, opacity: 0.18, color: 0xC9A84C },
      { radius: 2.0, opacity: 0.08, color: 0xC9A84C },
    ];
    glowLayers.forEach(({ radius, opacity, color }) => {
      const g = new THREE.SphereGeometry(radius, 24, 24);
      const m = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      });
      scene.add(new THREE.Mesh(g, m));
    });

    // Inner orbit ring removed — clean sphere only

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

      // Pulsing core
      const pulse = 1 + Math.sin(t * 2.5) * 0.08;
      core.scale.setScalar(pulse);

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
        }}
      />
    </div>
  );
}
