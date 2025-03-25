// Utility functions for Microsoft Clarity tracking

// Track page views when routes change
export const trackPageView = path => {
  if (window.clarity) {
    window.clarity('set', 'page_view', path);
  }
};

// Track custom events
export const trackEvent = (eventName, eventValue = 'true') => {
  if (window.clarity) {
    window.clarity('set', eventName, eventValue);
  }
};
