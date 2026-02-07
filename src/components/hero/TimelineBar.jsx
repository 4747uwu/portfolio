// src/components/hero/TimelineBar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TimelineBar = ({ timelineData, title, icon }) => {
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  
  const [startYear, setStartYear] = useState(2021);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hoverInfo, setHoverInfo] = useState(null);
  
  const allYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const quarterMonths = [0, 3, 6, 9];
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.offsetWidth * 0.75, 300);
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = Math.min(scrollContainerRef.current.offsetWidth * 0.75, 300);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const getThreeYears = () => {
    const years = [];
    for (let i = 0; i < 3; i++) {
      const year = startYear + i;
      if (year <= 2026) years.push(year);
    }
    return years;
  };
  
  const getQuarterMonthsForYears = () => {
    const threeYears = getThreeYears();
    const result = [];
    
    threeYears.forEach((year) => {
      quarterMonths.forEach((monthIndex) => {
        result.push({
          month: months[monthIndex],
          monthIndex,
          year,
          label: `${months[monthIndex]} ${year}`
        });
      });
    });
    
    return result;
  };
  
  const isCurrentMonth = (year, monthIndex) => {
    const today = new Date();
    return year === today.getFullYear() && monthIndex === today.getMonth();
  };
  
  const getDataForQuarter = (year, startMonthIndex) => {
    if (!timelineData) return [];
    
    return timelineData.filter(item => {
      const itemYear = item.year;
      const itemMonth = item.month - 1;
      
      return itemYear === year && 
             itemMonth >= startMonthIndex && 
             itemMonth < startMonthIndex + 3;
    });
  };
  
  const handleItemMouseEnter = (item, event) => {
    setHoverInfo({ item });
  };
  
  const navigatePrevious = () => {
    if (startYear > 2020) {
      setStartYear(Math.max(2020, startYear - 3));
    }
  };
  
  const navigateNext = () => {
    if (startYear + 2 < 2026) {
      setStartYear(Math.min(2024, startYear + 3));
    }
  };
  
  const jumpToToday = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear === 2020) {
      setStartYear(2020);
    } else if (currentYear >= 2024) {
      setStartYear(2024);
    } else {
      setStartYear(currentYear - 1);
    }
  };
  
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);
  
  useEffect(() => {
    if (scrollContainerRef.current) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      
      const quarters = scrollContainerRef.current.querySelectorAll('.quarter-marker');
      quarters.forEach((quarter) => {
        const year = parseInt(quarter.dataset.year);
        const month = parseInt(quarter.dataset.month);
        
        if (year === currentYear && month <= currentMonth && currentMonth < month + 3) {
          quarter.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
    }
  }, [startYear, containerWidth]);
  
  const quartersToDisplay = getQuarterMonthsForYears();
  const threeYears = getThreeYears();
  
  return (
    <div 
      ref={containerRef} 
      className="bg-gradient-to-b from-[#0A0A0A] to-[#0C0C0C] rounded-md md:rounded-lg p-2 md:p-3 mb-2 md:mb-4 relative
                border border-gray-800/30 shadow-lg"
    >
      {/* Header - ultra compact and responsive */}
      <div className="flex flex-wrap items-center justify-between mb-1 px-1 backdrop-blur-sm z-10 relative gap-2">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="p-1 md:p-1.5 rounded-md md:rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <span className="text-base md:text-lg lg:text-xl">{icon}</span>
          </div>
          <h3 className="text-white text-xs md:text-sm font-medium">{title}</h3>
        </div>
        
        <div className="flex items-center gap-0.5 md:gap-1 bg-white/5 backdrop-blur-sm rounded-md md:rounded-lg border border-white/5 px-0.5 md:px-1">
          <button 
            onClick={navigatePrevious}
            disabled={startYear === 2020}
            className="p-0.5 md:p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous 3 years"
          >
            <ChevronLeft size={12} className="md:w-3.5 md:h-3.5" />
          </button>
          
          <span className="text-white text-[10px] md:text-xs font-medium px-1 md:px-1.5 py-0.5 md:py-1">
            {threeYears[0]} - {threeYears[threeYears.length - 1]}
          </span>
          
          <button 
            onClick={navigateNext}
            disabled={startYear + 2 >= 2026}
            className="p-0.5 md:p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next 3 years"
          >
            <ChevronRight size={12} className="md:w-3.5 md:h-3.5" />
          </button>
          
          <button 
            onClick={jumpToToday}
            className="ml-0.5 md:ml-1 px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs bg-indigo-500/20 hover:bg-indigo-500/30 
                     text-indigo-300 rounded-md transition-colors"
          >
            Today
          </button>
        </div>
      </div>
      
      {/* Timeline scroll container - ultra compact */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none"></div>
        
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20
                   p-0.5 md:p-1 rounded-full bg-[#161616]/80 hover:bg-[#202020] text-gray-500 hover:text-white 
                   transition-colors border border-gray-800/50 backdrop-blur-sm shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft size={14} className="md:w-4 md:h-4" />
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20
                   p-0.5 md:p-1 rounded-full bg-[#161616]/80 hover:bg-[#202020] text-gray-500 hover:text-white
                   transition-colors border border-gray-800/50 backdrop-blur-sm shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight size={14} className="md:w-4 md:h-4" />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-1 md:pb-2 hide-scrollbar relative h-[90px] md:h-[100px] lg:h-[110px]"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="h-0.5 bg-gradient-to-r from-indigo-900/20 via-gray-800/80 to-indigo-900/20 absolute left-0 right-0 top-[30px] md:top-[35px] lg:top-[38px] rounded-full"></div>
          
          <div className="flex justify-between w-full pt-1 px-2">
            {quartersToDisplay.map(({ month, monthIndex, year, label }, index) => {
              const quarterData = getDataForQuarter(year, monthIndex);
              const hasData = quarterData.length > 0;
              const isCurrent = isCurrentMonth(year, monthIndex);
              
              const isCurrentQuarter = quarterData.some(item => 
                isCurrentMonth(item.year, item.month - 1)
              );
              
              return (
                <div 
                  key={`quarter-${year}-${monthIndex}`}
                  className="flex flex-col items-center flex-1 quarter-marker relative"
                  data-year={year}
                  data-month={monthIndex}
                >
                  <div className={`text-[8px] md:text-[10px] font-medium mb-1 
                                ${isCurrentQuarter ? 'text-indigo-400' : 'text-gray-500'}`}>
                    {label}
                  </div>
                  
                  {monthIndex === 0 && index !== 0 && (
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gray-700/30"></div>
                  )}
                  
                  <div 
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full z-10 relative
                              ${isCurrentQuarter
                                ? 'bg-indigo-500 ring-2 ring-indigo-500/30 shadow-sm shadow-indigo-500/30' 
                                : hasData 
                                  ? 'bg-white/80 ring-1 ring-white/10' 
                                  : 'bg-gray-700/70'}`}
                  />
                  
                  {hasData && (
                    <div className="absolute top-[35px] md:top-[40px] lg:top-[43px] flex flex-col gap-1.5 md:gap-2 items-center justify-center">
                      {quarterData.slice(0, 3).map((item, idx) => {
                        let colorTheme = "from-indigo-950/80 to-indigo-900/50 border-indigo-800/30 hover:border-indigo-700/50";
                        let ringColor = "stroke-indigo-500";
                        
                        if (item.tags?.includes("Hackathon") || item.tags?.includes("Winner")) {
                          colorTheme = "from-amber-950/80 to-amber-900/50 border-amber-800/30 hover:border-amber-700/50";
                          ringColor = "stroke-amber-500";
                        } else if (item.tags?.includes("Music")) {
                          colorTheme = "from-purple-950/80 to-purple-900/50 border-purple-800/30 hover:border-purple-700/50";
                          ringColor = "stroke-purple-500";
                        } else if (item.tags?.includes("Production") || item.tags?.includes("Launch")) {
                          colorTheme = "from-emerald-950/80 to-emerald-900/50 border-emerald-800/30 hover:border-emerald-700/50";
                          ringColor = "stroke-emerald-500";
                        }
                        
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onMouseEnter={(e) => handleItemMouseEnter(item, e)}
                            onMouseLeave={() => setHoverInfo(null)}
                            className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-b ${colorTheme}
                                     flex items-center justify-center cursor-pointer
                                     text-xs md:text-sm lg:text-base border transition-all duration-200
                                     shadow-lg hover:shadow-xl hover:scale-110 relative group`}
                          >
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                              <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                className={ringColor}
                                strokeWidth="1.5"
                                strokeDasharray={`${((idx + 1) / 3) * 100} 100`}
                                opacity="0.4"
                              />
                            </svg>
                            <span className="relative z-10">{item.icon || '📌'}</span>
                          </motion.div>
                        );
                      })}
                      
                      {quarterData.length > 3 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-b from-gray-800 to-gray-900/80 
                                   flex items-center justify-center
                                   text-[8px] md:text-[9px] text-gray-300 border border-gray-700/50
                                   shadow-lg hover:shadow-xl cursor-pointer hover:text-white transition-all"
                        >
                          +{quarterData.length - 3}
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Enhanced Right-side Hover Card - responsive positioning */}
      <AnimatePresence>
        {hoverInfo && (
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50
                     bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-950/95 
                     rounded-xl md:rounded-2xl border border-gray-700/50
                     p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] backdrop-blur-xl"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            {/* Header with Icon - responsive */}
            <div className="flex items-start gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-5">
              <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center border border-indigo-800/30">
                <span className="text-2xl md:text-3xl lg:text-4xl">{hoverInfo.item.icon || '📌'}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm md:text-base lg:text-lg mb-1 leading-tight">
                  {hoverInfo.item.title}
                </h4>
                <div className="flex items-center text-[10px] md:text-xs gap-2">
                  <span className="text-indigo-400 font-medium">
                    {months[hoverInfo.item.month - 1]} {hoverInfo.item.year}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-400">
                    {hoverInfo.item.category || "Milestone"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Description - responsive */}
            {hoverInfo.item.description && (
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-3 md:mb-4">
                {hoverInfo.item.description}
              </p>
            )}
            
            {/* Stats Section (if available) - responsive */}
            {hoverInfo.item.stats && (
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                {hoverInfo.item.stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/5 rounded-md md:rounded-lg p-2 md:p-3 border border-white/10"
                  >
                    <div className="text-base md:text-lg lg:text-xl font-semibold text-white mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Tech Stack Tags - responsive */}
            {hoverInfo.item.tags && hoverInfo.item.tags.length > 0 && (
              <div className="space-y-1.5 md:space-y-2">
                <div className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-1 md:gap-1.5">
                  {hoverInfo.item.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] md:text-xs px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Details (if available) - responsive */}
            {hoverInfo.item.details && (
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-800">
                <div className="text-[10px] md:text-xs text-gray-400 space-y-1">
                  {hoverInfo.item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 md:gap-2">
                      <span className="text-indigo-500 mt-0.5">▸</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Arrow pointer */}
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-3 h-3 bg-gray-900 border-l border-b border-gray-700/50 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
if (!document.querySelector('style[data-timeline-scrollbar]')) {
  style.setAttribute('data-timeline-scrollbar', 'true');
  document.head.appendChild(style);
}

export default TimelineBar;