import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function PiRods({
  innerRodLength = 120,
  outerRodLength = 80,
  innerRodColor = "white",
  outerRodColor = "white",
  traceColor = "#ff00ff",
  dotColor = "#ff00ff",
  speed = 0.01,
  size = 600,
  backgroundColor = "transparent",
}) {
  const traceRef = useRef(null);
  const rodsRef = useRef(null);

  useEffect(() => {
    const traceCanvas = traceRef.current;
    const rodsCanvas = rodsRef.current;
    if (!traceCanvas || !rodsCanvas) return;

    const traceCtx = traceCanvas.getContext("2d");
    const rodsCtx = rodsCanvas.getContext("2d");
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

    const cx = DISPLAY_SIZE / 2;
    const cy = DISPLAY_SIZE / 2;

    let t = 0;
    let prevX = null;
    let prevY = null;

    let rafId = 0;

    function draw() {
      const a1 = t;
      const a2 = t * Math.PI;

      const x1 = cx + innerRodLength * Math.cos(a1);
      const y1 = cy + innerRodLength * Math.sin(a1);

      const x2 = x1 + outerRodLength * Math.cos(a2);
      const y2 = y1 + outerRodLength * Math.sin(a2);
// --- TRACE (persistent) - DARKER medium preset ---
if (prevX !== null && prevY !== null) {
  traceCtx.beginPath();
  traceCtx.moveTo(prevX, prevY);
  traceCtx.lineTo(x2, y2);
  traceCtx.lineWidth = 1.0;           // thicker trace
  traceCtx.strokeStyle = '#000000';   // dark black
  traceCtx.globalAlpha = 0.95;        // almost fully opaque
  traceCtx.stroke();
  traceCtx.globalAlpha = 1;
}
prevX = x2;
prevY = y2;

// --- DRAW RODS (NON-PERSISTENT) - DARKER rods ---
rodsCtx.clearRect(0, 0, DISPLAY_SIZE, DISPLAY_SIZE);

rodsCtx.lineWidth = 1.5;
rodsCtx.strokeStyle = innerRodColor || '#111';

// inner rod
rodsCtx.beginPath();
rodsCtx.moveTo(cx, cy);
rodsCtx.lineTo(x1, y1);
rodsCtx.stroke();

// outer rod
rodsCtx.strokeStyle = outerRodColor || '#111';
rodsCtx.beginPath();
rodsCtx.moveTo(x1, y1);
rodsCtx.lineTo(x2, y2);
rodsCtx.stroke();

// dot - darker and slightly larger
rodsCtx.beginPath();
rodsCtx.arc(x2, y2, 2.5, 0, Math.PI * 2);
rodsCtx.fillStyle = dotColor || '#000';
rodsCtx.fill();
      t += speed;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [innerRodLength, outerRodLength, innerRodColor, outerRodColor, traceColor, dotColor, speed, size]);

  return (
    <div className="relative" style={{ width: size, height: size, backgroundColor }}>
      {/* Persistent trace canvas */}
      <motion.canvas
        ref={traceRef}
        width={size}
        height={size}
        className="absolute"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}