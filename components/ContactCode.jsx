import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'Email',
    link: 'georgiou.kostas94@gmail.com',
    href: 'mailto:georgiou.kostas94@gmail.com',
  },
  {
    social: 'LinkedIn',
    link: 'linkedin.com/in/gkos',
    href: 'https://www.linkedin.com/in/gkos/',
  },
  {
    social: 'GitHub',
    link: 'github.com/drkostas',
    href: 'https://github.com/drkostas',
  },
  {
    social: 'Google Scholar',
    link: 'scholar.google.com/<gkos>',
    href: 'https://scholar.google.com/citations?user=b___QQ8AAAAJ&hl=en&authuser=1&oi=sra',
  },
  {
    social: 'PyPi',
    link: 'pypi.org/user/drkostas',
    href: 'https://pypi.org/user/drkostas/',
  },
  {
    social: 'Website',
    link: 'gkos.dev',
    href: 'https://gkos.dev',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
       <p className={styles.line}>
       tag: <a>production</a>
        </p>
      <p className={styles.line}>
        <span>kostas</span>&#58;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;&#8212; <span>socials</span>&#58;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
        </p>
      ))}
    </div>
  );
};

export default ContactCode;
