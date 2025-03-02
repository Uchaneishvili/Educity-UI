import RequestHelper from '../apis/RequestHelper'

export const getSyllabusByCourseId = async (courseId) => {
  return await RequestHelper.educity.get(`/syllabus/course/${courseId}`)
}
