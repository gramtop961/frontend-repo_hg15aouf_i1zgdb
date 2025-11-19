import React from 'react'
import { motion } from 'framer-motion'

export default function Outro() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Neon city pano/fog */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,234,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 city-scan" />

      {/* Hover cars / drones as light trails */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-1/3 h-1 w-64 bg-cyan-400/40 blur-md animate-trail-x" />
        <div className="absolute right-10 top-1/2 h-1 w-80 bg-fuchsia-400/40 blur-md animate-trail-x delay-150" />
        <div className="absolute left-1/4 bottom-1/4 h-1 w-52 bg-purple-500/40 blur animate-trail-x delay-300" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-extrabold tracking-wider hologram-text"
        >
          The Future Is Now Protocol-Enabled.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-cyan-100/80"
        >
          Awaken your intelligence. Join the Neon Grid.
        </motion.p>

        {/* Cyber-lines to corners */}
        <div className="mt-20 grid grid-cols-2 gap-6">
          <div className="h-24 rounded-xl border border-cyan-300/30 bg-black/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0,transparent_48%,rgba(0,234,255,0.4)_50%,transparent_52%,transparent_100%)] bg-[length:12px_12px] opacity-30" />
          </div>
          <div className="h-24 rounded-xl border border-fuchsia-400/30 bg-black/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(225deg,transparent_0,transparent_48%,rgba(255,0,125,0.4)_50%,transparent_52%,transparent_100%)] bg-[length:12px_12px] opacity-30" />
          </div>
        </div>

        <div className="mt-24 text-cyan-300/60">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <div className="mt-4 text-xs">© Neon Protocol</div>
        </div>
      </div>
    </section>
  )
}
