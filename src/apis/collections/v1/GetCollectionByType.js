import Api from "../../../utils/axios";
const getCollectionByUserType = async (token, payload) => {
  try {
    return await Api.get(
      `/collections/${payload.creator}/${payload.userId}/${payload.collection_type}/list`,
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

export default getCollectionByUserType;
