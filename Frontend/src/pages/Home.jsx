import React, { useRef, useState } from "react";
import { BOOK_RIDE_VALUES, USER_MODALS } from "../assets/utils/defaultValues";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearch from "../components/LocationSearch";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import "remixicon/fonts/remixicon.css";

const Home = () => {
  const [book, setBook] = useState(BOOK_RIDE_VALUES);
  const modalRef = useRef();
  const vehiclePanelRef = useRef();
  const confirmRideRef = useRef();
  const lookingForDriverRef = useRef();
  const waitingForDriverRef = useRef();
  const [activeModal, setActiveModal] = useState(USER_MODALS.NONE);

  useGSAP(
    function () {
      const animations = [
        {
          ref: modalRef,
          props: {
            height: activeModal === USER_MODALS.LOCATION ? "70%" : "0%",
          },
        },
        {
          ref: vehiclePanelRef,
          props: {
            transform: `translateY(${
              activeModal === USER_MODALS.VEHICLES ? "0" : "100%"
            })`,
          },
        },
        {
          ref: confirmRideRef,
          props: {
            transform: `translateY(${
              activeModal === USER_MODALS.CONFIRM_RIDE ? "0" : "100%"
            })`,
          },
        },
        {
          ref: lookingForDriverRef,
          props: {
            transform: `translateY(${
              activeModal === USER_MODALS.LOOKING_FOR_DRIVER ? "0" : "100%"
            })`,
          },
        },
        {
          ref: waitingForDriverRef,
          props: {
            transform: `translateY(${
              activeModal === USER_MODALS.WAITING_FOR_DRIVER ? "0" : "100%"
            })`,
          },
        },
      ];

      animations.forEach(({ ref, props }) => {
        gsap.to(ref.current, props);
      });
    },
    [activeModal]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleActiveModal = (modal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(USER_MODALS.NONE);
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
          {activeModal === USER_MODALS.LOCATION && (
            <h5
              className="absolute right-2 top-6 text-2xl"
              onClick={handleCloseModal}
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
              onClick={() => handleActiveModal(USER_MODALS.LOCATION)}
            />
            <input
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] mt-3 rounded-lg px-12 py-2 border w-full text-base placeholder:text-base"
              name="to"
              onChange={handleChange}
              value={book.to}
              onClick={() => handleActiveModal(USER_MODALS.LOCATION)}
            />
          </form>
        </div>
        <div className="h-0 bg-white" ref={modalRef}>
          <LocationSearch handleActiveModal={handleActiveModal} />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-10 pt-12"
      >
        <VehiclePanel
          handleActiveModal={handleActiveModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div
        ref={confirmRideRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
      >
        <ConfirmedRide
          handleActiveModal={handleActiveModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
      >
        <LookingForDriver
          handleActiveModal={handleActiveModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
      >
        <WaitingForDriver
          handleActiveModal={handleActiveModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Home;
