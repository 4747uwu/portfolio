// Japanese-inspired starry night background
import { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;

    const updateSize = () => {
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;

      canvas.width = WIDTH * DPR;
      canvas.height = HEIGHT * DPR;
      canvas.style.width = `${WIDTH}px`;
      canvas.style.height = `${HEIGHT}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      
      return { WIDTH, HEIGHT };
    };

    let { WIDTH, HEIGHT } = updateSize();

    // Generate stars
    const stars = [];
    const starCount = 300;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    // Add some larger stars (Japanese style - representing important stars)
    for (let i = 0; i < 20; i++) {
      stars.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        radius: Math.random() * 2 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        isLarge: true
      });
    }

    let frame = 0;

    function render() {
      // Clear canvas with pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      stars.forEach(star => {
        // Twinkle effect
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        ctx.globalAlpha = star.opacity * twinkle;

        // Draw star
        if (star.isLarge) {
          // Draw cross-shaped star (Japanese style)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();

          // Add cross rays
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2, star.y);
          ctx.lineTo(star.x + star.radius * 2, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2);
          ctx.lineTo(star.x, star.y + star.radius * 2);
          ctx.stroke();
        } else {
          // Regular circular star
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      frame++;
    }

    let animationId;
    function animate() {
      render();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      const newSize = updateSize();
      WIDTH = newSize.WIDTH;
      HEIGHT = newSize.HEIGHT;
      
      // Update star positions to fit new size
      stars.forEach(star => {
        star.x = (star.x / WIDTH) * newSize.WIDTH;
        star.y = (star.y / HEIGHT) * newSize.HEIGHT;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
