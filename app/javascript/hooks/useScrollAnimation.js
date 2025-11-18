import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-based animations using Intersection Observer
 *
 * Optimized for performance with the following features:
 * - Memoized callback to prevent observer recreation
 * - Automatic observer disconnection when triggerOnce completes
 * - useRef for non-render-triggering values
 * - Improved mobile performance with optimized threshold
 * - Proper cleanup to prevent memory leaks
 *
 * @param {Object} options - Configuration options
 * @param {number|number[]} options.threshold - Percentage of visibility (0-1) to trigger animation.
 *                                              Default: 0.1 (10% visible). Can be array for multiple thresholds.
 *                                              Mobile optimization: Lower values (0.05-0.15) work better on small viewports.
 * @param {string} options.rootMargin - Margin around root to expand/shrink intersection area.
 *                                      Default: '0px 0px -50px 0px' (triggers slightly before element fully enters viewport).
 *                                      Mobile tip: Use negative bottom margin (e.g., '-100px') to trigger earlier.
 * @param {Element|null} options.root - The element used as viewport for intersection. Default: null (browser viewport)
 * @param {boolean} options.triggerOnce - Whether animation should trigger only once. Default: true
 *                                        Performance: true = better (observer disconnects after trigger)
 * @param {boolean} options.respectMotionPreference - Respect prefers-reduced-motion setting. Default: true
 *
 * @returns {[React.RefObject, boolean]} - Returns a ref to attach to the element and visibility state
 *
 * @example
 * // Basic usage
 * const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
 *
 * // Mobile-optimized with earlier trigger
 * const [ref, isVisible] = useScrollAnimation({
 *   threshold: 0.1,
 *   rootMargin: '0px 0px -100px 0px'
 * });
 *
 * // Multiple thresholds for progressive animation
 * const [ref, isVisible] = useScrollAnimation({
 *   threshold: [0, 0.25, 0.5, 0.75, 1],
 *   triggerOnce: false
 * });
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
    rootMargin = '0px 0px -50px 0px', // Negative bottom margin for better UX: triggers animation slightly before element fully enters viewport
    root = null,
    triggerOnce = true,
    respectMotionPreference = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Performance optimization: Use refs for values that don't need to trigger re-renders
  // This prevents unnecessary effect re-runs when internal state changes
  const observerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // Performance optimization: Memoize the callback to prevent IntersectionObserver recreation
  // This callback is stable across renders unless dependencies change
  const handleIntersection = useCallback(
    ([entry]) => {
      const isIntersecting = entry.isIntersecting;

      // Performance: Early return if already triggered and triggerOnce is true
      if (triggerOnce && hasTriggeredRef.current) {
        return;
      }

      if (isIntersecting) {
        setIsVisible(true);

        if (triggerOnce) {
          hasTriggeredRef.current = true;

          // Performance optimization: Disconnect observer immediately after trigger
          // This reduces ongoing intersection calculations and improves scroll performance
          if (observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      } else if (!triggerOnce) {
        // If triggerOnce is false, allow re-triggering
        setIsVisible(false);
      }
    },
    [triggerOnce] // Only recreate callback if triggerOnce changes
  );

  useEffect(() => {
    const currentElement = elementRef.current;

    // Performance: Check for reduced motion preference only once
    // matchMedia is cached by the browser, but we avoid redundant checks
    if (respectMotionPreference) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // If user prefers reduced motion, make element immediately visible
      // This respects accessibility preferences and improves perceived performance
      if (prefersReducedMotion) {
        setIsVisible(true);
        hasTriggeredRef.current = true;
        return; // Skip observer creation entirely
      }
    }

    // Early return: If element doesn't exist or has already triggered (and triggerOnce is true), skip observer setup
    if (!currentElement || (triggerOnce && hasTriggeredRef.current)) {
      return;
    }

    // Performance: Only create observer if one doesn't already exist
    // This prevents multiple observers on the same element
    if (!observerRef.current) {
      // Create Intersection Observer with optimized options
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold, // Can be single value or array for progressive detection
        rootMargin, // Negative margins trigger animations earlier for smoother UX
        root // null = viewport, or specify custom scrolling container
      });
    }

    // Observe the element
    observerRef.current.observe(currentElement);

    // Cleanup function: Critical for preventing memory leaks
    // This runs when component unmounts or dependencies change
    return () => {
      if (observerRef.current) {
        // Unobserve specific element first
        if (currentElement) {
          observerRef.current.unobserve(currentElement);
        }

        // Disconnect observer to free resources
        // This is especially important on mobile devices with limited memory
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin, root, triggerOnce, respectMotionPreference, handleIntersection]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;

/**
 * Performance Notes:
 *
 * 1. Memory Management:
 *    - Observer disconnects immediately after triggerOnce completes
 *    - Proper cleanup in useEffect prevents memory leaks
 *    - useRef for observer prevents multiple instances
 *
 * 2. Re-render Optimization:
 *    - hasTriggeredRef instead of hasTriggered state (no re-render on trigger)
 *    - Memoized callback prevents observer recreation
 *    - Early returns avoid unnecessary processing
 *
 * 3. Mobile Optimization:
 *    - Default rootMargin with negative bottom (-50px) triggers animations earlier
 *    - Lower threshold values (0.05-0.15) recommended for mobile
 *    - Observer disconnect reduces scroll event processing
 *
 * 4. Best Practices for Usage:
 *    - Use triggerOnce: true for static content (better performance)
 *    - For mobile: rootMargin: '0px 0px -100px 0px' starts animations earlier
 *    - For hero sections: threshold: 0.05 (triggers as soon as visible)
 *    - For full sections: threshold: 0.5 (triggers at 50% visibility)
 *    - Multiple thresholds: [0, 0.25, 0.5, 0.75, 1] for progressive animations
 */
