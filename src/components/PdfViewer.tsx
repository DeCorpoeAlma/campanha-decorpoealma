import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfPath: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const handleResize = () => {
      if (viewerRef.current) {
        setContainerWidth(viewerRef.current.offsetWidth);
      }
    };

    handleResize(); // Define a largura inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={viewerRef} className="pdf-viewer-container w-full max-w-3xl mx-auto overflow-auto">
      <Document
        file={pdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        className="pdf-document"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={containerWidth} // Adapta à largura do contêiner
            className="mb-4 shadow-lg" // Adiciona margem e sombra entre as páginas
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;