
import Api from "../../utils/axios";

const LiveAuctions = async () => {
	
	try {
		return await Api.get(`/public/admin/auctions/nfts/list`,{params:{skip: 0, limit: "5"}},
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

export default LiveAuctions;