import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const createActivity = async (payload, token) => {
  try {
    return await Api.post(
      `${ApiRoutes.add_activity}`,
      {
        payload,
      },
      {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      }
    );
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default createActivity;
