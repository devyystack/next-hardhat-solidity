
import Api from "../../utils/axios";

const NewCreatedNft = async () => {
	
	try {
		return await Api.get(`/public/admin/nfts/list`,{params:{recent: true, limit: "4"}},
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

export default NewCreatedNft;