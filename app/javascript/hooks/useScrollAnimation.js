import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-based animations using Intersection Observer
 *
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of visibility (0-1) to trigger animation. Default: 0.1
 * @param {string} options.rootMargin - Margin around root. Default: '0px'
 * @param {boolean} options.triggerOnce - Whether animation should trigger only once. Default: true
 * @param {boolean} options.respectMotionPreference - Respect prefers-reduced-motion setting. Default: true
 *
 * @returns {[React.RefObject, boolean]} - Returns a ref to attach to the element and visibility state
 *
 * @example
 * const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
 *
 * return (
 *   <div ref={ref} className={isVisible ? 'fade-in' : 'opacity-0'}>
 *     Content
 *   </div>
 * );
 */
const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    respectMotionPreference = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = respectMotionPreference &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, make element immediately visible
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasTriggered(true);
      return;
    }

    // If element doesn't exist or has already triggered (and triggerOnce is true), skip
    if (!currentElement || (triggerOnce && hasTriggered)) {
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          // If triggerOnce is false, allow re-triggering
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    // Observe the element
    observer.observe(currentElement);

    // Cleanup
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, respectMotionPreference]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
