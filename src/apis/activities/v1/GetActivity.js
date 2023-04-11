import Api from "../../../utils/axios";
const GetActivity = async (token, address) => {
  try {
      return await Api.get(`/activities/${address}`, 
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

export default GetActivity;