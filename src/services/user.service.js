import RequestHelper from '../apis/RequestHelper';

export const updateUser = async (id, data) => {
  return await RequestHelper.educity.patch(`/users/${id}`, data);
};
