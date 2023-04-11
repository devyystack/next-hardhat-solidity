import Api from "../../../utils/axios";
const GetOnsaleNft = async (token, data) => {
	try {
		return await Api.get(
			`/nfts/onsale/list?` + data,

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

export default GetOnsaleNft;
