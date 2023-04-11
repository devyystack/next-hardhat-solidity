import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
export const userSignUp = async (address) => {
  try {
    return await Api.post(`${ApiRoutes.create_user}`, {
      publicAddress: address,
    });
  } catch (error) {
    return {
      status: 404,
    };
  }
};
export const switchUserSignUp = async (address) => {
  try {
    return await Api.post(`${ApiRoutes.switch_user}`, {
      publicAddress: address,
    });
  } catch (error) {
    return {
      status: 404,
    };
  }
};
