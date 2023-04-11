import Api from "../../utils/axios";

const GetConsumersList = async (data) => {
  try {
    return await Api.get(`/public/admin/nft/consumers/list?` + data, {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetConsumersList;
