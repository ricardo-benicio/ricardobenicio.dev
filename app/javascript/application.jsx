import "@hotwired/turbo-rails"
import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './components/Portfolio';

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Portfolio />);
  }
});
