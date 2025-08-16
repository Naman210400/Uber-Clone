const VehiclePanel = ({ handleSelectVehicle, handleCloseModal, book }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[90%] absolute top-0"
        onClick={handleCloseModal}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        className="flex border-2 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between"
        onClick={() => handleSelectVehicle("motorcycle")}
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
        />
        <div className="ml-2 w-2/3">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill" />1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{book.fare["motorcycle"]}</h2>
      </div>
      <div
        className="flex border-2 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between"
        onClick={() => handleSelectVehicle("auto")}
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div className="ml-2 w-2/3">
          <h4 className="font-medium text-base">
            UberAuto
            <span>
              <i className="ri-user-3-fill" />3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{book.fare["auto"]}</h2>
      </div>
      <div
        className="flex border-2 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between"
        onClick={() => handleSelectVehicle("car")}
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          // src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"
        />
        <div className="ml-2 w-2/3">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill" />4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{book.fare["car"]}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
