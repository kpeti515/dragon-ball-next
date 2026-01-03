"use client";
import React, { useRef, useEffect } from 'react';
import styles from '../layout.module.css';

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  color: [number, number, number];
  jitterTargetX?: number;
  jitterTargetY?: number;
  jitterStartX?: number;
  jitterStartY?: number;
  jitterStartTime?: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    // Helper: hex -> [r,g,b]
    function hexToRgb(hex: string) {
      const h = hex.replace('#', '');
      return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
    }

    function rgbToCss(rgb: [number, number, number], a = 1) {
      return `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${a})`;
    }

    // Build a palette of `count` colors by interpolating between color stops.
    function buildPalette(count: number) {
      // Color stops with explicit positions so yellow sits at 50%
      const stops: { pos: number; hex: string }[] = [
        { pos: 0.0, hex: '#ff3b30' }, // red
        { pos: 0.20, hex: '#b35a2f' }, // brown
        { pos: 0.50, hex: '#ffd166' }, // yellow (center)
        { pos: 0.70, hex: '#5ba3ff' }, // blue
        { pos: 0.90, hex: '#9bd3ff' }, // cold blue
        { pos: 1.0, hex: '#ffffff' }, // white
      ];

      const palette: [number, number, number][] = [];
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        // find segment
        let a = stops[0];
        let b = stops[stops.length - 1];
        for (let s = 0; s < stops.length - 1; s++) {
          if (t >= stops[s].pos && t <= stops[s + 1].pos) {
            a = stops[s];
            b = stops[s + 1];
            break;
          }
        }
        const localT = (t - a.pos) / (b.pos - a.pos || 1);
        const ca = hexToRgb(a.hex);
        const cb = hexToRgb(b.hex);
        const lerp = [
          ca[0] + (cb[0] - ca[0]) * localT,
          ca[1] + (cb[1] - ca[1]) * localT,
          ca[2] + (cb[2] - ca[2]) * localT,
        ] as [number, number, number];
        palette.push(lerp);
      }
      return palette;
    }

    // Box-Muller gaussian (mean 0, sd 1)
    function gaussianRand() {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }


    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = Math.max(320, window.innerWidth);
      height = Math.max(240, window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density tuned to produce many-many stars while remaining performant
      const density = 0.00045; // stars per pixel
      const count = Math.min(3200, Math.floor(width * height * density));

      // build a 100-step palette spanning red -> brown -> yellow -> blue -> cold blue -> white
      const palette = buildPalette(100);

      // gaussian center at palette index ~50 (yellow). We'll sample with gaussian noise around 0.5
      const mean = 0.5;
      const sd = 0.18; // controls spread across palette

      // jitter configuration: magnitude in pixels (visible), period in seconds
      const jitterMagnitude = 3.5; // ~3-4px per period
      const jitterPeriod = 3; // seconds

      stars = new Array(count).fill(0).map(() => {
        const r = Math.random() * 1.9 + 0.2; // radius 0.2 - 2.1

        // sample gaussian and map to 0..1
        let g = gaussianRand() * sd + mean;
        // clamp
        g = Math.max(0, Math.min(1, g));
        const idx = Math.round(g * (palette.length - 1));
        const color = palette[idx];

        const sx = Math.random() * width;
        const sy = Math.random() * height;

        return {
          x: sx,
          y: sy,
          r,
          baseAlpha: 0.35 + Math.random() * 0.6,
          twinkleSpeed: 0.4 + Math.random() * 2.4,
          phase: Math.random() * Math.PI * 2,
          color,
          jitterTargetX: sx,
          jitterTargetY: sy,
          jitterStartX: sx,
          jitterStartY: sy,
          jitterStartTime: performance.now(),
        } as Star;
      });
    }

    let last = performance.now();

    function render(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const px = (pointer.current.x / Math.max(1, width) - 0.5) * 2; // -1..1
      const py = (pointer.current.y / Math.max(1, height) - 0.5) * 2;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        // subtle parallax by star size and pointer
        const ox = px * (s.r * 6);
        const oy = py * (s.r * 6);

        const t = now / 1000;
        const tw = Math.sin(s.phase + t * s.twinkleSpeed) * 0.5 + 0.5; // 0..1
        const alpha = Math.max(0, Math.min(1, s.baseAlpha * (0.6 + tw * 0.9)));

        // compute jitter interpolation (~3.5px displacement every jitterPeriod seconds)
        const localJitterPeriod = 3; // seconds (kept local to ensure stable behavior)
        if (!s.jitterStartTime) s.jitterStartTime = now;

        // compute current interpolation values based on stored start/target
        const prevStartX = (s.jitterStartX ?? s.x);
        const prevStartY = (s.jitterStartY ?? s.y);
        const prevTargetX = (s.jitterTargetX ?? s.x);
        const prevTargetY = (s.jitterTargetY ?? s.y);
        const js = (now - (s.jitterStartTime || now)) / 1000;
        let jt = Math.max(0, Math.min(1, js / localJitterPeriod));
        // ease-in-out for smoother motion
        const eased = (1 - Math.cos(Math.PI * jt)) / 2;
        let currentJitterX = prevStartX + (prevTargetX - prevStartX) * eased;
        let currentJitterY = prevStartY + (prevTargetY - prevStartY) * eased;

        // if time to pick a new target, set start to current interpolated position (avoids jumps)
        if (js >= localJitterPeriod) {
          const oxT = (Math.random() * 2 - 1) * 3.5; // ±3.5 px
          const oyT = (Math.random() * 2 - 1) * 3.5;
          s.jitterStartX = currentJitterX;
          s.jitterStartY = currentJitterY;
          s.jitterTargetX = s.x + oxT;
          s.jitterTargetY = s.y + oyT;
          s.jitterStartTime = now;
          // reset interpolation for this frame
          const jt0 = 0;
          currentJitterX = s.jitterStartX;
          currentJitterY = s.jitterStartY;
        }

        const cx = currentJitterX + ox;
        const cy = currentJitterY + oy;

        // glow for larger stars (use star color)
        ctx.beginPath();
        ctx.arc(cx, cy, s.r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = rgbToCss(s.color, alpha * 0.18);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = rgbToCss(s.color, alpha);
        ctx.shadowBlur = Math.min(14, s.r * 7);
        ctx.shadowColor = rgbToCss(s.color, alpha * 0.9);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frameRef.current = requestAnimationFrame(render);
    }

    function onMove(e: MouseEvent) {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    }
    function onTouch(e: TouchEvent) {
      if (e.touches && e.touches[0]) {
        pointer.current.x = e.touches[0].clientX;
        pointer.current.y = e.touches[0].clientY;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });

    frameRef.current = requestAnimationFrame(render);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div className={styles.stars} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.starCanvas} />
    </div>
  );
}
