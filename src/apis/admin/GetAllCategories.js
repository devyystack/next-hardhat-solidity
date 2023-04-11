

import Api from "../../utils/axios";

const GetAllCategories = async () => {
	
	try {
		return await Api.get(`/public/admin/categories/list`
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

export default GetAllCategories;