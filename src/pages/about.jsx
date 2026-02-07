// src/pages/about.jsx - Minimalistic About page with real data
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TimelineBar from "../components/hero/TimelineBar";
import CircularBloomFireworks from "../components/hero/fireworks";

export default function About() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: "personal",
      title: "Personal",
      kanji: "私",
      icon: "✦",
      summary: {
        title: "My Journey",
        description: "A passionate developer and music enthusiast. From academic achievements to winning hackathons, my journey has been driven by curiosity, creativity, and the desire to build impactful solutions.",
        highlights: [
          { label: "Education", value: "85.6%" },
          { label: "Hackathons Won", value: "5+" },
          { label: "Music", value: "Piano" },
          { label: "Languages", value: "3" }
        ]
      },
      timeline: [
        {
          year: 2017,
          month: 5,
          title: "10th Board - 91.2%",
          description: "Completed secondary education with distinction, showing strong academic foundation.",
          icon: "📚",
          tags: ["Education", "Achievement"]
        },
        {
          year: 2019,
          month: 5,
          title: "12th Board - 80%",
          description: "Higher secondary education with focus on science and mathematics.",
          icon: "🎓",
          tags: ["Education", "Science"]
        },
        {
          year: 2020,
          month: 8,
          title: "Started Music",
          description: "Began learning piano and music composition as a creative outlet.",
          icon: "🎹",
          tags: ["Music", "Piano", "Creative"]
        },
        {
          year: 2021,
          month: 3,
          title: "College Admission",
          description: "Joined engineering program, pursuing Computer Science.",
          icon: "🏛️",
          tags: ["College", "CS"]
        },
        {
          year: 2021,
          month: 11,
          title: "First Hackathon Win",
          description: "Won first place at college hackathon with innovative web app.",
          icon: "🏆",
          tags: ["Hackathon", "Winner"]
        },
        {
          year: 2022,
          month: 4,
          title: "Tech Fest Victory",
          description: "Secured top position at inter-college technical fest.",
          icon: "🥇",
          tags: ["Competition", "Tech"]
        },
        {
          year: 2022,
          month: 9,
          title: "Music Performance",
          description: "First public piano performance at college cultural event.",
          icon: "🎵",
          tags: ["Music", "Performance"]
        },
        {
          year: 2023,
          month: 2,
          title: "Hackathon Mentor",
          description: "Started mentoring junior students in hackathons.",
          icon: "👨‍🏫",
          tags: ["Mentor", "Leadership"]
        },
        {
          year: 2023,
          month: 7,
          title: "National Hackathon",
          description: "Placed in top 3 at national-level 24-hour hackathon.",
          icon: "🌟",
          tags: ["National", "Achievement"]
        },
        {
          year: 2024,
          month: 1,
          title: "Music Production",
          description: "Started creating and producing original music tracks.",
          icon: "🎧",
          tags: ["Music", "Production"]
        },
        {
          year: 2024,
          month: 6,
          title: "College Graduation",
          description: "Graduated with 85.6% in Computer Science Engineering.",
          icon: "🎓",
          tags: ["Graduation", "Achievement"]
        },
        {
          year: 2025,
          month: 3,
          title: "Hackathon Organizer",
          description: "Organized college hackathon with 200+ participants.",
          icon: "🎯",
          tags: ["Organizer", "Leadership"]
        }
      ]
    },
    {
      id: "skills",
      title: "Skills",
      kanji: "技",
      icon: "⚙",
      summary: {
        title: "Technical Expertise",
        description: "Proficient in modern web technologies, cloud platforms, and development best practices. Continuously learning and adapting to new technologies and frameworks to build scalable applications.",
        highlights: [
          { label: "Frontend", value: "React" },
          { label: "Backend", value: "Node.js" },
          { label: "Database", value: "SQL" },
          { label: "Cloud", value: "AWS" }
        ]
      },
      timeline: [
        {
          year: 2021,
          month: 8,
          title: "Frontend Development",
          description: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion.",
          icon: "🎨",
          tags: ["React", "Next.js", "TypeScript"]
        },
        {
          year: 2021,
          month: 11,
          title: "JavaScript Mastery",
          description: "ES6+, Async/Await, Promises, Modern JavaScript patterns.",
          icon: "⚡",
          tags: ["JavaScript", "ES6+"]
        },
        {
          year: 2022,
          month: 1,
          title: "Backend Development",
          description: "Node.js, Express, REST APIs, GraphQL, Microservices.",
          icon: "🔧",
          tags: ["Node.js", "Express", "APIs"]
        },
        {
          year: 2022,
          month: 4,
          title: "Databases",
          description: "PostgreSQL, MongoDB, Redis, Database Design, Optimization.",
          icon: "🗄️",
          tags: ["PostgreSQL", "MongoDB", "Redis"]
        },
        {
          year: 2022,
          month: 8,
          title: "Cloud & Infrastructure",
          description: "AWS, Docker, Kubernetes, CI/CD, Nginx, Load Balancing.",
          icon: "☁️",
          tags: ["AWS", "Docker", "K8s"]
        },
        {
          year: 2023,
          month: 2,
          title: "Mobile Development",
          description: "React Native, Firebase, Mobile UI/UX, App Deployment.",
          icon: "📱",
          tags: ["React Native", "Firebase"]
        },
        {
          year: 2023,
          month: 7,
          title: "Testing & Quality",
          description: "Jest, React Testing Library, E2E Testing, TDD.",
          icon: "✓",
          tags: ["Jest", "Testing", "TDD"]
        },
        {
          year: 2024,
          month: 1,
          title: "DevOps & Automation",
          description: "GitHub Actions, Jenkins, Terraform, Monitoring, Logging.",
          icon: "⚡",
          tags: ["CI/CD", "Automation", "DevOps"]
        },
        {
          year: 2024,
          month: 6,
          title: "Design & Animation",
          description: "Figma, Canvas API, WebGL, Creative Coding, UI/UX.",
          icon: "✨",
          tags: ["Design", "Animation", "UI/UX"]
        },
        {
          year: 2024,
          month: 10,
          title: "System Design",
          description: "Architecture patterns, Scalability, Performance optimization.",
          icon: "🏗️",
          tags: ["Architecture", "Scale"]
        }
      ]
    },
    {
      id: "work",
      title: "Experience",
      kanji: "経験",
      icon: "◆",
      summary: {
        title: "Professional Work",
        description: "Experience building production-ready applications for healthcare, productivity, and social impact. Delivered projects serving 30,000+ users with focus on performance, scalability, and user experience.",
        highlights: [
          { label: "Projects", value: "3" },
          { label: "Users", value: "31.5k+" },
          { label: "Uptime", value: "99.9%" },
          { label: "Performance", value: "+40%" }
        ]
      },
      timeline: [
        {
          year: 2022,
          month: 6,
          title: "PACS Project Start",
          description: "Started developing Picture Archiving and Communication System for healthcare.",
          icon: "🏥",
          tags: ["React", "DICOM", "Healthcare", "TypeScript"],
          stats: [
            { label: "Files Handled", value: "50k+" },
            { label: "Radiologists", value: "120+" }
          ],
          details: [
            "Built advanced DICOM viewer with measurement tools",
            "Implemented real-time collaboration features",
            "Optimized for large medical imaging files"
          ]
        },
        {
          year: 2022,
          month: 10,
          title: "PACS - DICOM Viewer",
          description: "Built advanced DICOM image viewer with zoom, pan, and measurement tools.",
          icon: "🔬",
          tags: ["DICOM", "Medical Imaging"]
        },
        {
          year: 2023,
          month: 2,
          title: "PACS - Performance",
          description: "Optimized load times by 40%, handling 50k+ DICOM files monthly.",
          icon: "⚡",
          tags: ["Performance", "Optimization"]
        },
        {
          year: 2023,
          month: 5,
          title: "PACS Production",
          description: "Deployed to production serving 120+ radiologists daily.",
          icon: "🚀",
          tags: ["Production", "Scale"]
        },
        {
          year: 2023,
          month: 9,
          title: "Rivora - Launch",
          description: "Built SaaS task management platform from scratch with real-time features.",
          icon: "📊",
          tags: ["SaaS", "PostgreSQL", "Real-time"]
        },
        {
          year: 2023,
          month: 12,
          title: "Rivora - Analytics",
          description: "Added analytics dashboard with productivity insights and metrics.",
          icon: "📈",
          tags: ["Analytics", "Dashboard"]
        },
        {
          year: 2024,
          month: 3,
          title: "Rivora - Growth",
          description: "Scaled to 1,400+ active users across 20+ organizations.",
          icon: "📊",
          tags: ["Scale", "Growth"]
        },
        {
          year: 2024,
          month: 6,
          title: "Rivora - Automation",
          description: "Implemented task automation and daily summaries feature.",
          icon: "🤖",
          tags: ["Automation", "Features"]
        },
        {
          year: 2024,
          month: 8,
          title: "Breakup App Launch",
          description: "Launched emotional wellness mobile app with React Native and Firebase.",
          icon: "💙",
          tags: ["Mobile", "React Native", "Firebase"]
        },
        {
          year: 2024,
          month: 11,
          title: "Breakup App - AI",
          description: "Integrated AI-assisted insights and mood tracking features.",
          icon: "🧠",
          tags: ["AI", "ML", "Features"]
        },
        {
          year: 2025,
          month: 2,
          title: "30k+ Downloads",
          description: "Reached 30,000+ downloads with 18% improvement in emotional scores.",
          icon: "🎯",
          tags: ["Success", "Impact"]
        },
        {
          year: 2025,
          month: 6,
          title: "Portfolio Launch",
          description: "Created interactive portfolio with creative animations and design.",
          icon: "✨",
          tags: ["Portfolio", "Design", "Animation"]
        }
      ]
    }
  ];

  const handlePrevious = () => {
    setCurrentSection((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSection((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
  };

  const currentData = sections[currentSection];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Fireworks Background */}
      <CircularBloomFireworks />
      
      {/* Vertical accent lines - Japanese inspired - hidden on mobile */}
      <div className="hidden md:block absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent z-0" />
      <div className="hidden md:block absolute right-8 lg:right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent z-0" />
      
      {/* Content Layer - responsive */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Right Section Navigation - Redesigned - Ultra compact and responsive */}
        <div className="absolute top-4 sm:top-8 md:top-16 lg:top-24 right-4 sm:right-6 md:right-8 lg:right-12 flex items-center gap-2 md:gap-4 z-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 bg-black/70 backdrop-blur-xl border-l border-l-red-500 md:border-l-2 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 shadow-2xl"
          >
            <motion.button
              onClick={handlePrevious}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/60 border border-white/20 hover:border-red-500 text-white transition-all flex items-center justify-center"
              aria-label="Previous section"
            >
              <ChevronLeft size={16} strokeWidth={3} className="sm:w-5 sm:h-5 md:w-5 md:h-5" />
            </motion.button>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center min-w-[100px] sm:min-w-[120px] md:min-w-[150px] lg:min-w-[180px]"
              >
                {/* Large Kanji */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 md:mb-2 font-bold text-white/95">{currentData.kanji}</div>
                <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                  {currentData.title}
                </div>
                <div className="w-10 sm:w-12 md:w-16 h-px bg-red-500 mx-auto mt-1 md:mt-2" />
              </motion.div>
            </AnimatePresence>
            
            <motion.button
              onClick={handleNext}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-500 to-violet-500 text-white transition-all flex items-center justify-center hover:shadow-lg hover:shadow-red-500/50"
              aria-label="Next section"
            >
              <ChevronRight size={16} strokeWidth={3} className="sm:w-5 sm:h-5 md:w-5 md:h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Main Content Panel - Ultra compact and responsive */}
        <div className="flex-1 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-3 md:pb-6 px-4 sm:px-6 md:px-10 lg:px-20 max-w-full md:max-w-[90vw] lg:max-w-[75vw] xl:max-w-[65vw]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              {/* Modern Japanese-inspired Glass Panel - Ultra compact */}
              <div className="h-full w-full bg-black/85 backdrop-blur-3xl border-l-2 md:border-l-4 border-red-500 border-r border-r-white/10 border-t border-t-white/10 border-b border-b-white/10 p-4 sm:p-6 md:p-10 lg:p-16 flex flex-col justify-start shadow-2xl relative overflow-hidden"
                   style={{ 
                     backdropFilter: 'blur(40px) saturate(180%)',
                     WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-gradient-to-bl from-red-500/15 to-transparent pointer-events-none" />
                
                {/* Top corner accent - hidden on mobile */}
                <div className="hidden sm:block absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 border-l-2 border-t-2 border-red-500/30" />
                
                {/* Bottom corner accent - hidden on mobile */}
                <div className="hidden sm:block absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 border-r-2 border-b-2 border-violet-500/30" />

                <div className="w-full relative z-10">
                  {/* Header with Kanji emphasis - Ultra compact */}
                  <div className="mb-6 md:mb-8 lg:mb-12">
                    <div className="flex items-center gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
                      {/* Vertical indicator - hidden on mobile */}
                      <div className="hidden sm:flex flex-col items-center gap-2">
                        <div className="w-1 h-12 md:h-16 lg:h-20 bg-gradient-to-b from-red-500 to-violet-500" />
                      </div>
                      
                      <div>
                        {/* Large display kanji - responsive */}
                        <motion.div 
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/15 mb-1 md:mb-2"
                        >
                          {currentData.kanji}
                        </motion.div>
                        
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-3 lg:mb-4 tracking-tight text-white">
                          {currentData.summary.title}
                        </h2>
                        
                        <div className="flex gap-1 md:gap-2 mb-2 md:mb-3 lg:mb-4">
                          <div className="w-12 md:w-16 lg:w-20 h-0.5 md:h-1 bg-red-500" />
                          <div className="w-8 md:w-10 lg:w-12 h-0.5 md:h-1 bg-violet-500" />
                          <div className="w-6 md:w-8 h-0.5 md:h-1 bg-gray-700" />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed font-normal max-w-full md:max-w-3xl lg:max-w-4xl pl-0 sm:pl-8 md:pl-10 lg:pl-14">
                      {currentData.summary.description}
                    </p>
                  </div>

                  {/* Stats Grid - Japanese structured layout - Ultra compact and responsive */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 pl-0 sm:pl-8 md:pl-10 lg:pl-14">
                    {currentData.summary.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="bg-black/70 backdrop-blur-md border-l border-l-red-500/50 md:border-l-2 border-r border-r-white/20 border-t border-t-white/20 border-b border-b-white/20 p-3 sm:p-4 md:p-5 lg:p-6 relative group overflow-hidden shadow-lg hover:shadow-xl transition-all hover:border-red-500/70"
                        style={{ 
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)'
                        }}
                      >
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10">
                          <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 tracking-tight">
                            {highlight.value}
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-300 font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em]">
                            {highlight.label}
                          </div>
                        </div>

                        {/* Number indicator */}
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-red-500/30 border border-red-500/50 text-red-400 text-[10px] md:text-xs font-bold">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline Section - Ultra compact */}
        <div className="pb-4 md:pb-6 lg:pb-[8vh]">
          <div className="max-w-full sm:max-w-[98vw] md:max-w-[96vw] mx-auto px-3 sm:px-4 md:px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <TimelineBar 
                  timelineData={currentData.timeline}
                  title={`${currentData.title}`}
                  icon={currentData.icon}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}