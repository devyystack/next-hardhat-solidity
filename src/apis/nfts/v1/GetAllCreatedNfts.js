import Api from "../../../utils/axios";
const GetAllCreatedNfts = async (token, data) => {
	try {
		console.log("data payload api...",data)
		return await Api.get(
			`/nfts/created/list?` + data,

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

export default GetAllCreatedNfts;
