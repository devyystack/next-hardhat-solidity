


import Api from "../../utils/axios";

const AuctionList = async (data) => {
	
	try {
		return await Api.get(`/public/admin/auctions/nfts/list`,data, {},
		// {
		// 	headers: {
		// 		Authorization: "Bearer " + token, //the token is a variable which holds the token
		// 	},
		// }

		);
           
	} catch (error) {
		return {
			status: 404,
		};
	}
};

export default AuctionList;