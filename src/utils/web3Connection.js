import Web3Modal from "web3modal";
import Web3 from "web3";
import { toast } from "react-toastify";
import getChainData from "./getChainData";
// provider options
import providerOptions from "src/wallet/Wallets";
let web3Modal = null;
// Set web3 provider
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    network: "rinkeby",
    providerOptions,
  });
}
export default async function web3Connection() {
  try {
    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    const data = getChainData(id);
    if (data === "error") {
      toast.error("Network not supported.");
      return data;
    }

    return web3;
  } catch (error) {
    console.log("Error", error);
  }
}
