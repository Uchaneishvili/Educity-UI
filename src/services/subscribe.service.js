import RequestHelper from '../apis/RequestHelper'

export const subscribeToCourse = async (email) => {
  return await RequestHelper.educity.post(`/subscription`, { email })
}
