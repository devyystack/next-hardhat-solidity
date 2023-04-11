
import Api from "../../utils/axios";

const GetConsumerProfile = async ( data ) => {
	
	try {
		
		return await Api.get(`/public/admin/nft/Consumers/profile`,{params:{address:data}},
		);
           
	} catch (error) {
		return {
			status: 404,
		};
	}
};

export default GetConsumerProfile;