import { useState } from "react";

export default ({
  setCreateShipmentModal,
  createShipmentModal,
  createShipment,
}) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createItem = async () => {
    console.log("createItem triggered with shipment:", shipment);
    setLoading(true);
    try {
      await createShipment(shipment);
      setLoading(false);
      setCreateShipmentModal(false);
      setAlertMessage("Shipment created successfully!");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      console.log("Error creating shipment", error);
      setLoading(false);
    }
  };

  return createShipmentModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9.586l-3.293-3.293-1.414 1.414L8.586 11 5.293 14.293l1.414 1.414L10 12.414l3.293 3.293 1.414-1.414L11.414 11l3.293-3.293-1.414-1.414L10 9.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Track product, Create Shipment
            </h4>
            <p className="text-[15px] text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, receiver: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="pickupTime"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, pickupTime: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="distance"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, distance: e.target.value })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({ ...shipment, price: e.target.value })
                  }
                />
              </div>
              <button
                onClick={createItem}
                disabled={loading}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                {loading ? "Loading..." : "Create Shipment"}
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
