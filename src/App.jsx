import React, { useRef } from 'react'
import Hero from './components/Hero'
import Chatbot from './components/Chatbot'
import Outro from './components/Outro'

function App() {
  const chatRef = useRef(null)
  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero onEnter={scrollToChat} />
      <div ref={chatRef}>
        <Chatbot />
      </div>
      <Outro />
    </div>
  )
}

export default App
