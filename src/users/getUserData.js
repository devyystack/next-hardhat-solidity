import { getUserCookie } from "../utils/getCookies";
import jwt_decode from "jwt-decode";
import { getUserByPublicAddressWithToken } from "../apis";

export const getUserData = async () => {
  const token = getUserCookie();
  try {
    if (token) {
      const decoded = jwt_decode(token);
      const wallet = decoded.publicAddress;

      if (token === undefined) {
        return;
      }
      if (wallet === undefined) {
        return;
      }

      const result = await getUserByPublicAddressWithToken(wallet, token);
      return result?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
