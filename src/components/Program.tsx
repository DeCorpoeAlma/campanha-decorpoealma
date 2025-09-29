import React, { useState } from 'react';
import PdfViewer from './PdfViewer';
import Modal from './Modal';
import { Download, Eye } from 'lucide-react';

const Program = () => {
  const pdfPath = '/programa_eleitoral.pdf';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="programa" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark-blue mb-4">
            Programa Eleitoral
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um programa abrangente que aborda os principais desafios de Faro,
            com propostas concretas para melhorar a qualidade de vida de todos os cidadãos.
          </p>
        </div>

        <div className="text-center mt-12 flex flex-col gap-4">
          <button
            onClick={openModal}
            className="bg-dark-blue hover:bg-dark-blue/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Eye size={20} />
            Ver Programa
          </button>
          <button
            onClick={() => window.open(pdfPath, '_blank')}
            className="bg-dark-blue hover:bg-dark-blue/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            title="Descarregar Programa"
          >
            <Download size={20} />
            Descarregar Programa
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Programa Eleitoral" size="full">
          <PdfViewer pdfPath={pdfPath} />
        </Modal>
      </div>
    </section>
  );
};

export default Program;