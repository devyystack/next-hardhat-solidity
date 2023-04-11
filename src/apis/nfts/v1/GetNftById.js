import Api from "../../../utils/axios";
const GetNftById = async (id) => {
  try {
    return await Api.get(`/public/nft/${id}`, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetNftById;
