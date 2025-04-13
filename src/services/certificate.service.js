import RequestHelper from '../apis/RequestHelper';

export const getCertificateById = async id => {
  return await RequestHelper.educity.get(`/certificates/courses/${id}/jpg`);
};
