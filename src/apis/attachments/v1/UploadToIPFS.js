//imports needed for this function
const axios = require("axios");

const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey, data) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  return axios.post(url, data, {
    maxContentLength: -1,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
      path: "somename",
    },
  });
};

export default pinFileToIPFS;
