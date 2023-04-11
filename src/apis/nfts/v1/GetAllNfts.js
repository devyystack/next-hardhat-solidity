import Api from "../../../utils/axios";

const GetAllNfts = async (data) => {
	
	try {
		return await Api.get(`/public/nfts?`+ data, {} );
           
	} catch (error) {
		return {
			status: 404,
		};
	}
};

export default GetAllNfts;
