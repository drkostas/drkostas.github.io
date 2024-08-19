import styles from '../styles/ResumePage.module.css';
import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const myResume = './Resume.pdf';

const ResumePage = () => {
  return (
    <center>
      <h3>Resume (<a href={myResume} className={styles.underline} download="Resume-KonstantinosGeorgiou.pdf">Download</a>)</h3>
      <br />
      <div className={styles.pdfContainer}>
        <Document file={myResume}>
          <Page pageIndex={0} scale={1.5} renderMode="svg" />
        </Document>
      </div>
    </center>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Resume' },
  };
}

export default ResumePage;
