import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {
  const contactMethods = [
    {
      name: 'Email',
      value: 'gkos.mldev@gmail.com',
      href: 'mailto:gkos.mldev@gmail.com',
      icon: '✉',
      description: 'Primary contact method'
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/drkostas',
      href: 'https://www.linkedin.com/in/drkostas',
      icon: '💼',
      description: 'Professional network'
    },
    {
      name: 'GitHub',
      value: 'github.com/drkostas',
      href: 'https://github.com/drkostas',
      icon: '💻',
      description: 'Open source projects'
    },
    {
      name: 'Google Scholar',
      value: 'Research Publications',
      href: 'https://scholar.google.com/citations?user=FlFym8kAAAAJ',
      icon: '🎓',
      description: 'Academic profile'
    },
    {
      name: 'PyPi',
      value: 'pypi.org/user/drkostas',
      href: 'https://pypi.org/user/drkostas',
      icon: '📦',
      description: 'Python packages'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get In Touch</h1>
          <p className={styles.subtitle}>Machine Learning Engineer • Applied Scientist @ Amazon • PhD @ UTK</p>
        </div>

        <div className={styles.bio}>
          <p>
            PhD Machine Learning Engineer with 8+ years building production ML systems for Large Language Models, NLP,
            Computer Vision, and real-time data pipelines at scale. Co-founded XPensAI, leading development of core ML
            algorithms for automated expense tracking and receipt processing, achieving 95% accuracy on receipt scanning.
            Designed multi-agent LLM frameworks at Amazon, improving functional success rates by 12% through rigorous
            experimentation and production monitoring.
          </p>
          <p>
            Proven track record deploying GenAI, RAG pipelines, and traditional ML solutions that drive measurable business
            impact. Published 8 papers at top-tier AI conferences including NeurIPS, ICCV, WACV, IGARSS, and CHASE.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.cardIcon}>{method.icon}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{method.name}</h3>
                <p className={styles.cardValue}>{method.value}</p>
                <p className={styles.cardDescription}>{method.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.availability}>
            <span className={styles.statusIndicator}></span>
            Available to discuss full-time roles, research collaborations, and consulting
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
