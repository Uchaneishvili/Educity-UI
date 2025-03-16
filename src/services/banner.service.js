import RequestHelper from '../apis/RequestHelper';

export const getCurrentBanner = async () => {
  return await RequestHelper.educity.get('/banner');
};
