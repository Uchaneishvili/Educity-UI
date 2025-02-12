import RequestHelper from '../apis/RequestHelper'
import FormatData from '../utils/FormatData'

export const getWishlist = async (query) => {
  const paginPath = FormatData.generatePaginationURLPath(query)
  return await RequestHelper.educity.get(`/course-favorites${paginPath}`)
}

export const addToWishlist = async (id) => {
  return await RequestHelper.educity.post(`/course-favorites`, { courseId: id })
}

export const removeFromWishlist = async (id) => {
  return await RequestHelper.educity.delete(`/course-favorites/${id}`)
}
