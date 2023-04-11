import Cookies from "universal-cookie";

const cookies = new Cookies();
export const removeCookies = () => {

	const cookie =  cookies.remove('jwt_token', { path: '/' });
    console.log('cookie removed');
    return cookie;
};