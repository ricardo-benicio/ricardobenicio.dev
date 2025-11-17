# useScrollAnimation Hook

Custom React hook for implementing scroll-based animations using the Intersection Observer API.

## Features

- Intersection Observer API for performance
- Configurable threshold and rootMargin
- Support for `prefers-reduced-motion`
- Option to trigger once or multiple times
- Easy to integrate with any component

## Installation

The hook is already available in the project at `app/javascript/hooks/useScrollAnimation.js`.

## Usage

### Basic Example

```jsx
import useScrollAnimation from '../hooks/useScrollAnimation';

function MyComponent() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      This content fades in when scrolled into view
    </div>
  );
}
```

### Advanced Example with Options

```jsx
import useScrollAnimation from '../hooks/useScrollAnimation';

function MyComponent() {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.5,           // Trigger when 50% visible
    rootMargin: '-100px',     // Trigger 100px before entering viewport
    triggerOnce: false,       // Re-trigger on each scroll
    respectMotionPreference: true  // Respect user's motion preferences
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      This content scales and fades in
    </div>
  );
}
```

### Multiple Elements

```jsx
import useScrollAnimation from '../hooks/useScrollAnimation';

function MyComponent() {
  const [ref1, isVisible1] = useScrollAnimation({ threshold: 0.2 });
  const [ref2, isVisible2] = useScrollAnimation({ threshold: 0.3 });
  const [ref3, isVisible3] = useScrollAnimation({ threshold: 0.4 });

  return (
    <div>
      <div ref={ref1} className={isVisible1 ? 'animate-fade-in' : 'opacity-0'}>
        First element
      </div>
      <div ref={ref2} className={isVisible2 ? 'animate-slide-in' : 'opacity-0'}>
        Second element
      </div>
      <div ref={ref3} className={isVisible3 ? 'animate-scale-in' : 'opacity-0'}>
        Third element
      </div>
    </div>
  );
}
```

## API

### Parameters

The hook accepts an options object with the following properties:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | number | `0.1` | Percentage of visibility (0-1) required to trigger animation |
| `rootMargin` | string | `'0px'` | Margin around the root element |
| `triggerOnce` | boolean | `true` | Whether animation should trigger only once |
| `respectMotionPreference` | boolean | `true` | Respect user's `prefers-reduced-motion` setting |

### Return Value

Returns an array with two elements:

1. **ref** (React.RefObject): Ref to attach to the element you want to animate
2. **isVisible** (boolean): Whether the element is currently visible in the viewport

## Accessibility

The hook respects the `prefers-reduced-motion` media query by default. When a user has motion preferences enabled, the content is immediately visible without animation.

You can disable this behavior by setting `respectMotionPreference: false`.

## Performance

This hook uses the Intersection Observer API which is highly performant and doesn't impact scroll performance like traditional scroll event listeners would.

## Browser Support

Intersection Observer is supported in all modern browsers. For older browsers, consider using a polyfill:

```bash
npm install intersection-observer
```

Then import it in your app:

```javascript
import 'intersection-observer';
```

## Examples in the Project

This hook can be used throughout the portfolio to add scroll animations to:

- Hero section elements
- Project cards in WorkSection
- Service cards in ServicesSection
- About section content
- Contact section elements

## License

MIT
