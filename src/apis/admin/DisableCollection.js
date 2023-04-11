
import Api from "../../utils/axios";

const DisableCollection = async (token, id, status) => {
	
	try {
		return await Api.post(`/admin/collection/${id}/${status}`,{},
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

export default DisableCollection;