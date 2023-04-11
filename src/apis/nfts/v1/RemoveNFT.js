import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const removeNFT = async (id, token) => {
  try {
    return await Api.delete(`${ApiRoutes.remove_nft}/${id}`, {
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

export default removeNFT;
