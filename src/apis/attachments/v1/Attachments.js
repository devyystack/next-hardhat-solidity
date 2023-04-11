import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const uploadAttachment = async (data, token) => {
  try {
    return await Api.post(`${ApiRoutes.upload_attachment}`, data, {
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

export default uploadAttachment;
