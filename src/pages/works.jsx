// src/pages/works.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PixelBlast from '../components/hero/background';
import Tilt from 'react-parallax-tilt';

const projects = [
  {
    id: 1,
    title: 'PACS',
    role: 'Lead Engineer',
    subtitle: 'Picture Archiving & Communication System',
    type: 'Healthcare / Medical Imaging',
    description:
      'Production PACS solution used by radiology centers to store, retrieve, and manage medical imaging data. Designed for high availability and optimized DICOM processing.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'DICOM', 'Docker', 'NGINX'],
    metrics: [
      { label: 'Daily Users', value: '120+' },
      { label: 'Files/Month', value: '50K+' },
      { label: 'Faster Loads', value: '40%' }
    ],
    highlights: [
      'DICOM viewer with zoom, pan, measurements, annotations',
      'Multi-modality: CT, MRI, X-Ray, Ultrasound',
      'HIPAA-compliant data handling and encrypted transfer',
      'Role-based access with audit logging'
    ],
    color: 'cyan',
    gradient: 'from-cyan-500/20 via-transparent to-transparent'
  },
  {
    id: 2,
    title: 'Rivora',
    role: 'Creator',
    subtitle: 'Task Management SaaS Platform',
    type: 'SaaS / Productivity',
    description:
      'Modern task management platform with real-time sync, analytics dashboards, and workflow automation for teams.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'WebSocket'],
    metrics: [
      { label: 'Active Users', value: '1,400+' },
      { label: 'Organizations', value: '20+' },
      { label: 'Productivity', value: '+22%' }
    ],
    highlights: [
      'Real-time Kanban and list views with drag-and-drop',
      'Analytics dashboard with team performance metrics',
      'Automated task reminders and daily summaries',
      'Collaborative workspaces with role-based permissions'
    ],
    color: 'emerald',
    gradient: 'from-emerald-500/20 via-transparent to-transparent'
  },
  {
    id: 3,
    title: 'Breakup App',
    role: 'Creator',
    subtitle: 'Emotional Wellness Mobile App',
    type: 'Mobile / Lifestyle',
    description:
      'Mobile app helping users navigate breakups through guided exercises, AI-assisted mood tracking, and anonymous community support.',
    tech: ['React Native', 'Firebase', 'Node.js', 'AI/ML'],
    metrics: [
      { label: 'Downloads', value: '30K+' },
      { label: 'Avg Session', value: '6.4m' },
      { label: 'Score Improvement', value: '+18%' }
    ],
    highlights: [
      'AI-assisted mood insights and personalized exercises',
      'Anonymous community sharing and discussion',
      'Gamified healing progress system',
      'Daily self-care reminders and habit tracking'
    ],
    color: 'amber',
    gradient: 'from-amber-500/20 via-transparent to-transparent'
  }
];

const colorMap = {
  cyan: {
    border: 'hover:border-cyan-500/30',
    tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    badge: 'bg-cyan-500/15 text-cyan-300',
    metric: 'text-cyan-400',
    dot: 'bg-cyan-400',
    glow: 'group-hover:shadow-cyan-500/10',
    glowBorder: 'rgba(34, 211, 238, 0.3)',
  },
  emerald: {
    border: 'hover:border-emerald-500/30',
    tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    badge: 'bg-emerald-500/15 text-emerald-300',
    metric: 'text-emerald-400',
    dot: 'bg-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10',
    glowBorder: 'rgba(16, 185, 129, 0.3)',
  },
  amber: {
    border: 'hover:border-amber-500/30',
    tag: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    badge: 'bg-amber-500/15 text-amber-300',
    metric: 'text-amber-400',
    dot: 'bg-amber-400',
    glow: 'group-hover:shadow-amber-500/10',
    glowBorder: 'rgba(245, 158, 11, 0.3)',
  }
};

// Mouse spotlight effect
function SpotlightCard({ children, className, glowColor }) {
  const divRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor || 'rgba(34, 211, 238, 0.06)'}, transparent 60%)`
          ),
        }}
      />
      {children}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const colors = colorMap[project.color];

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor={colors.glowBorder}
      glarePosition="all"
      glareBorderRadius="12px"
      scale={1.01}
      transitionSpeed={1500}
      className="w-full"
    >
      <SpotlightCard glowColor={`${colors.glowBorder.replace('0.3', '0.08')}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => setExpanded(!expanded)}
          className={`group relative bg-[#141414] border border-white/6 rounded-xl p-5 sm:p-6 md:p-7 cursor-pointer transition-all duration-300 ${colors.border} hover:bg-[#1a1a1a] ${colors.glow} hover:shadow-xl overflow-hidden`}
        >
          {/* Animated gradient corner */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

          {/* Header */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded ${colors.badge}`}>
                  {project.role}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">{project.type}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{project.subtitle}</p>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-500 group-hover:text-white transition-colors flex-shrink-0 ml-4"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4 relative z-10">{project.description}</p>

          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
            {project.metrics.map((m, i) => (
              <div key={i} className="bg-white/3 rounded-lg p-2.5 text-center border border-white/3 hover:border-white/8 transition-colors">
                <div className={`text-lg sm:text-xl font-bold font-mono ${colors.metric}`}>{m.value}</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wider mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-2 relative z-10">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[11px] font-mono rounded border ${colors.tag} transition-all hover:scale-105`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expandable highlights */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden relative z-10"
              >
                <div className="pt-4 mt-4 border-t border-white/6">
                  <p className="text-[11px] text-gray-600 uppercase tracking-wider font-mono mb-3">Key Features</p>
                  <div className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-1.5 flex-shrink-0`} />
                        <span className="text-sm text-gray-300">{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </SpotlightCard>
    </Tilt>
  );
}

// Text scramble effect for section header
function ScrambleText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, i) => {
          if (char === ' ' || char === "'") return char;
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

export default function Works() {
  return (
    <section id="work" className="relative py-20 sm:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* PixelBlast — subtle interactive WebGL particle texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#22d3ee"
          patternScale={4}
          patternDensity={0.3}
          pixelSizeJitter={0.4}
          enableRipples={false}
          speed={0.3}
          edgeFade={0.4}
          transparent
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cyan-400 font-mono text-sm">02.</span>
            <div className="w-12 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            <ScrambleText text="Things I've Built" />
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl">
            Production systems, SaaS platforms, and apps — each solving real problems for real users.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* PACS takes full width on large screens */}
          <div className="lg:col-span-2">
            <ProjectCard project={projects[0]} index={0} />
          </div>
          {/* Rivora and Breakup App side by side */}
          <ProjectCard project={projects[1]} index={1} />
          <ProjectCard project={projects[2]} index={2} />
        </div>
      </div>
    </section>
  );
}