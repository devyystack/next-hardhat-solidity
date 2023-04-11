import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const updateNFTHash = async (payload, token) => {
  try {
    return await Api.patch(`${ApiRoutes.update_transaction_hash}`, payload, {
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

export default updateNFTHash;
