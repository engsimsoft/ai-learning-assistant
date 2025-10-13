/**
 * ResizeHandle Component
 * Draggable handle for resizing the right sidebar
 */
import { useState, useEffect, useCallback } from 'react';
import './ResizeHandle.css';

export default function ResizeHandle({ onResize, minWidth, maxWidth, initialWidth }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    // Calculate new width (distance from right edge of screen)
    const newWidth = window.innerWidth - e.clientX;

    // Clamp between min and max
    const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

    onResize(clampedWidth);
  }, [isDragging, minWidth, maxWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`resize-handle ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      title="Drag to resize"
    >
      <div className="resize-handle-line" />
    </div>
  );
}
