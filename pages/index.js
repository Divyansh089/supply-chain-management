import React , { useState , useEffect , useContext} from "react";

//Internal Import
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,

} from "../Components/index";
// console.log("Table:", Table);
// console.log("Form:", Form);
// console.log("Services:", Services);
// console.log("Profile:", Profile);
// console.log("CompleteShipment:", CompleteShipment);
// console.log("GetShipment:", GetShipment);
// console.log("StartShipment:", StartShipment);


import {TrackingContext} from  "../Context/TrackingContext";

const index = () => {
  const {
    currentUser, 
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  //State Variable
  const [createShipmentModal, setCreateShipmentModal] = useState(false);
  const [openProfile , setOpenProfile] = useState(false);
  const [startModal , setStartModal] = useState(false);
  const [completeModal , setCompleteModal] = useState(false);
  const [getModal , setGetModal] = useState(false);

  // Data State Variable
  const [allShipmentsData, setallShipmentsData] = useState();
  useEffect(() => {
    const getCampaignsData = getAllShipment();
    return async () => {
      const allData = await getCampaignsData;
      setallShipmentsData(allData);
    };
  }, []);

    return (
      <>
        <Services 
        setOpenProfile = {setOpenProfile}
        setCreateShipmentModal = {setCreateShipmentModal}
        setGetModal = {setGetModal}
        setStartModal = {setStartModal}
        />
        <Table
          setCreateShipmentModal = {setCreateShipmentModal}
          allShipmentsData = {allShipmentsData}
        />
        <Form
          createShipmentModal = {createShipmentModal}
          createShipment = {createShipment}
          setCreateShipmentModal = {setCreateShipmentModal}
        />
        <Profile
          openProfile = {openProfile}
          setOpenProfile = {setOpenProfile}
          currentUser = {currentUser}
          getShipmentCount = {getShipmentCount}
        />
        <CompleteShipment
          completeModal = {completeModal}
          setCompleteModal = {setCompleteModal}
          completeShipment = {completeShipment}
        />
        <GetShipment
          getModal = {getModal}
          setGetModal = {setGetModal}
          getShipment = {getShipment}
        />
        <StartShipment
          startModal = {startModal}
          setStartModal = {setStartModal}
          startShipment = {startShipment}
        />
      </>
    );
};

export default index;