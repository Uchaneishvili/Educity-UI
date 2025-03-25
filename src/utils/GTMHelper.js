// Initialize data layer array if it doesn't exist
window.dataLayer = window.dataLayer || [];

const GTMHelper = {
  // Track page views
  pageView: pagePath => {
    window.dataLayer.push({
      event: 'page_view',
      page: {
        path: pagePath,
      },
    });
  },

  // Track custom events
  event: (eventName, eventParams = {}) => {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  },
};

export default GTMHelper;
