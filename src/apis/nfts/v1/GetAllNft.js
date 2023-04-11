
import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const GetAllNft = async () => {
  try {
    return await Api.get(`${ApiRoutes.get_nfts}`, {});
  } 
  catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetAllNft;
