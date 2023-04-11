

import Api from "../../utils/axios";

const TrendingNftData = async ( data ) => {
	
	try {
		return await Api.get(`/public/admin/nft/trending/detail`,{params:{views: "desc", likes: "desc"}},
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

export default TrendingNftData;