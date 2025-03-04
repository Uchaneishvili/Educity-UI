import RequestHelper from '../apis/RequestHelper';

export const getPurchaseHistory = async () => {
  return await RequestHelper.educity.get('/courses/my-purchases');
};

export const purchaseCourse = async courseId => {
  return await RequestHelper.educity.post(`/courses/${courseId}/purchase`);
};
