import { useState, useEffect } from 'react';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const GithubPage = () => {
  const [allRepos, setAllRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reposToShow, setReposToShow] = useState(10);

  const theme = {
    level0: '#161B22',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        setUser(userData);

        // Fetch repositories
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await repoRes.json();

        // Fetch additional important research repo
        const additionalRepoRes = await fetch(`https://api.github.com/repos/aicip/Cross-Scale-MAE`);
        const additionalRepo = await additionalRepoRes.json();

        // Combine and sort by stars
        let repos = [...reposData, additionalRepo];
        repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        setAllRepos(repos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const displayedRepos = reposToShow === -1 ? allRepos : allRepos.slice(0, reposToShow);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Loading GitHub data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Error loading GitHub data: {error}</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>No user data available</h3>
      </div>
    );
  }

  return (
    <>
      <a href="https://github.com/drkostas" target="_blank" rel="noopener" className={styles.no_color}>
        <div className={styles.user}>
          <div>
            <Image
              src={user.avatar_url}
              className={styles.avatar}
              alt={user.login}
              width={50}
              height={50}
            />
            <h3 className={styles.username}>{user.login}</h3>
          </div>
          <div>
            <h3>{user.public_repos} repos</h3>
          </div>
          <div>
            <h3>{user.followers} followers</h3>
          </div>
        </div>
      </a>

      <div className={styles.header}>
        <h3>Repositories</h3>
        <div className={styles.showControls}>
          <span className={styles.showLabel}>Show:</span>
          <button
            className={`${styles.showButton} ${reposToShow === 10 ? styles.active : ''}`}
            onClick={() => setReposToShow(10)}
          >
            10
          </button>
          <button
            className={`${styles.showButton} ${reposToShow === 25 ? styles.active : ''}`}
            onClick={() => setReposToShow(25)}
          >
            25
          </button>
          <button
            className={`${styles.showButton} ${reposToShow === 50 ? styles.active : ''}`}
            onClick={() => setReposToShow(50)}
          >
            50
          </button>
          <button
            className={`${styles.showButton} ${reposToShow === -1 ? styles.active : ''}`}
            onClick={() => setReposToShow(-1)}
          >
            All
          </button>
        </div>
      </div>
      <hr/>

      <div className={styles.container}>
        {displayedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      <div className={styles.separator}></div>

      <h3>Contribution Activity</h3>
      <div className={styles.contributions}>
        <GitHubCalendar
          username={process.env.NEXT_PUBLIC_GITHUB_USERNAME}
          theme={theme}
          hideColorLegend
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'GitHub' },
  };
}

export default GithubPage;
