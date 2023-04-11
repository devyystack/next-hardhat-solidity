import supportedChains from "src/lib/supportedChains";
export default function getChainData(chainId) {
  if (!chainId) {
    return null;
  }
  const chainData = supportedChains.filter(
    (chain) => chain.chain_id === chainId
  )[0];

  if (!chainData) {
    return "error";
  }
  const API_KEY = process.env.NEXT_PUBLIC_QUICK_NODE_API_RINKEBY;

  if (
    chainData.rpc_url.includes("quiknode.pro") &&
    chainData.rpc_url.includes(API_KEY) &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace(
      process.env.NEXT_PUBLIC_QUICK_NODE_API_RINKEBY,
      API_KEY
    );
    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}
