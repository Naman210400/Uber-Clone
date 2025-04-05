import React, { useRef, useState } from "react";
import { BOOK_RIDE_VALUES } from "../assets/utils/defaultValues";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearch from "../components/LocationSearch";

const Home = () => {
  const [book, setBook] = useState(BOOK_RIDE_VALUES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const vehiclePanelRef = useRef();
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);

  useGSAP(
    function () {
      gsap.to(modalRef.current, {
        height: isModalOpen ? "70%" : "0%",
      });
    },
    [isModalOpen]
  );

  useGSAP(
    function () {
      gsap.to(vehiclePanelRef.current, {
        transform: `translateY(${isVehiclePanelOpen ? "0" : "100%"})`,
      });
    },
    [isVehiclePanelOpen]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleVehiclePanelOpen = () => {
    setIsModalOpen(false);
    setIsVehiclePanelOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end absolute top-0 w-full h-screen">
        <div className="h-[30%] p-5 bg-white relative">
          {isModalOpen && (
            <h5
              className="absolute right-2 top-6 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="ri-arrow-down-wide-line" />
            </h5>
          )}
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-700 rounded-full" />
            <input
              type="text"
              placeholder="Add a pick-up location"
              className="bg-[#eee] mt-5 rounded-lg px-12 py-2 border w-full text-base placeholder:text-base"
              name="from"
              onChange={handleChange}
              value={book.from}
              onClick={() => setIsModalOpen(true)}
            />
            <input
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] mt-3 rounded-lg px-12 py-2 border w-full text-base placeholder:text-base"
              name="to"
              onChange={handleChange}
              value={book.to}
              onClick={() => setIsModalOpen(true)}
            />
          </form>
        </div>
        <div className="h-0 bg-white" ref={modalRef}>
          <LocationSearch handleVehiclePanelOpen={handleVehiclePanelOpen} />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-10 pt-14"
      >
        <h5
          className="p-1 text-center w-[90%] absolute top-0"
          onClick={() => setIsVehiclePanelOpen(false)}
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div className="flex border-2 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between">
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
          <h2 className="text-lg font-semibold">$190</h2>
        </div>
        <div className="flex border-2 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between">
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
          <h2 className="text-lg font-semibold">$80</h2>
        </div>
        <div className="flex border-2 active:border-black mb-3 rounded-xl w-full p-3 items-center justify-between">
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
          <h2 className="text-lg font-semibold">$110</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
