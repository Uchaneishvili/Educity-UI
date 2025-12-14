import RequestHelper from '../apis/RequestHelper';

export const getPurchaseHistory = async () => {
  return await RequestHelper.educity.get('/courses/my-purchases');
};

export const purchaseCourse = async (courseId, promoCode) => {
  return await RequestHelper.educity.post(`/courses/${courseId}/purchase`, {
    promoCode,
  });
};

export const applyPromoCourse = async (id, promoCode, finalPrice) => {
  return await RequestHelper.educity.post(
    `/course-purchases/${id}/apply-promo`,
    {
      code: promoCode,
      price: finalPrice,
    },
  );
};
