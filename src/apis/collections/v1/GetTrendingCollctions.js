import Api from "../../../utils/axios";
const GetTrendingCollctions = async (payload) => {
	try {
		return await Api.get(`/public/collections/list?` + payload, {});
	} catch (error) {
		return {
			status: 404,
		};
	}
};

export default GetTrendingCollctions;
