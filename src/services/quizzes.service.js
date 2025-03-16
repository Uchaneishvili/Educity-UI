import RequestHelper from '../apis/RequestHelper';

export const submitQuizAnswers = async payload => {
  return await RequestHelper.educity.post(`/quizzes/check-answers`, payload);
};
