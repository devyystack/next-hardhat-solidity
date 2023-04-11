import { storeCookies } from "./storeCookies";
import { SessionDataStorage } from "./storeSessoin";
import { switchUserSignUp } from "../apis/users/v1/UserSignUp";

export default async function (data) {
  if (data) {
    const user = await switchUserSignUp(data);
    storeCookies(user?.data?.data?.jwtToken);
    SessionDataStorage("wallet_address", data);
    return user;
  }
}
