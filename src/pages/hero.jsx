// src/pages/hero.jsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/hero/Navbar";
import StarryBackground from "../components/hero/StarryBackground";
import PiRods from "../components/hero/pi";

function useTypingEffect(text, speed = 50, delay = 800) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let i = 0;
    const startTyping = () => {
      timeout = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timeout);
          setDone(true);
        }
      }, speed);
    };
    const delayTimeout = setTimeout(startTyping, delay);
    return () => {
      clearTimeout(delayTimeout);
      clearInterval(timeout);
    };
  }, [text, speed, delay]);

  return { displayed, done };
}

// Mouse-following spotlight glow
function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[5] mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.03) 0%, transparent 70%)',
      }}
    />
  );
}

// Magnetic button effect
function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 300 });
  const springY = useSpring(y, { damping: 15, stiffness: 300 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const tagline = useTypingEffect("Full-Stack Engineer  •  DevOps  •  Medical Imaging", 40, 1200);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
      <Navbar />
      <MouseGlow />

      {/* Subtle starry background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <StarryBackground />
      </div>

      {/* PiRods — generative math art, subtle bottom-right corner */}
      <div className="absolute -bottom-[40%] -right-[15%] w-[900px] h-[900px] opacity-[0.07] z-[1] pointer-events-none">
        <PiRods
          innerRodLength={150}
          outerRodLength={170}
          speed={0.00254647908947032537230214021396}
          innerRodLength2={120}
          outerRodLength2={100}
          speed2={-0.008}
          traceColor="#22d3ee"
          traceColor2="#10b981"
          dotColor="#22d3ee"
          dotColor2="#10b981"
          size={900}
        />
      </div>

      {/* Gradient orbs for depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="py-20 sm:py-24">

          {/* Terminal greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono text-gray-400">
                ~/lucknow <span className="text-cyan-400">$</span> hello_world
              </span>
            </div>
          </motion.div>

          {/* Name — big, bold, confident */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-4">
              <motion.span
                className="inline-block text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                I build
              </motion.span>
              <br />
              <span className="gradient-text">things that</span>
              <br />
              <motion.span
                className="inline-block text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                work.
              </motion.span>
            </h1>
          </motion.div>

          {/* Typed tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-4 sm:mt-6 mb-6 sm:mb-8"
          >
            <p className="font-mono text-sm sm:text-base md:text-lg text-gray-400 flex items-center flex-wrap">
              <span className="text-cyan-400 mr-2">{'>'}</span>
              <span>{tagline.displayed}</span>
              <span className={`inline-block w-2.5 h-5 bg-cyan-400 ml-0.5 ${tagline.done ? 'cursor-blink' : ''}`} />
            </p>
          </motion.div>

          {/* Philosophy line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mb-8 sm:mb-10"
          >
            Engineer from Lucknow. I debug fast, ship faster, and have zero
            tolerance for unnecessary friction. Currently deep in DICOM pipelines
            and building tools that radiologists actually want to use.
          </motion.p>

          {/* CTA + Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            {/* Animated gradient border CTA */}
            <MagneticButton
              href="#work"
              className="relative group inline-block"
            >
              {/* <span className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity bg-[length:200%_auto] animate-shimmer" /> */}
              <span className="relative block px-6 py-3 bg-[#0a0a0a] text-sm font-semibold rounded-lg text-white group-hover:bg-transparent  transition-all duration-300">
                See my work
              </span>
            </MagneticButton>

            <div className="flex items-center gap-3">
              {/* GitHub */}
              <MagneticButton
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-500 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-lg"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </MagneticButton>
              {/* LinkedIn */}
              <MagneticButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-500 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-lg"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </MagneticButton>
              {/* Email */}
              <MagneticButton
                href="mailto:hello@example.com"
                className="p-2.5 text-gray-500 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-lg"
                aria-label="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-gray-600 font-mono">scroll</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}