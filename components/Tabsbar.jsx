import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';

const Tabsbar = () => {
  return (
    <div className={styles.tabs}>
      <Tab icon="/react_icon.svg" filename="home.jsx" path="/" />
      <Tab icon="/html_icon.svg" filename="about.html" path="/about" />
      <Tab icon="/yml_icon.svg" filename="contact.yml" path="/contact" />
      <Tab icon="/py_icon.svg" filename="projects.py" path="/projects" />
      {/* <Tab icon="/json_icon.svg" filename="articles.json" path="/articles" /> */}
      <Tab icon="/markdown_icon.svg" filename="github.md" path="/github" />
    </div>
  );
};

export default Tabsbar;
