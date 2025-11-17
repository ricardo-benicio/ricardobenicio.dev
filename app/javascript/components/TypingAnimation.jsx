import React, { useState, useEffect, useRef } from 'react';

/**
 * TypingAnimation - A reusable component that creates a typewriter effect
 *
 * This component animates text character-by-character with typing and deleting effects.
 * It supports single or multiple texts with customizable speeds and behaviors.
 * Respects user's prefers-reduced-motion accessibility preference.
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {string|string[]} props.texts - Single text string or array of texts to animate
 * @param {number} [props.typingSpeed=100] - Speed of typing in milliseconds per character
 * @param {number} [props.deletingSpeed=50] - Speed of deleting in milliseconds per character
 * @param {number} [props.pauseDuration=2000] - Pause duration in milliseconds after typing completes
 * @param {boolean} [props.loop=true] - Whether to loop through texts continuously (only for arrays)
 * @param {boolean} [props.showCursor=true] - Whether to show the blinking cursor
 * @param {string} [props.className=''] - Additional CSS classes to apply to the container
 * @param {boolean} [props.respectMotionPreference=true] - Respect prefers-reduced-motion setting
 *
 * @returns {JSX.Element} The typing animation component
 *
 * @example
 * // Single text
 * <TypingAnimation texts="Hello, World!" />
 *
 * @example
 * // Multiple texts with custom settings
 * <TypingAnimation
 *   texts={["Developer", "Designer", "Creator"]}
 *   typingSpeed={80}
 *   deletingSpeed={40}
 *   pauseDuration={1500}
 *   loop={true}
 *   showCursor={true}
 *   className="text-4xl font-bold"
 * />
 *
 * @example
 * // Single text, type once and stop
 * <TypingAnimation
 *   texts="Welcome to my portfolio"
 *   loop={false}
 *   showCursor={false}
 * />
 */
const TypingAnimation = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  showCursor = true,
  className = '',
  respectMotionPreference = true
}) => {
  // Convert single text to array for consistent handling
  const textsArray = Array.isArray(texts) ? texts : [texts];

  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = respectMotionPreference &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, show the full text immediately
    if (prefersReducedMotion) {
      setDisplayText(textsArray[0]);
      setIsComplete(true);
      return;
    }

    // Cleanup function to clear timeout on unmount or dependency changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [respectMotionPreference, textsArray]);

  useEffect(() => {
    // Skip animation if complete or if user prefers reduced motion
    const prefersReducedMotion = respectMotionPreference &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isComplete || prefersReducedMotion) {
      return;
    }

    const currentText = textsArray[currentTextIndex];
    const shouldDelete = textsArray.length > 1; // Only delete if multiple texts

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (displayText.length < currentText.length) {
          // Add next character
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(handleTyping, typingSpeed);
        } else {
          // Finished typing current text
          if (shouldDelete) {
            // Pause before deleting (only for multiple texts)
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, pauseDuration);
          } else {
            // Single text: mark as complete
            if (!loop) {
              setIsComplete(true);
            }
          }
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          // Remove last character
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Finished deleting
          setIsDeleting(false);

          // Move to next text
          const nextIndex = currentTextIndex + 1;
          if (nextIndex < textsArray.length) {
            // Move to next text in array
            setCurrentTextIndex(nextIndex);
          } else {
            // Reached end of array
            if (loop) {
              // Loop back to first text
              setCurrentTextIndex(0);
            } else {
              // Stop animation
              setIsComplete(true);
            }
          }
        }
      }
    };

    // Start the typing animation
    timeoutRef.current = setTimeout(handleTyping, typingSpeed);

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    currentTextIndex,
    isDeleting,
    isComplete,
    textsArray,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    respectMotionPreference
  ]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="cursor-blink ml-1 text-white" aria-hidden="true">
          |
        </span>
      )}
    </span>
  );
};

export default TypingAnimation;

/*
 * COMPONENT TESTING NOTES:
 *
 * Test Cases to Verify:
 *
 * 1. Single Text Behavior:
 *    <TypingAnimation texts="Hello" loop={false} />
 *    Expected: Types "Hello" once and stops
 *
 * 2. Multiple Texts with Loop:
 *    <TypingAnimation texts={["One", "Two", "Three"]} loop={true} />
 *    Expected: Types "One", deletes, types "Two", deletes, types "Three", deletes, loops back to "One"
 *
 * 3. Multiple Texts without Loop:
 *    <TypingAnimation texts={["One", "Two"]} loop={false} />
 *    Expected: Types "One", deletes, types "Two", stops
 *
 * 4. Custom Speeds:
 *    <TypingAnimation texts="Fast" typingSpeed={50} deletingSpeed={25} />
 *    Expected: Types and deletes faster than default
 *
 * 5. No Cursor:
 *    <TypingAnimation texts="No cursor" showCursor={false} />
 *    Expected: Text without blinking cursor
 *
 * 6. Prefers Reduced Motion:
 *    When system setting prefers-reduced-motion is enabled
 *    Expected: Shows first text immediately without animation
 *
 * 7. Memory Leak Prevention:
 *    Mount and unmount component multiple times
 *    Expected: No lingering timeouts, clean cleanup
 *
 * 8. Props Changes:
 *    Change texts prop while component is running
 *    Expected: Animation adapts to new texts array
 */
