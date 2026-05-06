/* ============================================================
   BILLIONAIRE COLLECTION — Flower of Life
   Neo-Deco Maximalism: Mathematically precise sacred geometry,
   gold stroke on transparent background, continuous CSS spin.
   ============================================================ */

import { useEffect, useRef } from "react";

interface FlowerOfLifeProps {
  size?: number;          // px, default 520
  goldOpacity?: number;   // 0–1, default 0.72
  spinDuration?: number;  // seconds, default 28
  glowIntensity?: number; // 0–1, default 0.5
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Draws the Flower of Life using pure SVG arcs.
 * The pattern: one central circle + 6 surrounding circles at radius r,
 * then 6 more at the corners, all of radius r, clipped to the outer boundary.
 * Each pair of overlapping circles produces vesica piscis "petals".
 */
export default function FlowerOfLife({
  size = 520,
  goldOpacity = 0.72,
  spinDuration = 28,
  glowIntensity = 0.5,
  className = "",
  style = {},
}: FlowerOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gold colour
  const GOLD = `rgba(201,168,76,${goldOpacity})`;
  const GOLD_GLOW = `rgba(201,168,76,${glowIntensity * 0.4})`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 7.2; // circle radius — tuned so 7 circles fit in the outer boundary

    function drawCircle(x: number, y: number) {
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.stroke();
    }

    function render(angle: number) {
      ctx!.clearRect(0, 0, size, size);

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(angle);
      ctx!.translate(-cx, -cy);

      // Glow shadow
      ctx!.shadowColor = GOLD_GLOW;
      ctx!.shadowBlur = 18;
      ctx!.strokeStyle = GOLD;
      ctx!.lineWidth = 0.9;

      // Outer boundary circle (double ring)
      ctx!.beginPath();
      ctx!.arc(cx, cy, r * 3.46, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(cx, cy, r * 3.62, 0, Math.PI * 2);
      ctx!.stroke();

      // Central circle
      drawCircle(cx, cy);

      // First ring: 6 circles at distance r from centre
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        drawCircle(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }

      // Second ring: 6 circles at distance 2r from centre (at 60° offsets)
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        drawCircle(cx + 2 * r * Math.cos(a), cy + 2 * r * Math.sin(a));
      }

      // Third ring: 6 circles at distance 2r from centre (at 30° offsets, i.e. between the above)
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (i * Math.PI) / 3;
        drawCircle(cx + 2 * r * Math.cos(a), cy + 2 * r * Math.sin(a));
      }

      // Outermost partial ring: 6 circles at distance 2r√3 ≈ 3.46r (corners)
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 6 + (i * Math.PI) / 3;
        drawCircle(cx + r * Math.sqrt(3) * 2 * Math.cos(a), cy + r * Math.sqrt(3) * 2 * Math.sin(a));
      }

      ctx!.restore();
    }

    let startTime: number | null = null;
    let rafId: number;

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const angle = (elapsed / 1000 / spinDuration) * Math.PI * 2;
      render(angle);
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [size, goldOpacity, spinDuration, glowIntensity]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
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
