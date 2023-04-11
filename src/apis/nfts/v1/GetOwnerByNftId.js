import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getOwnerByNftId = async (id) => {
  try {
    return await Api.get(`${ApiRoutes.get_owner_by_nftId}/${id}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getOwnerByNftId;
