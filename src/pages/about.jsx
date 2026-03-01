// src/pages/about.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from 'react-countup';

const techStack = [
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'React Native', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'Docker', category: 'devops' },
  { name: 'NGINX', category: 'devops' },
  { name: 'AWS', category: 'devops' },
  { name: 'CI/CD', category: 'devops' },
  { name: 'Linux', category: 'devops' },
  { name: 'DICOM', category: 'domain' },
  { name: 'Orthanc', category: 'domain' },
  { name: 'OHIF', category: 'domain' },
  { name: 'Firebase', category: 'devops' },
];

const categoryColors = {
  frontend: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  backend: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  devops: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  domain: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

const categoryGlow = {
  frontend: 'hover:shadow-cyan-500/20 hover:border-cyan-400/40',
  backend: 'hover:shadow-emerald-500/20 hover:border-emerald-400/40',
  devops: 'hover:shadow-amber-500/20 hover:border-amber-400/40',
  domain: 'hover:shadow-rose-500/20 hover:border-rose-400/40',
};

const stats = [
  { value: 3, suffix: '+', label: 'Years Building' },
  { value: 3, suffix: '', label: 'Production Apps' },
  { value: 31, suffix: 'K+', label: 'Users Impacted' },
  { value: 5, suffix: '+', label: 'Hackathons Won' },
];

const philosophyItems = [
  { icon: '⚡', text: 'Debug fast, iterate aggressively.', accent: 'group-hover:border-cyan-500/30' },
  { icon: '🧠', text: 'Think like a product owner, code like an engineer.', accent: 'group-hover:border-emerald-500/30' },
  { icon: '🚫', text: 'Zero tolerance for unnecessary friction.', accent: 'group-hover:border-amber-500/30' },
  { icon: '🔧', text: "If it's broken at 2am, I'm fixing it at 2am.", accent: 'group-hover:border-rose-500/30' },
];

const timeline = [
  { year: '2021', event: 'Started CS Engineering, won first hackathon' },
  { year: '2022', event: 'Built PACS system, dove into DICOM & medical imaging' },
  { year: '2023', event: 'Launched Rivora — scaled to 1,400+ users' },
  { year: '2024', event: 'Shipped Breakup App (30K+ downloads), graduated 85.6%' },
  { year: '2025', event: 'Deep in production systems, mentoring, and building' },
];

// Text scramble hook
function ScrambleText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, i) => {
          if (char === ' ') return char;
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  };

  return (
    <span className={className} onMouseEnter={scramble} style={{ cursor: 'default' }}>
      {displayText}
    </span>
  );
}

// Spotlight card with mouse tracking
function SpotlightPanel({ children, className }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`relative group ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.04), transparent 60%)`
          ),
        }}
      />
      {children}
    </div>
  );
}

export default function About() {
  const [statsInView, setStatsInView] = useState(false);

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-mono text-sm">03.</span>
            <div className="w-12 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            <ScrambleText text="About Me" />
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">

          {/* Left column — Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              I'm a full-stack engineer from <span className="text-white font-medium">Lucknow</span> who
              lives deep in the production stack. My day-to-day is Orthanc configs, OHIF viewer builds,
              NGINX limits, Docker mounts, and debugging DICOM pipelines — basically whatever it takes
              to keep medical imaging systems running for the radiologists who depend on them.
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              I switch contexts easily — infra to frontend to Python to server to UX — because
              at the end of the day, I think like a <span className="text-white font-medium">product owner</span>,
              not just a coder. I've built SaaS platforms that scaled to thousands of users, shipped
              mobile apps with 30K+ downloads, and won more hackathons than I can keep track of.
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              Beyond code, I produce music, play piano, and have a bit of a creative streak that
              sneaks into everything I build. I balance hardcore backend grind with artistic curiosity — and I
              wouldn't have it any other way.
            </p>

            {/* Philosophy */}
            <div className="pt-6">
              <p className="text-xs text-gray-600 uppercase tracking-wider font-mono mb-4">How I Work</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {philosophyItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`group flex items-start gap-3 p-3 bg-white/3 rounded-lg border border-white/5 transition-all duration-300 hover:bg-white/5 ${item.accent}`}
                  >
                    <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <SpotlightPanel>
              <div className="bg-[#141414] border border-white/6 rounded-xl p-5 sm:p-6 hover:border-white/10 transition-colors duration-500">
                <p className="text-xs text-gray-600 uppercase tracking-wider font-mono mb-4">Tech Stack</p>

                {/* Category legend */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { label: 'Frontend', color: 'bg-cyan-400' },
                    { label: 'Backend', color: 'bg-emerald-400' },
                    { label: 'DevOps', color: 'bg-amber-400' },
                    { label: 'Domain', color: 'bg-rose-400' },
                  ].map(c => (
                    <div key={c.label} className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.color}`} />
                      <span className="text-[10px] text-gray-500">{c.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech grid */}
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`px-2.5 py-1 text-xs font-mono rounded-md border cursor-default transition-all duration-200 hover:shadow-lg ${categoryColors[tech.category]} ${categoryGlow[tech.category]}`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>

                {/* Mini timeline */}
                <div className="mt-6 pt-5 border-t border-white/6">
                  <p className="text-xs text-gray-600 uppercase tracking-wider font-mono mb-4">Journey</p>
                  <div className="space-y-3 relative">
                    {/* Connecting line */}
                    <div className="absolute left-[30px] top-1 bottom-1 w-px bg-gradient-to-b from-cyan-500/30 via-emerald-500/20 to-transparent" />
                    {timeline.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <span className="text-xs font-mono text-cyan-400 font-medium mt-0.5 flex-shrink-0 w-8 group-hover/item:text-cyan-300 transition-colors">
                          {item.year}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-white/10 border border-cyan-500/30 mt-1.5 flex-shrink-0 group-hover/item:bg-cyan-400/30 group-hover/item:border-cyan-400 transition-all" />
                        <span className="text-sm text-gray-400 group-hover/item:text-gray-300 transition-colors">{item.event}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightPanel>
          </motion.div>
        </div>

        {/* Stats bar with CountUp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onViewportEnter={() => setStatsInView(true)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-[#141414] border border-white/6 rounded-xl p-5 text-center group hover:border-cyan-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono gradient-text mb-1">
                {statsInView ? (
                  <CountUp end={stat.value} duration={2.5} delay={i * 0.2} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-400 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}