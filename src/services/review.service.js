import RequestHelper from '../apis/RequestHelper'

export const addReviewToCourse = async (id, data) => {
  return await RequestHelper.educity.post(`/courses/${id}/reviews`, { data })
}
