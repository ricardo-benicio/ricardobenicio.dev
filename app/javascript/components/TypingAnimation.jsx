import React, { useState, useEffect, useRef } from 'react';

/**
 * TypingAnimation - Configuration defaults (optimized for readability):
 * - typingSpeed: 100ms - balanced, readable speed
 * - deletingSpeed: 50ms - faster deletion for better UX
 * - pauseDuration: 2000ms - 2 seconds to read the text
 * - loop: false - for hero sections, type once and keep visible
 * - showCursor: true - animated blinking cursor
 */
const TypingAnimation = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = false,
  showCursor = true,
  className = ''
}) => {
  const textsArray = Array.isArray(texts) ? texts : [texts];
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isComplete) return;
    const currentText = textsArray[currentIndex];
    const shouldDelete = textsArray.length > 1;

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          if (shouldDelete) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration);
          } else if (!loop) {
            setIsComplete(true);
          }
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          setIsDeleting(false);
          const nextIndex = currentIndex + 1;
          if (nextIndex < textsArray.length) {
            setCurrentIndex(nextIndex);
          } else if (loop) {
            setCurrentIndex(0);
          } else {
            setIsComplete(true);
          }
        }
      }
    };

    timeoutRef.current = setTimeout(handleTyping, typingSpeed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayText, currentIndex, isDeleting, isComplete, textsArray, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="animate-pulse ml-1" aria-hidden="true">|</span>}
    </span>
  );
};

export default TypingAnimation;
