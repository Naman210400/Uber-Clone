const FinishRide = ({ handleFinishRide, ride, handleCloseModal }) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[90%] absolute top-0"
        onClick={handleCloseModal}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between mt-4 border-2 border-yellow-300 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/236x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {ride.userId.fullname.firstname} {ride.userId.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">{ride.pickupLocation}</h3>
              {/* <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">{ride.dropOffLocation}</h3>
              {/* <p className="text-sm -mt-1 text-gray-600">Ahmedabad, India</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line" />
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <button
            onClick={handleFinishRide}
            className="w-full flex justify-center mt-5 text-lg bg-green-600 rounded-lgp  text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="text-xs mt-5">
            Note : Click on finish ride, if you have completed the ride.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
