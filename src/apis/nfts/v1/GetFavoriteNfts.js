


import Api from "../../../utils/axios";
const getFavoriteNfts = async (token, address, skip) => {
  try {

    return await Api.get(`/nfts/liked/list?address=${address}&skip=${skip}`,

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

export default getFavoriteNfts;