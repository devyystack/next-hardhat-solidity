import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getBidsByNftId = async (id, address) => {
  try {
    return await Api.get(`${ApiRoutes.get_bids_by_nft}/${id}/${address}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getBidsByNftId;
