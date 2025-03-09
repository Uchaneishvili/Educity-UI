import RequestHelper from '../apis/RequestHelper';

export const addReviewToCourse = async (id, data) => {
  return await RequestHelper.educity.post(`/courses/${id}/reviews`, { data });
};

export const getReviewsById = async id => {
  return await RequestHelper.educity.get(`/courses/${id}/reviews`);
};
