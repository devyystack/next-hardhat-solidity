require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-polygon");

const { PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      chainId: 137,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.0",
};