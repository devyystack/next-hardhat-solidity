import axios from "axios";
// config
import { HOST_API } from "../config";

// ----------------------------------------------------------------------

function getEnvironment(environment) {
  if (environment === "local") {
    return HOST_API.local;
  } else if (environment === "dev") {
    return HOST_API.dev;
  } else if (environment === "production") {
    return HOST_API.production;
  } else {
    return HOST_API.dev;
  }
}

const path = getEnvironment(process.env.NEXT_PUBLIC_NODE_ENV);
export const basePath = path;
const API_ROUTE = "/api/v1";
const Api = axios.create({
  baseURL: basePath + API_ROUTE,
});

export default Api;
