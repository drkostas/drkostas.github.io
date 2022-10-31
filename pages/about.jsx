import {pdfjs, Document, Page, PDFDownloadLink} from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const myResume = './Resume.pdf';

const AboutPage = () => {
  return (
    <>
      <center>      
        <h3>Resume (<a href={myResume} download="Resume-KonstantinosGeorgiou.pdf">Download</a>)</h3>
        <br/>
        <Document file={myResume}>
            <Page pageIndex={0}/>
            <Page pageIndex={1}/>
        </Document>
      </center>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
