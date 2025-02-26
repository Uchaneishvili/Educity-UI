import RequestHelper from '../apis/RequestHelper'

export const getPurchaseHistory = async () => {
  return await RequestHelper.educity.get('/courses/my-purchases')
}
