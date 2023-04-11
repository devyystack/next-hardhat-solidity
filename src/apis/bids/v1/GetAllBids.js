
import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const GetAllBids = async (time) => {
  try {
    return await Api.get(`/public/bids/list?limit=10&time=${time}`, {});
   

  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetAllBids;
