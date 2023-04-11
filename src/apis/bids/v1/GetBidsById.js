import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getAllBidsByActivityId = async (id, token) => {
  try {
    return await Api.get(`${ApiRoutes.get_bis_by_activity_id}/${id}`, {
      headers: {
        Authorization: "Bearer " + token, //the token is a variable which holds the token
      },
    });
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getAllBidsByActivityId;
