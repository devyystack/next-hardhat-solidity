
import Api from "../../utils/axios";

const ConsumerData = async ( data ) => {
	
	try {
		return await Api.get(`/public/admin/consumer`,{params:{address:data}},
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

export default ConsumerData;