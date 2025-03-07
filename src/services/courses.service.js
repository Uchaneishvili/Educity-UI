import FormatData from '../utils/FormatData';
import RequestHelper from '../apis/RequestHelper';

export const getCourses = async query => {
  const paginPath = FormatData.generatePaginationURLPath(query);
  return await RequestHelper.educity.get(`/courses${paginPath}`, {
    params: {
      isPublished: true,
    },
  });
};

export const getMyCourses = async query => {
  const paginPath = FormatData.generatePaginationURLPath(query);
  return await RequestHelper.educity.get(`/courses/my-courses${paginPath}`);
};

export const getCourseDetails = async id => {
  return await RequestHelper.educity.get(`/courses/${id}`);
};

export const getCourseReviews = async id => {
  return await RequestHelper.educity.get(`/courses/${id}/reviews`);
};

export const checkAccess = async id => {
  return await RequestHelper.educity.get(`/courses/${id}/check-access`);
};

export const getCourseDetailsWithSyllabus = async id => {
  return await RequestHelper.educity.get(`/courses/${id}/content`);
};
