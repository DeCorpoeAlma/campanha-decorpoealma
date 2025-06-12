import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import News from '@/components/News';
import CandidateSection from '@/components/CandidateSection';
import CristovaoNorteSection from '@/components/CristovaoNorteSection';
import CristovaoValues from '@/components/CristovaoValues';
import CristovaoVision from '@/components/CristovaoVision';
import Events from '@/components/Events';
import MacarioCorreiaSection from '@/components/MacarioCorreiaSection';
import Participate from '@/components/Participate';
import Program from '@/components/Program';
import Team from '@/components/Team';
import Footer from '@/components/Footer';
// Importar o Chatbot se ele for usado em alguma seção específica
// import Chatbot from '@/components/Chatbot';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <News />
      <CandidateSection />
      <Events />
      <Program />
      <Participate />
      <Team />
      <Footer />
      {/* Adicionar o Chatbot em uma seção apropriada se necessário */}
      {/* <Chatbot /> */}
    </>
  );
}

export default App;