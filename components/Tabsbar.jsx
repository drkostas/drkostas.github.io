import { useState } from 'react';
import { useRouter } from 'next/router';
import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';

const initialTabs = [
  { id: 'home', icon: '/react_icon.svg', filename: 'home.jsx', path: '/' },
  { id: 'resume', icon: '/html_icon.svg', filename: 'resume.html', path: '/resume' },
  { id: 'contact', icon: '/yml_icon.svg', filename: 'contact.yml', path: '/contact' },
  { id: 'projects', icon: '/py_icon.svg', filename: 'projects.py', path: '/projects' },
  { id: 'papers', icon: '/json_icon.svg', filename: 'papers.json', path: '/papers' },
  { id: 'github', icon: '/markdown_icon.svg', filename: 'github.md', path: '/github' },
];

const Tabsbar = () => {
  const router = useRouter();
  const [tabs, setTabs] = useState(initialTabs);
  const [draggedTab, setDraggedTab] = useState(null);
  const [dragOverTab, setDragOverTab] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedTab(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.currentTarget);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverTab(index);

    if (draggedTab === null || draggedTab === index) return;

    const newTabs = [...tabs];
    const draggedItem = newTabs[draggedTab];

    // Remove from old position
    newTabs.splice(draggedTab, 1);
    // Insert at new position
    newTabs.splice(index, 0, draggedItem);

    setTabs(newTabs);
    setDraggedTab(index);
  };

  const handleDragEnd = (path) => {
    setDraggedTab(null);
    setDragOverTab(null);

    // Navigate to the dropped tab (like VSCode does)
    if (path && router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.id}
          icon={tab.icon}
          filename={tab.filename}
          path={tab.path}
          index={index}
          isDragging={draggedTab === index}
          isDragOver={dragOverTab === index && draggedTab !== index}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
};

export default Tabsbar;
