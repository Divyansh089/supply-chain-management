import { useState } from "react";

export default ({
  startModal,
  setStartModal,
  startShipment,
  refreshShipments, // Callback to refresh the shipments table
}) => {
  const [shipmentDetails, setShipmentDetails] = useState({
    receiver: "",
    index: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const startShipmentHandler = async () => {
    setLoading(true);
    try {
      await startShipment(shipmentDetails);
      setLoading(false);
      // Close the modal automatically
      setStartModal(false);
      // Trigger a refresh of shipments in the parent, if provided
      if (typeof refreshShipments === "function") {
        refreshShipments();
      }
      // Show success alert and remove it after 3 seconds
      setAlertMessage("Shipment started successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.error("Error starting shipment:", error);
      setLoading(false);
    }
  };

  return startModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setStartModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setStartModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">Start Shipment</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Receiver Address"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipmentDetails({
                      ...shipmentDetails,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Shipment ID"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipmentDetails({
                      ...shipmentDetails,
                      index: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={startShipmentHandler}
                disabled={loading}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                {loading ? "Processing..." : "Start Shipment"}
              </button>
            </form>
            {alertMessage && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                {alertMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
