import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CandidateSection from './components/CandidateSection';
import Program from './components/Program';
import News from './components/News';
import Events from './components/Events';
import Participate from './components/Participate';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CandidateSection />
        <Program />
        <News />
        <Events />
        <Participate />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;