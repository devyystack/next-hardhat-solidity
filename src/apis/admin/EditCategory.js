

import Api from "../../utils/axios";

const EditCategory = async (categoryId, fieldName) => {
	
	try {
		return await Api.patch(`/public/admin/categories/${categoryId}`,
        {
            category_name: fieldName
        },
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

export default EditCategory;