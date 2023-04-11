import Api from "../../../utils/axios";
import ApiRoutes from "../../ApiRoutes";
const createCollection = async (payload, token) => {
  try {
    return await Api.post(
      `${ApiRoutes.create_collecitons}`,
      {
        profile_image: payload.profileImage,
        profile_cover: payload.bannerImage,
        collection_type: payload.collectionType,
        collection_name: payload.collectionName,
        // contract_name: payload.contractName,
        // symbol: payload.symbol,
        category: payload.category,
        description: payload.description,
        links: {
          web: payload.webLinkUrl,
          instagram: payload.instagramLinkUrl,
          twitter: payload.twitterLinkUrl,
          discord: payload.discordLinkUrl,
          reddit: payload.redditLinkUrl,
        },
        user: payload.user,
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

export default createCollection;
