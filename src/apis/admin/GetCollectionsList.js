import Api from "../../utils/axios";

const GetCollectionsList = async (data, category, time, token) => {
  try {

    if(!category){
			return await Api.get(`/public/admin/collections/list?`+ data, {},

      );

		}
    else if(!time){
			return await Api.get(`/public/admin/collections/list?`+ data+`&category=${JSON.stringify(category)}`, {},

       );

    }
		else{
			return await Api.get(`/public/admin/collections/list?`+ data+`&category=${JSON.stringify(category)}&time=${JSON.stringify(category)}`, {} , 

       );

		}
  } 
  
  catch (error) {
    return {
      status: 404,
    };
  }
};

export default GetCollectionsList;


