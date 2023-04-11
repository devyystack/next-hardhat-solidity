import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const GetCollectionWithCategories = async(id)=> {
    try {
        return await Api.get(
            `${ApiRoutes.get_activities_collections}/${id}`, {});
            
            
      } catch (error) {
        return {
          status: 404,
        };
      }
    };

export default GetCollectionWithCategories;