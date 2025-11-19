import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const neonText = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: 'easeOut' }
  }
}

const glitchVariants = {
  animate: {
    textShadow: [
      '0 0 0px rgba(0,234,255,0.0), 0 0 0px rgba(255,0,125,0.0)',
      '0 0 8px rgba(0,234,255,0.8), -2px 0 2px rgba(255,0,125,0.5)',
      '0 0 14px rgba(156,39,255,0.8), 2px 0 2px rgba(0,234,255,0.5)',
      '0 0 10px rgba(0,234,255,0.8), -2px 0 2px rgba(255,0,125,0.5)',
      '0 0 0px rgba(0,234,255,0.0), 0 0 0px rgba(255,0,125,0.0)'
    ],
    transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
  }
}

export default function Hero({ onEnter }) {
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Spline 3D cover */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/BL9Cjn3fkAdLBhXm/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Volumetric fog + digital rain overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(156,39,255,0.18),transparent_60%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 digital-rain opacity-40" />

      {/* Floating glitch particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-1 w-40 bg-cyan-300/40 blur-sm animate-glitch-x" />
        <div className="absolute right-1/5 top-1/2 h-1 w-56 bg-fuchsia-400/40 blur-md animate-glitch-x delay-150" />
        <div className="absolute left-1/3 bottom-1/4 h-1 w-32 bg-purple-400/40 blur animate-glitch-x delay-300" />
      </div>

      {/* Holographic UI frame */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-8 rounded-3xl border border-cyan-300/30 shadow-[0_0_60px_rgba(0,234,255,0.25)]" />
        <div className="absolute inset-x-32 top-24 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          variants={neonText}
          initial="initial"
          animate="animate"
          className="select-none text-5xl sm:text-6xl md:text-7xl font-black tracking-widest hologram-text"
        >
          <motion.span variants={glitchVariants} animate="animate" className="inline-block">
            NEON PROTOCOL
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 max-w-2xl text-cyan-100/80 text-lg sm:text-xl"
        >
          “Where Intelligence Awakens in the Neon Grid.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={onEnter}
            className="group relative overflow-hidden rounded-full border border-cyan-300/60 bg-black/40 px-8 py-4 text-cyan-200 shadow-[0_0_30px_rgba(0,234,255,0.25)] hover:text-black transition"
          >
            <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition" />
            <span className="relative z-10 font-semibold tracking-wider group-hover:drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]">Enter the Grid</span>
          </button>
        </motion.div>

        {/* System boot messages */}
        <div className="mt-10 space-y-1 text-cyan-200/70 text-xs sm:text-sm">
          <div className="scanline">Neural systems online.</div>
          <div className="scanline delay-150">Initializing neon intelligence.</div>
          <div className="scanline delay-300">Welcome to the grid.</div>
          <div className="scanline delay-500">Transmission active.</div>
        </div>
      </div>
    </section>
  )
}
