import { pdfjs, Document, Page, PDFDownloadLink } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const myResume = './Resume.pdf';

const AboutPage = () => {
  return (
    <>
      <h3>About Me</h3><br/>
      <ul>
        <li><span role="img" aria-label="book">📖</span> Pursuing PhD in Data Science & Engineering @ <a href='https://bredesencenter.utk.edu/the-data-science-and-engineering-phd/'>The University of Tennessee</a>.</li>
        <li><span role="img" aria-label="graduate-hat">🎓</span> Conducting research on <b>AI</b> and <b>Computer Vision</b> @ <a href='https://aicip.github.io/research.htm'>AICIP Lab</a>.</li>
        <li><span role="img" aria-label="light-bulb">💡</span> Open to collaborating on projects and innovative ideas. </li>
        <li><span role="img" aria-label="laptop">💻</span> Currently working on Semantic Segmentation, Domain Adaptation, and Remote Sensing. </li>
      </ul>
      <br/>
      <center>
        <h3>Resume (<a href={myResume} download="Resume-KonstantinosGeorgiou.pdf">Download</a>)</h3>
        <br />
        <Document file={myResume}>
          <Page pageIndex={0} />
          <Page pageIndex={1} />
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
