import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Maximize, Minimize } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfPath: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.max(1, Math.min(prevPageNumber + offset, numPages || 1)));
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={viewerRef} className={`pdf-viewer-container ${isFullscreen ? 'fixed inset-0 z-50 bg-white flex flex-col' : 'relative w-full max-w-3xl mx-auto'}`}>
      <div className={`flex-grow flex justify-center items-center ${isFullscreen ? 'overflow-auto' : ''}`}>
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          className={`pdf-document ${isFullscreen ? 'w-full h-full' : ''}`}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className={isFullscreen ? 'w-full h-full' : ''}
          />
        </Document>
      </div>
      <div className={`pdf-controls flex justify-between items-center p-4 bg-gray-100 ${isFullscreen ? 'flex-shrink-0' : ''}`}>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={pageNumber >= (numPages || 0)}
            onClick={nextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
        <p className="text-lg">
          Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
        </p>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          title={isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;