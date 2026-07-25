/* ============================================================
   GoldParticles — Floating gold particle effect for hero sections
   Usage: <GoldParticles count={14} />
   Place inside a position:relative container with overflow:hidden
   ============================================================ */

import { useMemo } from "react";

interface GoldParticlesProps {
  /** Number of particles to render. Default: 14 */
  count?: number;
  /** Whether to use larger, more visible particles for mobile. Default: false */
  mobile?: boolean;
}

interface Particle {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}

const KEYFRAMES = `
@keyframes goldParticleRise {
  0%   { transform: translateY(0);    opacity: 0; }
  8%   { opacity: 1; }
  80%  { opacity: 0.85; }
  100% { transform: translateY(-110vh); opacity: 0; }
}
`;

export default function GoldParticles({ count = 14 }: GoldParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 5 + Math.random() * 7,           // 5px – 12px
      left: Math.random() * 100,              // 0% – 100% horizontal
      duration: 6 + Math.random() * 8,        // 6s – 14s
      // Negative delays stagger particles so some are already mid-flight on load
      delay: -(Math.random() * 10),           // -10s – 0s (negative = start mid-animation)
    }));
  }, [count]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        id="hero-gold-particles"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.85)",
              boxShadow: "0 0 10px 4px rgba(212, 175, 55, 0.6), 0 0 20px 6px rgba(212, 175, 55, 0.25)",
              pointerEvents: "none",
              animation: `goldParticleRise ${p.duration}s ${p.delay}s infinite linear`,
            }}
          />
        ))}
      </div>
    </>
  );
}
