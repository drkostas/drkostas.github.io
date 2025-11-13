import { useState, useEffect } from 'react';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const GithubPage = () => {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Fetch additional repo
        const additionalRepoRes = await fetch(`https://api.github.com/repos/aicip/Cross-Scale-MAE`);
        const additionalRepo = await additionalRepoRes.json();

        // Combine and sort repos
        let allRepos = [...reposData, additionalRepo];
        allRepos = allRepos
          .sort((a, b) => {
            if (a.html_url.includes('EESTech') || a.html_url.includes('COSC') || a.html_url.includes('/drkostas/drkostas')) {
              return 1;
            }
            if (b.html_url.includes('EESTech') || b.html_url.includes('COSC') || b.html_url.includes('/drkostas/drkostas')) {
              return -1;
            }
            return (b.stargazers_count + b.watchers_count + b.forks_count) - (a.stargazers_count + a.watchers_count + a.forks_count);
          })
          .slice(0, 10);

        setRepos(allRepos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

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
      <div> <center><h3>My Most Popular Repositories on Github</h3></center></div>
      <div className={styles.container}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div><center><h3>My Github Calendar</h3></center></div>
      <br />
      <center>
        <div className={styles.contributions}>
          <GitHubCalendar
            username={process.env.NEXT_PUBLIC_GITHUB_USERNAME}
            theme={theme}
            hideColorLegend
          />
        </div>
      </center>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'GitHub' },
  };
}

export default GithubPage;
