
import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
// Get user data with public address query parameter
 const getUserByPublicAddressWithToken = async (address,token) => {
    try {
     
        return await Api.get(`${ApiRoutes.get_user_by_slug}/${address}`,
        {
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

  export default getUserByPublicAddressWithToken;