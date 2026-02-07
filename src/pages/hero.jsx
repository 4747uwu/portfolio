// src/pages/hero.jsx
import { motion } from "framer-motion";
import PiRods from "../components/hero/pi";
import PixelBlast from "../components/hero/background";
import Navbar from "../components/hero/Navbar";
import StarryBackground from "../components/hero/StarryBackground";

export default function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Navbar */}
      <Navbar />

      {/* Starry night background - Japanese aesthetic */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>

      {/* Racing stripe - Japanese car culture inspired (top) */}
      <div className="absolute top-0 left-0 right-0 h-0.5 lg:h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-10 opacity-60" />
      
      {/* Racing stripe - Japanese car culture inspired (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 lg:h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-10 opacity-60" />

      {/* Vertical accent lines - Japanese shoji screen inspired - hidden on mobile */}
      <div className="hidden md:block absolute left-8 lg:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent z-10" />
      <div className="hidden lg:block absolute left-20 xl:left-32 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent z-10" />
      <div className="hidden lg:block absolute right-20 xl:right-32 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent z-10" />
      <div className="hidden md:block absolute right-8 lg:right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent z-10" />

      {/* Decorative corner elements - Japanese architecture inspired - hidden on mobile */}
      <div className="hidden md:block absolute top-16 lg:top-20 left-0 w-16 h-16 lg:w-32 lg:h-32 border-t-2 border-l-2 border-red-500/30 z-10" />
      <div className="hidden md:block absolute bottom-16 lg:bottom-20 right-0 w-16 h-16 lg:w-32 lg:h-32 border-b-2 border-r-2 border-violet-500/30 z-10" />

      {/* PixelBlast background (fills hero, non-interactive) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#FFFFFF"
          patternScale={3}
          patternDensity={0.6}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Pi Animation - slightly above the background */}
      <div className="absolute -bottom-[350%] -left-[35%] w-[4800px] h-[4800px] opacity-30 z-10 scale-100 pointer-events-none">
        <PiRods
          innerRodLength={200}
          outerRodLength={220}
          speed={0.00254647908947032537230214021396}
          innerRodLength2={160}
          outerRodLength2={140}
          speed2={-0.008}
          traceColor="#FFFFFF"
          traceColor2="#E0E0E0"
          dotColor="#FFFFFF"
          dotColor2="#E0E0E0"
          size={1700}
          // renderScale={3} // optional: tune for sharpness/performance
        />
      </div>

      {/* Right-side Content (vertically centered) - Ultra compact */}
      <div className="absolute inset-0 z-20 flex flex-col items-end justify-center px-4 sm:px-6 md:pr-8 lg:pr-12 xl:pr-20 text-right">
        {/* Japanese subtitle with accent - Car culture inspired */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4"
        >
          <div className="w-8 md:w-16 h-px bg-gradient-to-l from-red-500 to-transparent" />
          <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">開発者 • DEVELOPER</span>
        </motion.div>

        {/* CODING with Japanese kanji style animation - Ultra compact and responsive */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.h1
            animate={{ 
              textShadow: [
                "0 0 20px rgba(239, 68, 68, 0.5)",
                "0 0 40px rgba(239, 68, 68, 0.3)",
                "0 0 20px rgba(239, 68, 68, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[128px] 2xl:text-[160px] font-bold leading-none text-white relative"
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 900,
              letterSpacing: '-0.05em'
            }}
          >
            CODING
            {/* Japanese-style underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-1 md:-bottom-2 right-0 w-full h-0.5 md:h-1 bg-gradient-to-l from-red-500 via-orange-500 to-transparent origin-right"
            />
          </motion.h1>
        </motion.div>

        {/* WODING with animated underline - Ultra compact and responsive */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <motion.h2
            animate={{ 
              textShadow: [
                "0 0 20px rgba(167, 139, 250, 0.5)",
                "0 0 40px rgba(167, 139, 250, 0.3)",
                "0 0 20px rgba(167, 139, 250, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[96px] 2xl:text-[120px] font-bold leading-none mt-1 md:mt-2 block text-white/90 relative"
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontWeight: 900,
              letterSpacing: '-0.05em'
            }}
          >
            WODING
            {/* Racing stripe animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute -bottom-1 md:-bottom-2 right-0 w-full h-0.5 md:h-1 bg-gradient-to-l from-violet-500 via-purple-500 to-transparent origin-right"
            />
          </motion.h2>
        </motion.div>
        
        {/* Accent bars - Japanese car racing stripes inspired - Ultra compact */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex gap-1 md:gap-2 mt-2 md:mt-4 mb-2 md:mb-4 origin-right"
        >
          <motion.div 
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 md:w-20 lg:w-24 h-0.5 md:h-1 bg-red-500" 
          />
          <motion.div 
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-8 md:w-12 lg:w-16 h-0.5 md:h-1 bg-orange-500" 
          />
          <motion.div 
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="w-6 md:w-8 lg:w-10 h-0.5 md:h-1 bg-violet-500" 
          />
        </motion.div>
        
        {/* Tagline with Japanese car culture reference - Ultra compact and responsive */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-sm md:max-w-md leading-relaxed"
        >
          Crafting elegant solutions with modern technologies
          <br />
          <span className="text-xs md:text-sm text-gray-500 tracking-wider">速度と精度 — Speed & Precision</span>
        </motion.p>
        
        {/* CTA Button - JDM inspired design - Ultra compact and responsive */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          href="#contact"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
            x: -5
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 md:mt-6 lg:mt-8 px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm sm:text-base md:text-lg font-bold shadow-lg hover:shadow-red-500/50 transition-all border-l-2 md:border-l-4 border-red-600 relative overflow-hidden group"
        >
          {/* Animated racing stripe effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10 tracking-wider">GET IN TOUCH</span>
        </motion.a>

        {/* Small Japanese kanji watermark - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hidden lg:block absolute bottom-16 lg:bottom-24 right-12 lg:right-20 text-4xl md:text-5xl lg:text-6xl font-bold text-white/10"
          style={{ writingMode: 'vertical-rl' }}
        >
          速度
        </motion.div>
      </div>
    </motion.div>
  );
}