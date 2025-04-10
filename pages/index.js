import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../Components/index";
import { TrackingContext } from "../Context/TrackingContext";

const IndexPage = () => {
  // Destructure functions and values from context
  const {
    currentUser, 
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  // Modal state variables
  const [createShipmentModal, setCreateShipmentModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  // Data state for shipments and refresh flag for auto-reload
  const [allShipmentsData, setAllShipmentsData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Fetch shipments when refreshFlag changes
  useEffect(() => {
    async function fetchShipments() {
      const allData = await getAllShipment();
      setAllShipmentsData(allData);
    }
    fetchShipments();
  }, [refreshFlag, getAllShipment]);

  // Callback to refresh shipments
  const refreshShipments = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <>
      <Services
        setOpenProfile={setOpenProfile}
        setCreateShipmentModal={setCreateShipmentModal}
        setGetModal={setGetModal}
        setStartModal={setStartModal}
        setCompleteModal={setCompleteModal}
      />
      <Table
        setCreateShipmentModal={setCreateShipmentModal}
        allShipmentsData={allShipmentsData}
      />
      <Form
        createShipmentModal={createShipmentModal}
        createShipment={async (shipmentData) => {
          await createShipment(shipmentData);
          refreshShipments();
        }}
        setCreateShipmentModal={setCreateShipmentModal}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentsCount={getShipmentsCount}
        refreshFlag={refreshFlag} 
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
        refreshShipments={refreshShipments}
      />
      <GetShipment
        getModal={getModal}
        setGetModal={setGetModal}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
        refreshShipments={refreshShipments}
      />
    </>
  );
};

export default IndexPage;
