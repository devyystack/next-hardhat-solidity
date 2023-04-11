

import Api from "../../utils/axios";

const TopCreatorsData = async () => {
	
	try {
		return await Api.get(`/public/admin/nft/creators/list`,{params:{limit: "6"}},
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

export default TopCreatorsData;