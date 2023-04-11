import Api from "../../../utils/axios";

const ownedNfts = async (token, data) => {
	try {
		return await Api.get(
			`/nfts/owned/list?` + data,

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

export default ownedNfts;
