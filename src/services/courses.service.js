import FormatData from "../utils/FormatData";
import RequestHelper from "../apis/RequestHelper";

export const getCourses = async (query) => {
  const paginPath = FormatData.generatePaginationURLPath(query);
  return await RequestHelper.educity.get(`/courses${paginPath}`);
};
