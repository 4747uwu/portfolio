import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function PiRods({
  innerRodLength = 120,
  outerRodLength = 80,
  innerRodColor = "black",
  outerRodColor = "black",
  traceColor = "#ff00ff",
  dotColor = "#ff00ff",
  speed = 0.01,
  size = 600,
  backgroundColor = "transparent",

  // SECOND mechanism (defaults to mirror of first but opposite direction)
  innerRodLength2 = innerRodLength,
  outerRodLength2 = outerRodLength,
  innerRodColor2 = innerRodColor,
  outerRodColor2 = outerRodColor,
  traceColor2 = traceColor,
  dotColor2 = dotColor,
  speed2 = -speed,
}) {
  const traceRef = useRef(null);
  const rodsRef = useRef(null);

  useEffect(() => {
    const traceCanvas = traceRef.current;
    const rodsCanvas = rodsRef.current;
    if (!traceCanvas || !rodsCanvas) return;

    const traceCtx = traceCanvas.getContext("2d", { alpha: true });
    const rodsCtx = rodsCanvas.getContext("2d", { alpha: true });
    if (!traceCtx || !rodsCtx) return;

    const DPR = window.devicePixelRatio || 1;
    const DISPLAY_SIZE = size;

    // set both canvases for crisp rendering
    [traceCanvas, rodsCanvas].forEach((c) => {
      c.width = DISPLAY_SIZE * DPR;
      c.height = DISPLAY_SIZE * DPR;
      c.style.width = `${DISPLAY_SIZE}px`;
      c.style.height = `${DISPLAY_SIZE}px`;
    });
    traceCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
    rodsCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Enable crisp rendering
    traceCtx.imageSmoothingEnabled = false;
    rodsCtx.imageSmoothingEnabled = false;
    
    // Better line rendering
    traceCtx.lineCap = 'round';
    traceCtx.lineJoin = 'round';
    rodsCtx.lineCap = 'round';
    rodsCtx.lineJoin = 'round';

    const cx = DISPLAY_SIZE / 2;
    const cy = DISPLAY_SIZE / 2;

    let t = 0;

    // prev positions for persistent traces (one for each mechanism)
    let prevX1 = null;
    let prevY1 = null;
    let prevX2 = null;
    let prevY2 = null;

    let rafId = 0;

    // ratio to apply to t for second mechanism (allows speed2 to be different)
    const sRatio = speed2 / speed;

    function draw() {
      // angles for mechanism 1
      const a1 = t;
      const a2 = t * Math.PI;

      // mechanism 1 positions
      const x1 = cx + innerRodLength * Math.cos(a1);
      const y1 = cy + innerRodLength * Math.sin(a1);

      const x2 = x1 + outerRodLength * Math.cos(a2);
      const y2 = y1 + outerRodLength * Math.sin(a2);

      // --- TRACE (persistent) for mechanism 1 ---
      if (prevX1 !== null && prevY1 !== null) {
        traceCtx.beginPath();
        traceCtx.moveTo(prevX1, prevY1);
        traceCtx.lineTo(x2, y2);
        traceCtx.lineWidth = 0.8; // Match math2.jsx
        traceCtx.strokeStyle = traceColor;
        traceCtx.globalAlpha = 1.0;
        traceCtx.stroke();
      }
      prevX1 = x2;
      prevY1 = y2;

      // --- SECOND MECHANISM (opposite or custom direction/speed) ---
      const b1 = t * sRatio; // scales and flips if speed2 negative
      const b2 = t * Math.PI * sRatio;

      const x1b = cx + innerRodLength2 * Math.cos(b1);
      const y1b = cy + innerRodLength2 * Math.sin(b1);

      const x2b = x1b + outerRodLength2 * Math.cos(b2);
      const y2b = y1b + outerRodLength2 * Math.sin(b2);

      // --- TRACE (persistent) for mechanism 2 ---
      if (prevX2 !== null && prevY2 !== null) {
        traceCtx.beginPath();
        traceCtx.moveTo(prevX2, prevY2);
        traceCtx.lineTo(x2b, y2b);
        traceCtx.lineWidth = 0.8; // Match math2.jsx
        traceCtx.strokeStyle = traceColor2;
        traceCtx.globalAlpha = 1.0;
        traceCtx.stroke();
      }
      prevX2 = x2b;
      prevY2 = y2b;

      // --- DRAW RODS (NON-PERSISTENT) - draw both mechanisms each frame ---
      rodsCtx.clearRect(0, 0, DISPLAY_SIZE, DISPLAY_SIZE);

      // mechanism 1 rods
      rodsCtx.lineWidth = 1.5;
      rodsCtx.strokeStyle = innerRodColor;
      rodsCtx.beginPath();
      rodsCtx.moveTo(cx, cy);
      rodsCtx.lineTo(x1, y1);
      rodsCtx.stroke();

      rodsCtx.strokeStyle = outerRodColor;
      rodsCtx.beginPath();
      rodsCtx.moveTo(x1, y1);
      rodsCtx.lineTo(x2, y2);
      rodsCtx.stroke();

      rodsCtx.beginPath();
      rodsCtx.arc(x2, y2, 2.5, 0, Math.PI * 2);
      rodsCtx.fillStyle = dotColor;
      rodsCtx.fill();

      // mechanism 2 rods (drawn on same rods canvas)
      rodsCtx.lineWidth = 1.5;
      rodsCtx.strokeStyle = innerRodColor2;
      rodsCtx.beginPath();
      rodsCtx.moveTo(cx, cy);
      rodsCtx.lineTo(x1b, y1b);
      rodsCtx.stroke();

      rodsCtx.strokeStyle = outerRodColor2;
      rodsCtx.beginPath();
      rodsCtx.moveTo(x1b, y1b);
      rodsCtx.lineTo(x2b, y2b);
      rodsCtx.stroke();

      rodsCtx.beginPath();
      rodsCtx.arc(x2b, y2b, 2.5, 0, Math.PI * 2);
      rodsCtx.fillStyle = dotColor2;
      rodsCtx.fill();

      // advance time (single t that drives both mechanisms; second uses sRatio)
      t += speed;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [
    innerRodLength,
    outerRodLength,
    innerRodColor,
    outerRodColor,
    traceColor,
    dotColor,
    speed,
    size,
    // second mech deps
    innerRodLength2,
    outerRodLength2,
    innerRodColor2,
    outerRodColor2,
    traceColor2,
    dotColor2,
    speed2,
  ]);

  return (
    <div className="relative" style={{ width: size, height: size, backgroundColor }}>
      {/* Persistent trace canvas */}
      <motion.canvas
        ref={traceRef}
        width={size}
        height={size}
        className="absolute"
        style={{ imageRendering: 'crisp-edges' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Non-persistent rods canvas */}
      <motion.canvas
        ref={rodsRef}
        width={size}
        height={size}
        className="absolute"
        style={{ imageRendering: 'crisp-edges' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}