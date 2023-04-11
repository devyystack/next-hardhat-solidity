import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getAllActivitiesWithOwnerByNftId = async (id) => {
  try {
    return await Api.get(`${ApiRoutes.get_activities_by_owner}/${id}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getAllActivitiesWithOwnerByNftId;
