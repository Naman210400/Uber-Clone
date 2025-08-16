const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://i.pinimg.com/236x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Captain Name</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">$269</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex items-start justify-evenly gap-5 bg-gray-100 rounded-xl p-3 mt-6">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
