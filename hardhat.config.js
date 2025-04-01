require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    holesky: {
      url: process.env.HOLESKY_RPC_URL, // e.g., "https://rpc.holesky.eth.aragon.network"
      accounts: [process.env.PRIVATE_KEY], // Your wallet private key
      chainId: 17000, // Confirm the correct chain ID for Holesky
    },
  },
//   etherscan: {
//     apiKey: process.env.ETHERSCAN_API_KEY, // Optional, for contract verification
//   },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
