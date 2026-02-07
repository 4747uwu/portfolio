// src/components/hero/AnimatedGradient.jsx
import { useEffect, useRef } from 'react';

export default function AnimatedGradient() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Flowing silk-like gradient 1 - Green to Orange
      const gradient1 = ctx.createRadialGradient(
        width * (0.3 + Math.sin(time * 0.0003) * 0.3),
        height * (0.3 + Math.cos(time * 0.0004) * 0.3),
        0,
        width * 0.5,
        height * 0.5,
        width * 0.9
      );
      
      gradient1.addColorStop(0, `rgba(16, 185, 129, ${0.5 + Math.sin(time * 0.0008) * 0.2})`); // emerald-500
      gradient1.addColorStop(0.3, `rgba(52, 211, 153, ${0.4 + Math.cos(time * 0.001) * 0.15})`); // emerald-400
      gradient1.addColorStop(0.6, `rgba(251, 191, 36, ${0.4 + Math.sin(time * 0.0009) * 0.15})`); // amber-400
      gradient1.addColorStop(1, `rgba(249, 115, 22, ${0.3})`); // orange-600

      // Flowing silk-like gradient 2 - Orange to Green (reverse flow)
      const gradient2 = ctx.createRadialGradient(
        width * (0.7 + Math.cos(time * 0.0005) * 0.3),
        height * (0.6 + Math.sin(time * 0.0003) * 0.3),
        0,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      
      gradient2.addColorStop(0, `rgba(251, 146, 60, ${0.5 + Math.cos(time * 0.0011) * 0.2})`); // orange-400
      gradient2.addColorStop(0.4, `rgba(251, 191, 36, ${0.4 + Math.sin(time * 0.0007) * 0.15})`); // amber-400
      gradient2.addColorStop(0.7, `rgba(34, 197, 94, ${0.4 + Math.cos(time * 0.0013) * 0.15})`); // green-500
      gradient2.addColorStop(1, `rgba(5, 150, 105, ${0.3})`); // emerald-600

      // Subtle third gradient for depth and flow
      const gradient3 = ctx.createRadialGradient(
        width * (0.5 + Math.sin(time * 0.0006) * 0.2),
        height * (0.8 + Math.cos(time * 0.0005) * 0.2),
        0,
        width * 0.3,
        height * 0.3,
        width * 0.6
      );
      
      gradient3.addColorStop(0, `rgba(254, 215, 170, ${0.3 + Math.sin(time * 0.001) * 0.1})`); // peach
      gradient3.addColorStop(0.5, `rgba(134, 239, 172, ${0.25 + Math.cos(time * 0.0012) * 0.1})`); // light green
      gradient3.addColorStop(1, `rgba(6, 78, 59, ${0.2})`); // dark emerald

      // Base gradient - dark with green-orange undertones
      const baseGradient = ctx.createLinearGradient(0, 0, width, height);
      baseGradient.addColorStop(0, '#064e3b'); // emerald-900
      baseGradient.addColorStop(0.5, '#1e293b'); // slate-800
      baseGradient.addColorStop(1, '#7c2d12'); // orange-900

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // Blend gradients with screen mode for luminous silk effect
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighten';
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';

      time += 16;
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(80px)' }}
    />
  );
}