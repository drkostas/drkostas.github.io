import { useState } from 'react';
import styles from '../styles/ResumePage.module.css';
import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const myResume = './Resume.pdf';

const ResumePage = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page) => {
    if (!pageWidth) {
      // Set width based on viewport, max 800px
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const maxWidth = Math.min(viewportWidth * 0.9, 800);
      setPageWidth(maxWidth);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Resume</h3>
        <a href={myResume} className={styles.downloadButton} download="Resume-KonstantinosGeorgiou.pdf">
          Download PDF
        </a>
      </div>

      <div className={styles.pdfContainer}>
        <Document
          file={myResume}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className={styles.loading}>Loading resume...</div>}
          error={<div className={styles.error}>Failed to load PDF. <a href={myResume} download>Download instead</a></div>}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth}
              renderMode="canvas"
              className={styles.page}
              onLoadSuccess={onPageLoadSuccess}
              loading={<div className={styles.pageLoading}>Loading page {index + 1}...</div>}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Resume' },
  };
}

export default ResumePage;
