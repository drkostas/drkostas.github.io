import { useState } from 'react';
import { getPapers } from './api/papers';
import styles from '../styles/PapersPage.module.css';

const PapersPage = ({ papers }) => {
  const [sortBy, setSortBy] = useState('citations'); // default is citations
  const [expandedPapers, setExpandedPapers] = useState(new Set());

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

  const toggleExpanded = (paperId) => {
    const newExpanded = new Set(expandedPapers);
    if (newExpanded.has(paperId)) {
      newExpanded.delete(paperId);
    } else {
      newExpanded.add(paperId);
    }
    setExpandedPapers(newExpanded);
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className={styles.pageWrapper}>
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

      <div className={styles.container}>
        {sortedPapers.map((paper) => {
          const isExpanded = expandedPapers.has(paper.id);
          const isLongAbstract = paper.abstract.length > 200;

          return (
            <div key={paper.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardHeader}>
                  <h3>{paper.title}</h3>
                  {paper.citations > 0 && (
                    <div className={styles.citationBadge}>{paper.citations}</div>
                  )}
                </div>

                <div className={styles.abstract}>
                  {isExpanded || !isLongAbstract
                    ? paper.abstract
                    : truncateText(paper.abstract)}
                  {isLongAbstract && (
                    <button
                      className={styles.expandButton}
                      onClick={() => toggleExpanded(paper.id)}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.metadata}>
                  <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Conference:</span>
                    <span className={styles.metadataValue}>{paper.conference}</span>
                  </div>
                  <div className={styles.metadataItem}>
                    <span className={styles.metadataLabel}>Year:</span>
                    <span className={styles.metadataValue}>{paper.year}</span>
                  </div>
                </div>

                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readLink}
                  title="Read full paper"
                >
                  PDF →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const papers = getPapers();

  return {
    props: { title: 'Papers', papers },
  };
}

export default PapersPage;
