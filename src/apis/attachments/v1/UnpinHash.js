import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const unpinHash = async (hash, token) => {
  try {
    return await Api.post(
      `${ApiRoutes.unpin_hash}/${hash}`,
      {},
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

export default unpinHash;
