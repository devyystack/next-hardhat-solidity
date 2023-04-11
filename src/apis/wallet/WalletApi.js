import { checkUserByPublicAddress } from "../common/v1/WalletAddressApi";
import { userSignUp, switchUserSignUp } from "../users/v1/UserSignUp";
import { signMessage } from "../common/v1/SignatureApi";
import { storeCookies } from "../../utils/storeCookies";
import { SessionDataStorage } from "../../utils/storeSessoin";
import web3Connection from "../../utils/web3Connection";
import crypto from "crypto";

// Connect Wallet
export const connectWallet = async () => {
  try {
    const web3 = await web3Connection();
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    let randomValue = crypto.randomBytes(64).toString("hex");
    let deviceId = randomValue.substring(
      randomValue.length - 50,
      randomValue.length
    );

    const result = await getUserByPublicAddress(accountAddress);

    if (!result?.data?.data?.publicAddress) {
      const userData = await handleSignup(accountAddress);
      if (userData?.data?.data?.publicAddress) {
        const nonce = userData?.data?.data?.nonce;
        const publicAddress = userData?.data?.data?.publicAddress;
        const message = "Welcome to DStage:";
        const signature = await getCreateSignature(
          web3,
          nonce,
          publicAddress,
          message
        );
        const tokenData = await generateToken(publicAddress, signature);
        const user = tokenData;
        storeCookies(tokenData?.data?.jwtToken);
        SessionDataStorage("wallet_address", publicAddress);
        SessionDataStorage("device_id", deviceId);
        return user;
      }
    } else {
      const nonce = result?.data?.data?.nonce;
      const publicAddress = result?.data?.data?.publicAddress;
      const message = "Welcome to DStage:";
      const signature = await getCreateSignature(
        web3,
        nonce,
        publicAddress,
        message
      );
      const tokenData = await generateToken(publicAddress, signature);
      const user = tokenData;
      storeCookies(tokenData?.data?.jwtToken);
      SessionDataStorage("wallet_address", publicAddress);
      SessionDataStorage("device_id", deviceId);
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

// Create Signature
export const getCreateSignature = async (
  web3,
  nonce,
  publicAddress,
  message
) => {
  return createSignature(web3, publicAddress, nonce, message);
};

// Generate Token
export const generateToken = async (publicAddress, signature) => {
  return signMessage(publicAddress, signature);
};

// Disconnect Wallet
const disconnect = async function (provider) {
  web3Modal.clearCachedProvider();
  if (provider?.disconnect && provider.disconnect === "function") {
    await provider.disconnect();
  }
};

// Get user data with public address query parameter
export const getUserByPublicAddress = async (address) => {
  try {
    const result = await checkUserByPublicAddress(address);
    if (result?.status === 200) {
      if (result?.data?.is_success) {
        return result;
      }
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

// Create User
export const handleSignup = async (publicAddress) => {
  try {
    const result = await userSignUp(publicAddress);
    if (result?.status === 200) {
      if (result?.data?.is_success) {
        return result;
      }
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

// Sign Signature
const createSignature = (web3, publicAdress, nonce, message) => {
  return web3.eth.personal.sign(`${message} ${nonce}`, `${publicAdress}`, "");
};
