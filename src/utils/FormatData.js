export default class FormatData {
  static generatePaginationURLPath(query) {
    let path = `${query.pathPrefix}?page=${query.page}&pageSize=${query.pageSize}`;
    if (query.sortField && query.sortOrder)
      path += `&sortField=${query.sortField}&sortOrder=${query.sortOrder}`;

    if (query.filters) {
      for (let key in query.filters) {
        let value = query.filters[key];
        if (value) {
          if (Array.isArray(value)) {
            value.join(",");
          }
          path += `&${key}=${query.filters[key]}`;
        }
      }
    }
    if (query.customSearch) {
      for (let key in query.customSearch) {
        if (query.customSearch[key]) {
          path += `&${key}=${encodeURIComponent(query.customSearch[key])}`;
        }
      }
    }
    if (query.staticFilter) {
      for (let key in query.staticFilter) {
        if (query.staticFilter[key]) {
          path += `&${key}=${encodeURIComponent(query.staticFilter[key])}`;
        }
      }
    }
    return path;
  }
}
