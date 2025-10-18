/**
 * CenterResizeHandle Component
 * Draggable handle for resizing split between lesson and artifact in CENTER
 * Works with percentages instead of fixed pixels
 */
import { useState, useEffect, useCallback } from 'react';
import './CenterResizeHandle.css';

export default function CenterResizeHandle({
  onResize,
  initialLessonPercent = 40,
  containerRef
}) {
  const [isDragging, setIsDragging] = useState(false);

  // Constraints: 30% to 70% for each panel
  const MIN_LESSON_PERCENT = 30;
  const MAX_LESSON_PERCENT = 70;

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerLeft = containerRect.left;

    // Calculate mouse position relative to container
    const mouseX = e.clientX - containerLeft;

    // Calculate lesson width percentage
    let lessonPercent = (mouseX / containerWidth) * 100;

    // Clamp between min and max
    lessonPercent = Math.max(MIN_LESSON_PERCENT, Math.min(MAX_LESSON_PERCENT, lessonPercent));

    onResize(lessonPercent);
  }, [isDragging, containerRef, onResize]);

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
      className={`center-resize-handle ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      title="Drag to resize lesson/artifact split"
    >
      <div className="center-resize-handle-line" />
    </div>
  );
}
