import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getAllActivitiesByNftId = async (id) => {
  try {
    return await Api.get(`${ApiRoutes.get_activities}/${id}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getAllActivitiesByNftId;
