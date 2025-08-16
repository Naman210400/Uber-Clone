import { Link } from "react-router-dom";
import { CAPTAIN_MODALS } from "../assets/utils/defaultValues";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const finishRideRef = useRef();
  const [activeModal, setActiveModal] = useState(CAPTAIN_MODALS.NONE);

  useGSAP(
    function () {
      const animations = [
        {
          ref: finishRideRef,
          props: {
            transform: `translateY(${
              activeModal === CAPTAIN_MODALS.FINISH_RIDE ? "0" : "100%"
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

  const handleActiveModal = (modal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(CAPTAIN_MODALS.NONE);
  };
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line" />
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 "
        onClick={() => handleActiveModal(CAPTAIN_MODALS.FINISH_RIDE)}
      >
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line" />
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" bg-green-600 rounded-lg text-white font-semibold p-3 px-10">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide handleCloseModal={handleCloseModal} />
      </div>
    </div>
  );
};

export default CaptainRiding;
