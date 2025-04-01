import React , {useState , useEffect} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";

//Internal Import
import tracking from "../artifacts/contracts/Tracking.sol/Tracking.json";
const ContractAddress = "0xf21d32Cf0a79c892a63844A0aAb35cfEcBEe7b1D";
const ContractABI = tracking.abi;

//Fetching Smart Contract
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(ContractAddress , ContractABI , signerOrProvider);

export const TrackingContext = React.createContext();
export const TrackingProvider = ({children}) => {
    //State Variable
    const DappName  = "Product Tracking Dapp";
    const [currentUser , setCurrentUser] = useState("");

    const createShipment = async (items) => {
        const {receiver , pickupTime , distance , price} = items;

        try {
            const web3Modal = new Web3Modal();
            const connection  = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price , 18),
                {
                    value: ethers.utils.parseUnits(price , 18),
                }
            );
            await createItem.wait();
        } catch (error){
            console.log("Some want wrong",error);
        }
    };

    const getAllShipment = async () => {
        try {
            const provider  = new ethers.providers.JsonRpcProvider("https://ethereum-holesky.publicnode.com");
            const contract = fetchContract (provider);
            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender:shipment.sender,
                receiver: shipment.receiver,
                price:ethers.utils.formatEther(shipment.price.toString()),
                pickupTime:shipment.pickupTime.toNumber(),
                deliveryTime:shipment.deliveryTime.toNumber(),
                distance : shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status : shipment.status,
            }));
            return allShipments;
        } catch(error){
            console.log("error want , getting shipment" , error);
        }
    };
    const getShipmentsCount = async () => {
        try {
            if (!window.ethereum) {
                console.log("window.ethereum not available");
                return "Install MetaMask";
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length === 0) {
                console.log("No accounts found");
                return 0;
            }
            const provider = new ethers.providers.JsonRpcProvider("https://ethereum-holesky.publicnode.com");
            const contract = fetchContract(provider);
            const shipmentCount = await contract.getShipmentCount(accounts[0]);
            return shipmentCount.toNumber();
        } catch (error) {
            console.log("Error getting shipment count:", error);
        }
    };
    

    const completeShipment = async (completeShip) => {
        console.log(completeShip);

        const {receiver , index} = completeShip;
        try {
            if(!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider  = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 3000000,
                }
            );
            await transaction.wait();
        } catch (error){
            console.log("Wrong complete shipment", error);
        }
    };

    const getShipment = async (index) => {
        console.log(index * 1 );
        try {
            if(!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider("https://ethereum-holesky.publicnode.com");
            const contract = fetchContract(provider);
            const shipment = await contract.getShipment(accounts[0], index * 1);

            const SingleShipment = {
                sender: shipment[0],
                receiver: shipment[1],
                pickupTime: shipment[2].toNumber(),
                deliveryTime: shipment[3].toNumber(),
                distance : shipment[4].toNumber(),
                price : ethers.utils.formatEther(shipment[5].toString()),
                status : shipment[6],
                isPaid: shipment[7],
                
            };
            console.log("shipment details:" ,SingleShipment);
            return SingleShipment;
        } catch(error){
            console.log("Sorry no shipment" , error);
        }
    };

    const startShipment = async (getProduct) => {
        const {receiver , index} = getProduct;
        try {
            if(!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const shipment = await contract.startShipment(
                accounts[0],
                receiver,
                index * 1,
                
            );
            shipment.wait();
        } catch(error){
            console.log("Sorry no shipment" ,error);
        }
    };

    //--check wallet connected

    const checkIfWalletConnected = async () => {
        try {
            if(!window.ethereum) return false;
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if(accounts.length){
                setCurrentUser(accounts[0]);
            }else{
                return "No account";
            }
        }catch (error){
            return "Not connected";
        }
    };

    //--connect wallet function
    const connectWallet = async () => {
        try {
            if(!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentUser(accounts[0]);
        } catch (error){
            return "Something went wrong";
        }
    };
    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TrackingContext.Provider
            value={{
                connectWallet,
                createShipment,
                getAllShipment,
                
                completeShipment,
                getShipment,
                startShipment,
                getShipmentsCount,
                DappName,
                currentUser,
                
            }}
        >
            {children}
        </TrackingContext.Provider>
    );
    
}; 