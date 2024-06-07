import { getPapers } from './api/papers';
import styles from '../styles/PapersPage.module.css';

const PapersPage = ({ papers }) => {
  return (
    <>
      <h3>My Publications</h3>
      <br/>
      <hr/>
      <div className={styles.container}>
        {papers.map((paper) => (
          <div key={paper.id} className={styles.card}>
            <div className={styles.content}>
              <h3>{paper.title}</h3>
              <p><strong>Abstract:</strong> {paper.abstract}</p>
              <p><strong>Conference:</strong> {paper.conference}</p>
              <p><strong>Year:</strong> {paper.year}</p>
              <p><strong>Citations:</strong> {paper.citations}</p>
              <div className={styles.cta}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.underline}
                >
                  Read Paper
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const papers = getPapers();

  return {
    props: { title: 'Papers', papers },
  };
}

export default PapersPage;
