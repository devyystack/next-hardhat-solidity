import Api from "../../../utils/axios";
const addView = async (token, payload) => {
  try {
    return await Api.post(
      `/public/views/add`,
      { payload },

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

export default addView;
