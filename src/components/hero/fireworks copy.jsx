import { useEffect, useRef } from "react";

export default function CircularBloomFireworks() {
  const traceRef = useRef(null);
  const liveRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const trace = traceRef.current;
    const live = liveRef.current;
    const container = containerRef.current;
    if (!trace || !live || !container) return;

    const DPR = window.devicePixelRatio || 1;
    
    // Get actual viewport size
    const updateSize = () => {
      const WIDTH = window.innerWidth;
      const HEIGHT = window.innerHeight;

      trace.width = WIDTH * DPR;
      trace.height = HEIGHT * DPR;
      live.width = WIDTH * DPR;
      live.height = HEIGHT * DPR;

      trace.style.width = `${WIDTH}px`;
      trace.style.height = `${HEIGHT}px`;
      live.style.width = `${WIDTH}px`;
      live.style.height = `${HEIGHT}px`;

      return { WIDTH, HEIGHT };
    };

    let { WIDTH, HEIGHT } = updateSize();

    const tctx = trace.getContext("2d");
    const lctx = live.getContext("2d");
    if (!tctx || !lctx) return;

    tctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    lctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    tctx.fillStyle = "#fff";
    tctx.fillRect(0, 0, WIDTH, HEIGHT);

    const TIME_SCALE = 0.6;

    let rockets = [];
    let particles = [];
    let nextLaunchTime = 0;
    let raf = 0;

    function scheduleNextLaunch(now) {
      nextLaunchTime = now + 2000 + Math.random() * 3000;
    }

    function launchRocket() {
      if (rockets.length >= 3) return;

      const z = Math.random();
      const targetY = HEIGHT * (0.1 + Math.random() * 0.2);

      rockets.push({
        x: Math.random() * WIDTH,
        y: HEIGHT + 40,
        z,
        targetY,
        speed: (2.2 + z * 1.8) * TIME_SCALE,
        vx: (Math.random() - 0.5) * 0.5,
        trail: []
      });
    }

    function explode(r) {
      const fillCount = 800 + Math.floor(300 * r.z);
      const maxRadius = 80 + r.z * 120;
      const expandDuration = 1200;
      const now = performance.now();

      for (let i = 0; i < fillCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const targetRadius = Math.random() * maxRadius;
        particles.push({
          cx: r.x,
          cy: r.y,
          z: r.z,
          angle,
          radius: 0,
          targetRadius,
          born: now + Math.random() * 200,
          expandDuration,
          life: 1
        });
      }
    }

    function update() {
      tctx.fillStyle = "rgba(255,255,255,0.88)";
      tctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        r.x += r.vx;
        r.y -= r.speed;

        tctx.strokeStyle = "#000";
        tctx.lineWidth = 1.5 + r.z * 1.5;
        tctx.beginPath();
        r.trail.forEach((p, j) =>
          j === 0 ? tctx.moveTo(p.x, p.y) : tctx.lineTo(p.x, p.y)
        );
        tctx.stroke();

        if (r.y <= r.targetY) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = performance.now() - p.born;

        if (age >= 0 && age < p.expandDuration) {
          const t = age / p.expandDuration;
          p.radius = p.targetRadius * (1 - Math.pow(1 - t, 3));
        } else if (age >= p.expandDuration) {
          p.radius = p.targetRadius;
          p.life = 1 - (age - p.expandDuration) / 2000;
        }

        if (p.life <= 0) particles.splice(i, 1);
      }
    }

    function render() {
      lctx.clearRect(0, 0, WIDTH, HEIGHT);

      rockets.forEach(r => {
        const s = 3 + r.z * 3;
        lctx.fillStyle = "#000";
        lctx.beginPath();
        lctx.arc(r.x, r.y, s, 0, Math.PI * 2);
        lctx.fill();
      });

      particles.forEach(p => {
        const x = p.cx + Math.cos(p.angle) * p.radius;
        const y = p.cy + Math.sin(p.angle) * p.radius;
        const s = 0.8 + p.z * 1.2;
        lctx.globalAlpha = p.life;
        lctx.fillStyle = "#000";
        lctx.beginPath();
        lctx.arc(x, y, s, 0, Math.PI * 2);
        lctx.fill();
      });
      lctx.globalAlpha = 1;
    }

    function loop(ts) {
      if (ts > nextLaunchTime && rockets.length < 3) {
        launchRocket();
        scheduleNextLaunch(ts);
      }
      update();
      render();
      raf = requestAnimationFrame(loop);
    }

    // Handle window resize
    const handleResize = () => {
      const newSize = updateSize();
      WIDTH = newSize.WIDTH;
      HEIGHT = newSize.HEIGHT;
      tctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      lctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      tctx.fillStyle = "#fff";
      tctx.fillRect(0, 0, WIDTH, HEIGHT);
    };

    window.addEventListener('resize', handleResize);

    // Start with a few rockets
    launchRocket();
    setTimeout(() => launchRocket(), 500);
    scheduleNextLaunch(0);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <canvas 
        ref={traceRef} 
        className="absolute inset-0"
      />
      <canvas 
        ref={liveRef} 
        className="absolute inset-0"
      />
    </div>
  );
}
