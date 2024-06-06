// pages/papers.jsx
import { useEffect, useState } from 'react';
import styles from '../styles/PapersPage.module.css';

const PapersPage = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const response = await fetch('/api/papers');
      const data = await response.json();
      setPapers(data);
    };

    fetchPapers();
  }, []);

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
              <p>
              <div className={styles.cta}>
                <a href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.underline}
                >
                  Read Paper
                </a>
              </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PapersPage;
