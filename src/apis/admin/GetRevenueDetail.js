import Api from "../../utils/axios";

const getRevenueDetail = async (data) => {
  try {
    return await Api.get("/public/admin/revenue-detail", {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getRevenueDetail;
