import Cookies from "universal-cookie";

const cookies = new Cookies();
export const getUserCookie = () => {
	const cookie =  cookies.get("jwt_token");
    return cookie;
};
