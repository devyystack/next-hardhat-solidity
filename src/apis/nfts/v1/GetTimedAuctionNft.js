
import Api from "../../../utils/axios";

const GetTimedAuctionNft = async (payload) => {
  try {

    return await Api.get(`/public/bids/list?limit=5&skip=0&video=false`);
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetTimedAuctionNft;
