import Api from "../../../utils/axios";
// const GetCollectionByUserId = async (token, payload, skip) => {
//   try {
//     return await Api.get(
//       `/collections/list?userId=${payload.userId}&skip=${skip}`,
//       {
//         headers: {
//           Authorization: "Bearer " + token, //the token is a variable which holds the token
//         },
//       }
//     );
//   } catch (error) {
//     return {
//       status: 404,
//     };
//   }
// };

const GetCollectionByUserId = async (token, data, category) => {
	try {
		if (!category) {
			return await Api.get(`/collections/list?` + data, {
				headers: {
					Authorization: "Bearer " + token, //the token is a variable which holds the token
				},
			});
		} else {
			return await Api.get(
				`/collections/list?` +
					data +
					`&category=${JSON.stringify(category)}`,
				{
					headers: {
						Authorization: "Bearer " + token, //the token is a variable which holds the token
					},
				}
			);
		}
	} catch (error) {
		return {
			status: 404,
		};
	}
};

export default GetCollectionByUserId;
