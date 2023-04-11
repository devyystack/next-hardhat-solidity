import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
export const signMessage = async (address, signature) => {
  try {
    return await Api.post(`${ApiRoutes.wallet_login}`, {
      publicAddress: address,
      signature: signature,
    });
  } catch (error) {
    return {
      status: 404,
    };
  }
};
