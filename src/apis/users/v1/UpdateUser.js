import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";

const updateUserData = async (payload, id, token) => {
  try {
    return await Api.patch(
      `${ApiRoutes.update_user}/${id}`,
      {
        profileCover: payload.bannerImage,
        profileImage: payload.profileImage,
        userName: payload.userName,
        userEmail: payload.email,
        publicAddress: payload.walletAddress,
        description: payload.description,
        links: {
          web: payload.webLinkUrl,
          instagram: payload.instagramLinkUrl,
          twitter: payload.twitterLinkUrl,
          discord: payload.discordLinkUrl,
          reddit: payload.redditLinkUrl,
        },
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

export default updateUserData;
