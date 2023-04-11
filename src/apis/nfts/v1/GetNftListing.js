import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getListings = async (id) => {
  try {
    return await Api.get(`${ApiRoutes.get_listings}/${id}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getListings;
