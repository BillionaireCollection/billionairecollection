/* ============================================================
   GoldParticles — Floating gold particle effect for hero sections
   Usage: <GoldParticles count={14} />
   Place inside a position:relative container with overflow:hidden
   ============================================================ */

import { useMemo } from "react";

interface GoldParticlesProps {
  /** Number of particles to render. Default: 14 */
  count?: number;
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
  10%  { opacity: 1; }
  85%  { opacity: 0.6; }
  100% { transform: translateY(-110vh); opacity: 0; }
}
`;

export default function GoldParticles({ count = 14 }: GoldParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 5,           // 3px – 8px
      left: Math.random() * 100,              // 0% – 100% horizontal
      duration: 6 + Math.random() * 8,        // 6s – 14s
      delay: Math.random() * 5,               // 0s – 5s
    }));
  }, [count]);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
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
              background: "rgba(212, 175, 55, 0.6)",
              boxShadow: "0 0 6px 2px rgba(212, 175, 55, 0.35)",
              pointerEvents: "none",
              animation: `goldParticleRise ${p.duration}s ${p.delay}s infinite linear`,
            }}
          />
        ))}
      </div>
    </>
  );
}
