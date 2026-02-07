import { useEffect, useRef, useState } from "react";
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
  renderScale = 1,

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
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Don't render if not visible

    const traceCanvas = traceRef.current;
    const rodsCanvas = rodsRef.current;
    if (!traceCanvas || !rodsCanvas) return;

    const traceCtx = traceCanvas.getContext("2d", { alpha: true });
    const rodsCtx = rodsCanvas.getContext("2d", { alpha: true });
    if (!traceCtx || !rodsCtx) return;

    // combine devicePixelRatio with additional renderScale to control internal resolution
    const DPR = (window.devicePixelRatio || 1) * Math.max(0.1, renderScale);
    const DISPLAY_SIZE = size;

    // set both canvases for crisp rendering at the chosen backing resolution
    [traceCanvas, rodsCanvas].forEach((c) => {
      c.width = Math.round(DISPLAY_SIZE * DPR);
      c.height = Math.round(DISPLAY_SIZE * DPR);
      c.style.width = `${DISPLAY_SIZE}px`;  // CSS size stays as `size`
      c.style.height = `${DISPLAY_SIZE}px`;
    });

    // transform drawing coordinates to CSS pixels
    traceCtx.setTransform(DPR, 0, 0, DPR, 0, 0);
    rodsCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // crisp rendering settings
    traceCtx.imageSmoothingEnabled = false;
    rodsCtx.imageSmoothingEnabled = false;
    traceCtx.lineCap = "round";
    traceCtx.lineJoin = "round";
    rodsCtx.lineCap = "round";
    rodsCtx.lineJoin = "round";

    const cx = DISPLAY_SIZE / 2;
    const cy = DISPLAY_SIZE / 2;

    let t = 0;
    let prevX1 = null;
    let prevY1 = null;
    let prevX2 = null;
    let prevY2 = null;
    let rafId = 0;
    const sRatio = speed2 / speed;

    function draw() {
      const a1 = t;
      const a2 = t * Math.PI;

      const x1 = cx + innerRodLength * Math.cos(a1);
      const y1 = cy + innerRodLength * Math.sin(a1);

      const x2 = x1 + outerRodLength * Math.cos(a2);
      const y2 = y1 + outerRodLength * Math.sin(a2);

      if (prevX1 !== null && prevY1 !== null) {
        traceCtx.beginPath();
        traceCtx.moveTo(prevX1, prevY1);
        traceCtx.lineTo(x2, y2);
        traceCtx.lineWidth = 0.8; // match math2.jsx for consistency
        traceCtx.strokeStyle = traceColor;
        traceCtx.globalAlpha = 1.0;
        traceCtx.stroke();
      }
      prevX1 = x2;
      prevY1 = y2;

      const b1 = t * sRatio;
      const b2 = t * Math.PI * sRatio;

      const x1b = cx + innerRodLength2 * Math.cos(b1);
      const y1b = cy + innerRodLength2 * Math.sin(b1);

      const x2b = x1b + outerRodLength2 * Math.cos(b2);
      const y2b = y1b + outerRodLength2 * Math.sin(b2);

      if (prevX2 !== null && prevY2 !== null) {
        traceCtx.beginPath();
        traceCtx.moveTo(prevX2, prevY2);
        traceCtx.lineTo(x2b, y2b);
        traceCtx.lineWidth = 0.8; // match math2.jsx
        traceCtx.strokeStyle = traceColor2;
        traceCtx.globalAlpha = 1.0;
        traceCtx.stroke();
      }
      prevX2 = x2b;
      prevY2 = y2b;

      rodsCtx.clearRect(0, 0, DISPLAY_SIZE, DISPLAY_SIZE);

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

      t += speed;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [
    isVisible,
    innerRodLength,
    outerRodLength,
    innerRodColor,
    outerRodColor,
    traceColor,
    dotColor,
    speed,
    size,
    renderScale,
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
    <div ref={containerRef} className="relative" style={{ width: size, height: size, backgroundColor }}>
      {isVisible && (
        <>
          <motion.canvas
            ref={traceRef}
            width={size}
            height={size}
            className="absolute"
            style={{ imageRendering: "crisp-edges", top: 0, left: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.canvas
            ref={rodsRef}
            width={size}
            height={size}
            className="absolute"
            style={{ imageRendering: "crisp-edges", top: 0, left: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </>
      )}
    </div>
  );
}