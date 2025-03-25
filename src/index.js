import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { trackEvent } from './utils/ClarityTracking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// Add global error handler
window.addEventListener('error', event => {
  trackEvent(
    'js_error',
    `${event.message} at ${event.filename}:${event.lineno}`,
  );
});
