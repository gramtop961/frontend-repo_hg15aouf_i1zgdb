import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEBHOOK = 'http://localhost:5678/webhook-test/freaking'

const Message = ({ role, text }) => {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className={`w-full`}
    >
      <div className={`max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className={`relative rounded-xl px-4 py-3 backdrop-blur-md border ${isUser ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100' : 'border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-100'} shadow-[0_0_25px_rgba(156,39,255,0.25)]`}
          style={{
            boxShadow: isUser
              ? '0 0 18px rgba(0,234,255,0.35), inset 0 0 12px rgba(0,234,255,0.2)'
              : '0 0 18px rgba(255,0,125,0.35), inset 0 0 12px rgba(255,0,125,0.2)'
          }}
        >
          <div className="relative z-10 glitch-text">
            {text}
          </div>
          <div className="pointer-events-none absolute inset-0 scanline-overlay" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Neon terminal online. Calibrating holographic I/O.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const userText = input
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: userText }])

    // Visual effects triggers (handled via CSS keyframes toggled by state class)
    document.body.classList.add('neon-ripple')
    setTimeout(() => document.body.classList.remove('neon-ripple'), 600)

    setLoading(true)
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      })
      const data = await res.json().catch(() => ({}))
      const botText = data.reply || data.message || 'Response channel engaged. Holographic cognition active.'

      // Scan beam flash
      document.body.classList.add('scan-beam')
      setTimeout(() => document.body.classList.remove('scan-beam'), 500)

      setMessages((m) => [...m, { role: 'bot', text: String(botText) }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'bot', text: 'Signal degraded. Re-route through auxiliary channels.' }])
    } finally {
      setLoading(false)
      // Glitch burst
      document.body.classList.add('glitch-burst')
      setTimeout(() => document.body.classList.remove('glitch-burst'), 700)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const handleClear = () => {
    // Full refresh to reset all transient visual effects and state
    window.location.reload()
  }

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(156,39,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 hologrid" />
        <div className="absolute inset-0 purple-fog" />
        <div className="absolute inset-x-20 bottom-24 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-28">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[0.35em] text-cyan-200 hologram-text">NEON TERMINAL</h2>
          <p className="mt-2 text-fuchsia-200/80">Interface link established. Converse with the grid.</p>
        </div>

        {/* Chat panel */}
        <div className="relative rounded-3xl border border-cyan-300/30 bg-black/40 backdrop-blur-xl shadow-[0_0_80px_rgba(0,234,255,0.12)]">
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-purple-600/10 blur-xl" />

          <div ref={listRef} className="relative z-10 max-h-[50vh] overflow-y-auto p-6 space-y-4 custom-scroll">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <Message key={i} role={m.role} text={m.text} />
              ))}
            </AnimatePresence>
            {loading && (
              <div className="mx-auto mt-2 w-28 h-8 rounded-full border border-fuchsia-400/40 text-center text-fuchsia-200/80 flex items-center justify-center animate-pulse">
                typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative z-10 border-t border-cyan-300/20 p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Transmit to the grid…"
                className="flex-1 h-12 min-w-[220px] resize-none rounded-xl bg-black/60 px-4 py-3 text-cyan-100 placeholder-cyan-300/40 outline-none border border-cyan-300/30 focus:border-cyan-300/60 shadow-[inset_0_0_12px_rgba(0,234,255,0.15)]"
              />
              <button onClick={send} className="relative overflow-hidden rounded-xl border border-fuchsia-400/60 px-5 py-3 text-fuchsia-100 bg-black/60 hover:bg-fuchsia-500/20 transition">
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition" />
                <span className="relative">Send</span>
              </button>
              <button onClick={handleClear} className="relative overflow-hidden rounded-xl border border-cyan-400/60 px-5 py-3 text-cyan-100 bg-black/60 hover:bg-cyan-500/20 transition">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition" />
                <span className="relative">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
