import Api from "../../../utils/axios";
const likeNft = async (token, payload) => {
  try {
    return await Api.post(
      `/likes/add`,
      { user: payload.userId, nft: payload.nftId },

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

export default likeNft;
