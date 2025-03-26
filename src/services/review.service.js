import RequestHelper from '../apis/RequestHelper';
import FormatData from '../utils/FormatData';

export const addReviewToCourse = async (id, data) => {
  return await RequestHelper.educity.post(`/courses/${id}/reviews`, data);
};

export const getReviewsById = async query => {
  const paginPath = FormatData.generatePaginationURLPath(query);
  return await RequestHelper.educity.get(`/courses/reviews${paginPath}`);
};
