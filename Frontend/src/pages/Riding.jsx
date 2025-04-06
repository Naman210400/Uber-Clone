import React from "react";
import { Link } from "react-router-dom";
const Riding = () => {
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line" />
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between ">
          <img
            className="h-14"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Naman</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">GJ 01 AB 1234</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Omni</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between items-center flex-col">
          <div className="w-full mt-5">
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
        <button className="w-full mt-5 bg-green-600 rounded-lg text-white font-semibold p-2">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
