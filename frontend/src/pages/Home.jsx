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
const Home = () => {
    return (
        <div className='bg-black min-h-screen w-full scroll-smooth text-white'>
            <NaveBar />
            <HeroSec />
            <About />
            <Skill />
            
             <GitHubProjects />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />  
          

        </div>
    )
}

export default Home