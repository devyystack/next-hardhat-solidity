
import Api from "../../utils/axios";

const GetAllCollections = async (data, category, time) => {
  try {

    if(!category){
			return await Api.get(`/public/collections/list?`+ data, {} );

		}
    else if(!time){
			return await Api.get(`/public/collections/list?`+ data+`&category=${JSON.stringify(category)}`, {} );

    }
		else{
			return await Api.get(`/public/collections/list?`+ data+`&category=${JSON.stringify(category)}&time=${JSON.stringify(category)}`, {} );

		}
  } 
  
  catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetAllCollections;