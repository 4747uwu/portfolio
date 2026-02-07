// src/components/hero/math2.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function LorenzAttractor({ 
  size = 240,
  speed = 0.003,
  rotationSpeed = 0.05,
  lineColor = 'rgba(0,0,0,0.8)',
  lineWidth = 0.8,
  maxPoints = 2000,
  scale = 12,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
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

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const dt = 0.005;

    function lorenzStep(x, y, z) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      return [x + dx, y + dy, z + dz];
    }

    function project3D(x, y, z, rotation, w, h) {
      const cosY = Math.cos(rotation);
      const sinY = Math.sin(rotation);
      const xRot = x * cosY - z * sinY;
      const zRot = x * sinY + z * cosY;

      const angleX = 0.3;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const yRot = y * cosX - zRot * sinX;
      const zFinal = y * sinX + zRot * cosX;

      const distance = 600;
      const perspective = distance / (distance + zFinal);
      const s = scale * perspective;

      return {
        x: w / 2 + xRot * s,
        y: h / 2 + yRot * s,
        z: zFinal,
      };
    }

    const DPR = window.devicePixelRatio || 1;
   canvas.width = size * DPR;
canvas.height = size * DPR;
canvas.style.width = `${size}px`;
canvas.style.height = `${size}px`;
canvas.style.background = 'transparent'; // ensure CSS background is transparent
ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    let shouldRun = true;

    function startAnimation() {
      if (!shouldRun) return;

      let x = 0.1, y = 0, z = 0;
      let points = [];
      let time = 0;
      const startTime = Date.now();
      const animationDuration = 60000;

      function animate() {
        if (!shouldRun) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        ctx.clearRect(0, 0, size, size);

        const targetPoints = Math.floor(progress * maxPoints);
        while (points.length < targetPoints) {
          [x, y, z] = lorenzStep(x, y, z);
          points.push([x, y, z]);
          if (points.length > maxPoints) points.shift();
        }

        const rotation = time * rotationSpeed;
        time += speed;

        if (points.length > 1) {
          for (let i = 1; i < points.length; i++) {
            const [x1, y1, z1] = points[i - 1];
            const [x2, y2, z2] = points[i];
            
            const p1 = project3D(x1, y1, z1, rotation, size, size);
            const p2 = project3D(x2, y2, z2, rotation, size, size);

            const t = i / points.length;
            const alpha = 0.15 + t * 0.6;
            
            const color = lineColor.startsWith('rgba') 
              ? lineColor.replace(/[\d.]+\)$/, `${alpha})`)
              : `rgba(0,0,0,${alpha})`;
                
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (progress >= 1 && points.length >= maxPoints) {
          setTimeout(() => {
            if (shouldRun) {
              ctx.clearRect(0, 0, size, size);
              startAnimation();
            }
          }, 2000);
          return;
        }

        animationRef.current = requestAnimationFrame(animate);
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    startAnimation();

    return () => {
      shouldRun = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, size, speed, rotationSpeed, lineColor, lineWidth, maxPoints, scale]);

  return (
    <div ref={containerRef} style={{ width: size, height: size, overflow: 'visible', borderRadius: 8 }}>
      {isVisible && (
        <canvas
          ref={canvasRef}
          style={{ display: 'block' }}
        />
      )}
    </div>
  );
}