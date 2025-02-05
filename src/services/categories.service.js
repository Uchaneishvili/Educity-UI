import RequestHelper from '../apis/RequestHelper'

export const getCategories = async () => {
  return await RequestHelper.educity.get(`/categories`)
}
