

import Api from "../../utils/axios";

const GetConsumerOwnedNfts = async ( data ) => {
	
	try {
		
		return await Api.get(`/public/admin/nft/Consumers/owned/profile`,{params:{address:data}},
		);
           
	} catch (error) {
		return {
			status: 404,
		};
	}
};

export default GetConsumerOwnedNfts;