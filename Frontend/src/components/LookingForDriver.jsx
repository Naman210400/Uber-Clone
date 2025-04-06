import React from "react";

const LookingForDriver = ({ handleActiveModal, handleCloseModal }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[90%] absolute top-0"
        onClick={handleCloseModal}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>
      <div className="flex gap-2 justify-between items-center flex-col">
        <img
          className="h-28"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line" />
            <div>
              <h3 className="text-lg font-medium">$12</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
