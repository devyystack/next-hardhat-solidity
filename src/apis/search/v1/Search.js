import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";

const mainSearch = async (value) => {
  console.log("api value", value);
  try {
    return await Api.get(
      `${ApiRoutes.search}`,
      { params: { search: value } },
      {}
    );
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default mainSearch;
