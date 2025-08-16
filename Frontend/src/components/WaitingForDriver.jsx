import React from "react";

const WaitingForDriver = ({ acceptedRide, handleCloseModal }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[90%] absolute top-0"
        onClick={handleCloseModal}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
      </h5>
      <div className="flex items-center justify-between ">
        {acceptedRide.vehicleType === "car" && (
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"
            alt=""
          />
        )}
        {acceptedRide.vehicleType === "auto" && (
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
        )}
        {acceptedRide.vehicleType === "motorcycle" && (
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
            alt=""
          />
        )}
        <div className="text-right">
          <h2 className="text-lg font-medium">
            {acceptedRide.captainId.fullname.firstname}{" "}
            {acceptedRide.captainId.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {acceptedRide.captainId.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Omni</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">
                {acceptedRide.pickupLocation}
              </h3>
              {/* <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">
                {acceptedRide.dropOffLocation}
              </h3>
              {/* <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line" />
            <div>
              <h3 className="text-lg font-medium">₹{acceptedRide.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
