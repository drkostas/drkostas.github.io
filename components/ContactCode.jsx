import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'drkostas.github.io',
    href: 'https://drkostas.github.io',
  },
  {
    social: 'email',
    link: 'georgiou.kostas94@gmail.com',
    href: 'mailto:georgiou.kostas94@gmail.com',
  },
  {
    social: 'github',
    link: 'drkostas',
    href: 'https://github.com/drkostas',
  },
  {
    social: 'linkedin',
    link: 'Kostanstantinos',
    href: 'https://www.linkedin.com/in/konstantinos-georgiou/',
  },
  {
    social: 'PyPi',
    link: 'drkostas',
    href: 'https://pypi.org/user/drkostas/',
  },
  {
    social: 'Google Scholar',
    link: 'Konstantinos',
    href: 'https://scholar.google.com/citations?user=b___QQ8AAAAJ&hl=en&authuser=1&oi=sra',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
