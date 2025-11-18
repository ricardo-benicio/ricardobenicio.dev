/**
 * useScrollAnimation Hook - Usage Examples
 *
 * This file demonstrates best practices and performance-optimized usage patterns
 * for the useScrollAnimation hook in different scenarios.
 */

import useScrollAnimation from './useScrollAnimation';

// ============================================================================
// Example 1: Basic Usage - Hero Section
// ============================================================================
// Best for: Above-the-fold content that should animate as soon as visible
// Performance: Optimal - uses triggerOnce and low threshold

function HeroSection() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.05, // Triggers when just 5% of element is visible
    rootMargin: '0px', // No margin needed for hero (already at top)
  });

  return (
    <section
      ref={ref}
      className={`transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1>Welcome to My Portfolio</h1>
    </section>
  );
}

// ============================================================================
// Example 2: Mobile-Optimized Cards
// ============================================================================
// Best for: Card grids, portfolio items on mobile devices
// Performance: Triggers earlier on mobile viewports for smoother UX

function ProjectCard({ project }) {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px', // Triggers 100px before entering viewport
    // This prevents animations from firing too late on mobile
  });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0'
      }`}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
}

// ============================================================================
// Example 3: Progressive Section Reveals
// ============================================================================
// Best for: Full-height sections that should animate when centered
// Performance: Medium threshold ensures user sees the animation

function AboutSection() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.5, // Triggers when 50% of section is visible
    rootMargin: '0px 0px -50px 0px', // Default - slight early trigger
  });

  return (
    <section
      ref={ref}
      className={`min-h-screen transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <h2>About Me</h2>
      <p>Professional background...</p>
    </section>
  );
}

// ============================================================================
// Example 4: Staggered Animation (Multiple Elements)
// ============================================================================
// Best for: Lists, feature grids with sequential animation
// Performance: Each element manages its own observer efficiently

function FeatureList({ features }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureItem key={feature.id} feature={feature} index={index} />
      ))}
    </div>
  );
}

function FeatureItem({ feature, index }) {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px',
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700`}
      style={{
        // Staggered delay based on index
        transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
}

// ============================================================================
// Example 5: Re-triggerable Animation (Scroll Up/Down)
// ============================================================================
// Best for: Parallax effects, dynamic content that changes on scroll
// Performance: Less optimal - use sparingly, observer stays active

function ParallaxSection() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for smooth tracking
    triggerOnce: false, // Animation re-triggers on scroll up/down
    rootMargin: '0px',
  });

  return (
    <div
      ref={ref}
      className={`transition-transform duration-500 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="parallax-content">
        Content that animates in and out
      </div>
    </div>
  );
}

// ============================================================================
// Example 6: Custom Scroll Container (Modal/Sidebar)
// ============================================================================
// Best for: Scrollable modals, sidebars, or custom containers
// Performance: Scoped observer to specific container

function ScrollableModal() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="modal-container overflow-y-auto h-96">
      <ModalContent container={containerRef.current} />
    </div>
  );
}

function ModalContent({ container }) {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.3,
    root: container, // Observe within modal container instead of viewport
    rootMargin: '0px',
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      Modal content that animates when scrolled into view within the modal
    </div>
  );
}

// ============================================================================
// Example 7: Accessibility-First Animation
// ============================================================================
// Best for: All animations - respects user preferences
// Performance: Skips observer creation entirely if motion is reduced

function AccessibleSection() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.2,
    respectMotionPreference: true, // Default, but shown explicitly
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      // If user has prefers-reduced-motion, isVisible will be true immediately
      // No animation will occur, content just appears
    >
      Content respects user motion preferences
    </div>
  );
}

// ============================================================================
// Performance Tips
// ============================================================================

/**
 * DO's:
 * - Use triggerOnce: true for most animations (better performance)
 * - Use lower threshold values (0.05-0.15) for mobile devices
 * - Use negative rootMargin bottom for earlier animation triggers
 * - Let respectMotionPreference: true (default) for accessibility
 * - Disconnect observers when not needed (hook does this automatically)
 *
 * DON'Ts:
 * - Avoid triggerOnce: false unless necessary (keeps observer active)
 * - Don't use very high thresholds on mobile (elements may be mostly off-screen)
 * - Don't create animations without transitions (will appear jumpy)
 * - Don't animate too many elements simultaneously (stagger them)
 *
 * Mobile Optimization:
 * - rootMargin: '0px 0px -100px 0px' triggers earlier
 * - threshold: 0.1 or lower for small viewports
 * - Shorter animation durations (300-500ms vs 700-1000ms)
 *
 * Memory/Performance:
 * - Hook automatically disconnects observers when triggerOnce completes
 * - Uses refs instead of state where possible to avoid re-renders
 * - Memoized callback prevents observer recreation
 * - Proper cleanup on unmount prevents memory leaks
 */

export {
  HeroSection,
  ProjectCard,
  AboutSection,
  FeatureList,
  ParallaxSection,
  ScrollableModal,
  AccessibleSection,
};
