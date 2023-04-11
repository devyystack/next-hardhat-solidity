import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
export const checkUserByPublicAddress = async (address) => {
  try {
    return await Api.get(`${ApiRoutes.get_user}?publicAddress=${address}`);
  } catch (error) {
    return {
      status: 404,
    };
  }
};
