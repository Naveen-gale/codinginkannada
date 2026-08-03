import React from 'react'
import NaveBar from '../components/NaveBar'
import HeroSec from '../components/HeroSec'
import Skill from '../components/Skill'
import About from '../components/About'
import Projects from '../components/Projects'
import GitHubProjects from '../components/GitHubProjects'
import Certifications from './cirtificate'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useScrollReveal } from '../utils/useScrollReveal'

const Home = () => {
    useScrollReveal('.reveal-section');

    return (
        <div className='bg-[#050505] min-h-screen w-full text-white overflow-x-hidden'>
            <NaveBar />
            <div className="reveal-section">
                <HeroSec />
            </div>
            <div className="reveal-section">
                <About />
            </div>
            <div className="reveal-section">
                <Skill />
            </div>
            <div className="reveal-section">
                <GitHubProjects />
            </div>
            <div className="reveal-section">
                <Projects />
            </div>
            <div className="reveal-section">
                <Certifications />
            </div>
            <div className="reveal-section">
                <Contact />
            </div>
            <Footer />  
        </div>
    )
}

export default Home