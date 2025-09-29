import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CristovaoValues from '@/components/CristovaoValues';
import CristovaoVision from '@/components/CristovaoVision';
import MunicipalListsSection from '@/components/MunicipalListsSection'; // Importar nova seção de Listas
// import Eventos from '@/components/Eventos';
import Participate from '@/components/Participate';
import Program from '@/components/Program';
import ParishAssemblySection from '@/components/ParishAssemblySection'; // Importar nova seção de Juntas de Freguesia
import MainParishCandidatesSection from '@/components/MainParishCandidatesSection'; // Importar nova seção de Candidatos Principais das Juntas
import Footer from '@/components/Footer';
import CristovaoNorteSection from '@/components/CristovaoNorteSection';
import MacarioCorreiaSection from '@/components/MacarioCorreiaSection';
import ChatbotPage from '@/components/ChatbotPage'; // Importar o componente ChatbotPage

function App() {
  useEffect(() => {
    // Adicionar scroll suave para navegação por âncoras
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <CristovaoNorteSection />
      <MacarioCorreiaSection />
      <MunicipalListsSection /> {/* Nova seção de Listas */}
      <MainParishCandidatesSection /> {/* Nova seção de Candidatos Principais das Juntas */}
      <ParishAssemblySection /> {/* Nova seção de Juntas de Freguesia */}
      <Program />
      {/* <Eventos /> */}
      <Participate />
      <ChatbotPage /> {/* Página dedicada ao chatbot */}
      <Footer />
    </>
  );
}

export default App;