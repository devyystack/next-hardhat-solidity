import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const getCategories = async () => {
  try {
    return await Api.get(`${ApiRoutes.get_categories}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getCategories;
