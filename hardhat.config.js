require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20", // Compatible with ^0.8.0
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Uncomment and configure if you're deploying to testnet/mainnet
    // goerli: {
    //   url: process.env.GOERLI_RPC_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
