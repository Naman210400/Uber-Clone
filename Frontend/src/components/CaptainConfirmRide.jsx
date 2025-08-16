import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainConfirmedRide = ({
  newRide,
  handleAcceptRide,
  handleCloseModal,
}) => {
  const [otp, setOtp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP submission logic here
    handleAcceptRide(newRide._id, otp);
  };
  return (
    <div>
      <h5
        className="p-1 text-center w-[90%] absolute top-0"
        onClick={handleCloseModal}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to start
      </h3>
      <div className="flex items-center justify-between mt-4 border-2 border-yellow-300 p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/236x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {newRide.userId.fullname.firstname}{" "}
            {newRide.userId.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">{newRide.pickupLocation}</h3>
              {/* <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">{newRide.dropOffLocation}</h3>
              {/* <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line" />
            <div>
              <h3 className="text-lg font-medium">₹{newRide.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="bg-[#eee] mt-5 rounded-lg px-6 py-4 font-mono border w-full text-base placeholder:text-base"
            />
            <button
              type="submit"
              className="w-full flex text-lg justify-center mt-5 bg-green-600 rounded-lgp  text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={handleCloseModal}
              className="w-full mt-1 text-lg bg-red-600 rounded-lg text-white font-semibold p-3"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainConfirmedRide;
