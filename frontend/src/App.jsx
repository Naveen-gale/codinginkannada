import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Skill from './components/Skill'
import HeroSec from './components/HeroSec'
import Projects from './components/Projects'
import Certifications from './pages/cirtificate'
import Contact from './components/Contact'
import SmoothScroll from './components/SmoothScroll'
import { useScrollReveal } from './utils/useScrollReveal'

export const App = () => {
  useScrollReveal('.reveal-section');

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