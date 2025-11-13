import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Tab.module.css';

const Tab = ({ icon, filename, path, index, isDragging, isDragOver, onDragStart, onDragOver, onDragEnd }) => {
  const router = useRouter();
  const [dragStartPos, setDragStartPos] = useState(null);

  const handleMouseDown = (e) => {
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e) => {
    // Only navigate if it was a click, not a drag
    if (dragStartPos) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - dragStartPos.x, 2) +
        Math.pow(e.clientY - dragStartPos.y, 2)
      );

      // If mouse moved less than 5 pixels, consider it a click
      if (distance < 5) {
        router.push(path);
      }
    }
    setDragStartPos(null);
  };

  const handleDragStart = (e) => {
    onDragStart(e, index);
    setDragStartPos(null);
  };

  const handleDragEnd = (e) => {
    onDragEnd(path); // Pass path to navigate after drop
  };

  const wrapperClasses = [
    styles.tabWrapper,
    isDragging && styles.dragging,
    isDragOver && styles.dragOver,
  ].filter(Boolean).join(' ');

  return (
    <div
      draggable
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={handleDragEnd}
      className={wrapperClasses}
    >
      <div
        className={`${styles.tab} ${router.pathname === path && styles.active}`}
      >
        <Image src={icon} alt={filename} height={18} width={18} />
        <p>{filename}</p>
      </div>
    </div>
  );
};

export default Tab;
