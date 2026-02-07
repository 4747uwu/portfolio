// src/pages/works.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelBlast from '../components/hero/background';
import MetricsDisplay from '../components/hero/MetricDisplay';
import StarryBackground from '../components/hero/StarryBackground';
import CircularBloomFireworks from '../components/hero/fireworks';

const projects = [
  {
    id: 1,
    title: 'PACS',
    subtitle: 'Picture Archiving and Communication System',
    type: 'Healthcare / Medical Imaging Software',
    tech: 'DICOM, JavaScript, React, Node.js, PostgreSQL',
    description:
      'A full-featured PACS solution used by radiology centers to store, retrieve, and manage medical imaging data securely. Designed for high availability and optimized DICOM processing, enabling hospitals to streamline diagnosis workflows.',
    features: [
      'DICOM image storage and retrieval with optimized load times (up to 40% faster)',
      'User authentication and role-based access with audit logging',
      'Advanced search and filtering across thousands of studies',
      'Web-based viewer with zoom, pan, measurements, and annotation tools',
      'Multi-modality support: CT, MRI, X-Ray, Ultrasound',
      'HIPAA-like data handling and secure encrypted transfer'
    ],
    metrics: {
      users: 'Used by 120+ daily radiologists/clinicians',
      performance: 'Processes and indexes 50,000+ DICOM files per month',
      impact: 'Reduced diagnostic turnaround time by ~35%'
    }
  },
  {
    id: 2,
    title: 'Rivora',
    subtitle: 'Task Management Platform',
    type: 'SaaS / Productivity',
    tech: 'React, Node.js, PostgreSQL, MongoDB, Docker',
    description:
      'Rivora is a modern SaaS platform designed to streamline task management for teams. It provides advanced analytics, automation, and collaboration features to improve productivity and visibility across workflows.',
    features: [
      'Real-time notifications for task updates and deadlines',
      'Analytics dashboard with productivity insights and team performance metrics',
      'Collaborative workspaces with role-based permissions',
      'Drag-and-drop task management with Kanban and List views',
      'Automated task reminders and daily summaries'
    ],
    metrics: {
      users: '1400+ active users across 20+ organizations',
      performance: 'Handles 50,000+ tasks/month with real-time sync',
      impact: 'Improves team productivity by an estimated 22%'
    }
  },
  {
    id: 3,
    title: 'Breakup App',
    subtitle: 'Emotional Wellness Platform',
    type: 'Social / Lifestyle App',
    tech: 'React Native, Firebase, Node.js',
    description:
      'A mobile emotional-wellness app helping users navigate breakups through guided exercises, mood tracking, self-care reminders, and a supportive anonymous community.',
    features: [
      'Personalized advice and coping exercises based on user mood',
      'Daily mood tracking and journals with AI-assisted insights',
      'Anonymous community sharing and discussion spaces',
      'Self-care reminders and habit tracking',
      'Gamified healing progress system'
    ],
    metrics: {
      users: '30,000+ downloads in first 90 days',
      engagement: 'Average session length: 6.4 minutes',
      impact: 'Helped improve reported emotional scores by ~18% over 30 days'
    }
  }
];


export default function Works() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = projects[currentIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen w-full bg-black py-3 md:py-4 lg:py-6 overflow-hidden"
    >
      {/* Starry Background - Pure black with twinkling stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarryBackground />
      </div>
      
      {/* Fireworks background layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <CircularBloomFireworks />
      </div>
      
      {/* Subtle PixelBlast background with black theme */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#ef4444"
          patternScale={5}
          patternDensity={0.2}
          pixelSizeJitter={0.5}
          enableRipples={false}
          transparent
          edgeFade={0.5}
        />
      </div>
      
      {/* Carbon fiber texture overlay (subtle) */}
      <div className="absolute inset-0 z-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
      }} />

      {/* Vertical accent lines - Japanese shoji screen inspired - hidden on mobile */}
      <div className="hidden md:block absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent z-0" />
      <div className="hidden md:block absolute right-6 lg:right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent z-0" />
      
      {/* Racing stripes - Japanese car culture (JDM inspired) - responsive */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent z-0 origin-left" 
      />
      
      {/* Main container - ultra compact */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Header Section - Japanese car culture inspired - responsive */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 md:mb-6 lg:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2 md:gap-4 lg:gap-5">
            {/* Vertical Japanese-style text indicator with speed lines - hidden on mobile */}
            <div className="hidden sm:flex flex-col items-center gap-1 relative">
              <motion.div 
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-8 md:h-10 bg-gradient-to-b from-red-500 to-orange-500" 
              />
              <span className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.3em] writing-mode-vertical">WORKS</span>
              {/* Speed indicator lines (JDM style) */}
              <div className="absolute -right-2 top-3 flex flex-col gap-0.5">
                <div className="w-2 md:w-3 h-px bg-red-500/50" />
                <div className="w-3 md:w-4 h-px bg-red-500/30" />
                <div className="w-1.5 md:w-2 h-px bg-red-500/20" />
              </div>
            </div>
            
            <div>
              <motion.h1 
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(239, 68, 68, 0.3)",
                    "0 0 30px rgba(239, 68, 68, 0.2)",
                    "0 0 20px rgba(239, 68, 68, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-0.5 md:mb-1 tracking-tight"
              >
                作品集
              </motion.h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 tracking-wide">Selected Projects</p>
              {/* Animated racing stripes */}
              <div className="flex gap-1 mt-1 md:mt-2">
                <motion.div 
                  animate={{ scaleX: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 md:w-12 lg:w-14 h-0.5 bg-red-500 origin-left" 
                />
                <motion.div 
                  animate={{ scaleX: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-6 md:w-8 lg:w-10 h-0.5 bg-orange-500 origin-left" 
                />
                <motion.div 
                  animate={{ scaleX: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="w-4 md:w-6 h-0.5 bg-violet-500 origin-left" 
                />
              </div>
            </div>
          </div>

          {/* Project counter with speedometer style - compact */}
          <div className="text-right relative">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"
            />
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em]">
              / {String(projects.length).padStart(2, '0')}
            </div>
          </div>
        </motion.div>

        {/* Project Display - Card Grid Layout - Ultra compact and responsive */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-5"
          >
            {/* Left Side - Project Info - full width on mobile */}
            <div className="lg:col-span-5 space-y-3 md:space-y-4 lg:space-y-5">
              {/* Project Title Card - compact */}
              <div className="bg-black/80 backdrop-blur-2xl border-l-2 md:border-l-3 border-red-500 border-r border-r-white/10 border-t border-t-white/10 border-b border-b-white/10 p-3 sm:p-4 md:p-5 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-red-500/20 to-transparent" />
                
                <div className="relative z-10">
                  <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-1.5 md:mb-2">
                    {currentProject.type}
                  </span>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
                    {currentProject.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 md:mb-4">
                    {currentProject.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    {currentProject.tech.split(', ').map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-1.5 md:px-2 py-0.5 bg-black/60 border border-red-500/30 text-[9px] md:text-[10px] text-gray-300 hover:border-red-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description - compact */}
              <div className="bg-black/80 backdrop-blur-2xl border-l-2 md:border-l-3 border-violet-500 border-r border-r-white/10 border-t border-t-white/10 border-b border-b-white/10 p-3 sm:p-4 md:p-5 shadow-2xl">
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-3 md:mb-4">
                  {currentProject.description}
                </p>
                
                {/* Metrics */}
                <MetricsDisplay metrics={currentProject.metrics} />
              </div>
            </div>

            {/* Right Side - Features Grid - full width on mobile, compact */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-black/80 backdrop-blur-2xl border-l-2 md:border-l-3 border-orange-500 border-r border-r-white/10 border-t border-t-white/10 border-b border-b-white/10 p-3 sm:p-4 md:p-5 h-full shadow-2xl">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="w-6 md:w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                  <h3 className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em]">Key Features</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {currentProject.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-black/60 border border-white/20 p-2 md:p-3 hover:border-red-500/70 hover:bg-black/80 transition-all group"
                    >
                      <div className="flex items-start gap-1.5 md:gap-2">
                        <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-red-500/30 text-red-400 text-[9px] md:text-[10px] font-bold flex-shrink-0 mt-0.5 border border-red-500/50">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          {feature}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation - ultra compact and responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 md:mt-6 lg:mt-8"
        >
          {/* Progress bar - JDM speedometer inspired - full width on mobile */}
          <div className="flex-1 max-w-full sm:max-w-md">
            <div className="flex gap-1 md:gap-1.5">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="relative h-0.5 md:h-1 flex-1 bg-black/60 border border-white/20 overflow-hidden group hover:border-red-500/50 transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-violet-500"
                    initial={false}
                    animate={{
                      scaleX: idx === currentIndex ? 1 : 0,
                      originX: 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons - JDM racing inspired - responsive */}
          <div className="flex gap-2 md:gap-3 justify-center sm:justify-start">
            <motion.button
              onClick={handlePrev}
              whileHover={{ x: -8, boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/5 backdrop-blur-xl border-l-2 md:border-l-3 border-l-red-500 border-r border-r-white/10 border-t border-t-white/10 border-b border-b-white/10 hover:border-l-red-400 flex items-center justify-center text-white transition-all relative overflow-hidden group"
            >
              {/* Racing stripe animation on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              whileHover={{ x: 8, boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)" }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white transition-all hover:shadow-lg hover:shadow-red-500/50 relative overflow-hidden group border-l-2 md:border-l-3 border-l-red-600"
            >
              {/* Speed lines animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative corner elements with racing accent - hidden on mobile, smaller on tablet */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden md:block absolute top-8 md:top-10 lg:top-12 left-0 w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 border-t-2 border-l-2 border-red-500/30 z-0" 
      />
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hidden md:block absolute bottom-8 md:bottom-10 lg:bottom-12 right-0 w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 border-b-2 border-r-2 border-violet-500/30 z-0" 
      />
    </motion.div>
  );
}