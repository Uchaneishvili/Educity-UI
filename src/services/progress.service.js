import FormatData from '../utils/FormatData';
import RequestHelper from '../apis/RequestHelper';

export const getUserProgressByCourseId = async id => {
  return await RequestHelper.educity.get(`/course-progress/course/${id}`);
};

export const getUserProgresses = async query => {
  const paginPath = FormatData.generatePaginationURLPath(query);
  return await RequestHelper.educity.get(`/course-progress${paginPath}`);
};
export const completeSyllabusLevel = async data => {
  return await RequestHelper.educity.post(
    `/course-progress/complete-level`,
    data,
  );
};
