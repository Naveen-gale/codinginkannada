import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Skill from './components/Skill'
import HeroSec from './components/HeroSec'
import Projects from './components/Projects'
import Certifications from './pages/cirtificate'
import Contact from './components/Contact'
import SmoothScroll from './components/SmoothScroll'

export const App = () => {
  // Note: useScrollReveal is registered inside Home.jsx (which renders the section elements).
  // Calling it here too would create duplicate ScrollTrigger instances on the same elements,
  // causing double-firing animations and unnecessary observer overhead.

  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> {/* Redirect /home to Home */}
        <Route path="/skill" element={<Skill />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </SmoothScroll>
  )
}
export default App