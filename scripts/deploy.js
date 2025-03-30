// const hre = require ("hardhat");

// async function main(){
//     const Tracking = await hre.ethers.getContractFactory("Tracking");
//     const tracking = await Tracking.deploy();
//     const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
//     provider.getNetwork().then(network => {
//     console.log("Chain ID:", network.chainId);
// });

//     await tracking.deployed();
//     console.log(`Tracking contract deployed to: ${tracking.address}`);
// }

// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });


const hre = require("hardhat");


async function main() {
  // Create a provider for your local Hardhat node
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

  // Log the network information, including the chain ID
    const network = await provider.getNetwork();
    console.log("Chain ID:", network.chainId);

  // Deploy your Tracking contract
    const Tracking = await hre.ethers.getContractFactory("Tracking");
    const tracking = await Tracking.deploy();
    await tracking.deployed();
    console.log(`Tracking contract deployed to: ${tracking.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
