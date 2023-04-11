// Wallet Connect
import WalletConnectProvider from "@walletconnect/web3-provider";
//import WalletLink from "walletlink";

// Network node
//const API_KEY = process.env.NEXT_PUBLIC_QUICK_NODE_API_RINKEBY;

// Provide (for available wallets)
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    // options: {
    //   infuraId: API_KEY, // required
    // },
  },
  // "custom-walletlink": {
  //   display: {
  //     logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
  //     name: "Coinbase",
  //     description: "Connect to Coinbase Wallet (not Coinbase App)",
  //   },
  //   options: {
  //     appName: "Coinbase", // Your app name
  //     networkUrl: `${process.env.NEXT_PUBLIC_QUICKNODE_RINKEBY_URL}${API_KEY}`,
  //     chainId: 4,
  //   },
  //   package: WalletLink,
  //   connector: async (_, options) => {
  //     const { appName, networkUrl, chainId } = options;
  //     const walletLink = new WalletLink({
  //       appName,
  //     });
  //     const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
  //     await provider.enable();
  //     return provider;
  //   },
  // },
};

export default providerOptions;
