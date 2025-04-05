import React from "react";

const LocationSearch = ({ handleVehiclePanelOpen }) => {
  return (
    <div className="p-[24px]">
      {[...Array(5)]?.map((_, index) => (
        <div
          className="flex items-center border-2 rounded-xl p-3 border-gray-100 active:border-black my-2 justify-start gap-4"
          key={index}
          onClick={handleVehiclePanelOpen}
        >
          <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill" />
          </h2>
          <h3 className="font-medium">Ahmedabad</h3>
        </div>
      ))}
    </div>
  );
};

export default LocationSearch;
