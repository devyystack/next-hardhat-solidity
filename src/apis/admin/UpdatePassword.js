
import Api from "../../utils/axios";

const UpdatePassword = async (token, current_password, new_password) => {

	
	try {
		return await Api.patch(`/admin/update/password`,
        {
            current_password,
            new_password

        },
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

export default UpdatePassword;