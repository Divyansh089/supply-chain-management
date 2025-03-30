// scripts/test.js

async function main() {
    // Import ethers from Hardhat
    const { ethers } = require("hardhat");
  
    // Load the contract artifact (adjust the path if needed)
    const artifact = require("../artifacts/contracts/Tracking.sol/Tracking.json");
    const ContractABI = artifact.abi;
  
    // Update with your newly deployed contract address on localhost
    const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";
  
    // Create a provider for the local Hardhat node
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  
    // Instantiate your contract instance
    const contract = new ethers.Contract(contractAddress, ContractABI, provider);
  
    // Call the getAllTransactions function
    const transactions = await contract.getAllTransactions();
    console.log("All Transactions:", transactions);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
  