import RequestHelper from '../apis/RequestHelper'

export const getWishlist = async () => {
  return await RequestHelper.educity.get(`/course-favorites`)
}

export const addToWishlist = async (id) => {
  return await RequestHelper.educity.post(`/course-favorites`, { courseId: id })
}

export const removeFromWishlist = async (id) => {
  return await RequestHelper.educity.delete(`/course-favorites/${id}`)
}
