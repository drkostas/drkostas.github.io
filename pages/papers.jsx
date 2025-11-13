import { useState } from 'react';
import { getPapers } from './api/papers';
import styles from '../styles/PapersPage.module.css';

const PapersPage = ({ papers }) => {
  const [sortBy, setSortBy] = useState('citations'); // default is citations

  // Sort papers based on current sort type
  const sortedPapers = [...papers].sort((a, b) => {
    if (sortBy === 'citations') {
      // Sort by citations (descending), then by year (descending) as tiebreaker
      if (b.citations === a.citations) {
        return b.year - a.year;
      }
      return b.citations - a.citations;
    } else {
      // Sort by year (descending), then by citations (descending) as tiebreaker
      if (b.year === a.year) {
        return b.citations - a.citations;
      }
      return b.year - a.year;
    }
  });

  return (
    <>
      <div className={styles.header}>
        <h3>My Publications</h3>
        <div className={styles.sortControls}>
          <span className={styles.sortLabel}>Sort by:</span>
          <button
            className={`${styles.sortButton} ${sortBy === 'citations' ? styles.active : ''}`}
            onClick={() => setSortBy('citations')}
          >
            Citations
          </button>
          <button
            className={`${styles.sortButton} ${sortBy === 'date' ? styles.active : ''}`}
            onClick={() => setSortBy('date')}
          >
            Date
          </button>
        </div>
      </div>
      <br/>
      <hr/>
      <div className={styles.container}>
        {sortedPapers.map((paper) => (
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
