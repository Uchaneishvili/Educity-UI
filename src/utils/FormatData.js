export default class FormatData {
  static formatDateTime(val) {
    if (val) {
      return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(val));
    }
    return '';
  }
  static generatePaginationURLPath(query = {}) {
    const params = new URLSearchParams();

    // Add basic pagination params if they exist
    if (query.page) params.append('page', query.page);
    if (query.pageSize) params.append('pageSize', query.pageSize);

    // Add sorting params
    console.log('sort', query);
    if (query.sortBy && query.sortOrder) {
      params.append('sortBy', query.sortBy);
      params.append('sortOrder', query.sortOrder);
    }

    // Add filters
    if (query.filters) {
      Object.entries(query.filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
          } else {
            params.append(key, value);
          }
        }
      });
    }

    // Add custom search params
    if (query.customSearch) {
      Object.entries(query.customSearch).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    // Add static filters
    if (query.staticFilter) {
      Object.entries(query.staticFilter).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const queryString = params.toString();
    return queryString
      ? `${query.pathPrefix || ''}?${queryString}`
      : query.pathPrefix || '';
  }

  static getDifficultyInGeorgian = level => {
    const mapping = {
      beginner: 'დამწყები',
      intermediate: 'საშუალო',
      advanced: 'მაღალი',
    };
    return mapping[level] || level || '';
  };
}
