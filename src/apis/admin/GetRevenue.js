import Api from "../../utils/axios";

const getRevenue = async (data) => {
  try {
    return await Api.get("/public/admin/recurring-revenue", {});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default getRevenue;
