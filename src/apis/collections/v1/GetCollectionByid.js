import Api from "../../../utils/axios";
const GetCollectionByid = async (data) => {
  console.log("API",data)
  try {

    return await Api.get(
      `/public/collections/profile?` + data,  {} );
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetCollectionByid;