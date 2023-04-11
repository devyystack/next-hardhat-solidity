
import Api from "../../utils/axios";
  const Login = async (email, password) => {
    console.log("email..", email);
  try {
    return await Api.post(`/auth/admin/login`, {email: email, password: password});
  } catch (error) {
    return {
      status: 404,
    };
  }
};

export default Login;