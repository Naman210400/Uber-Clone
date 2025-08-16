import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CAPTAIN_MODALS } from "../assets/utils/defaultValues";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import gsap from "gsap";
import CaptainConfirmedRide from "../components/CaptainConfirmRide";

const CaptainHome = () => {
  const ridePopUpRef = useRef();
  const confirmRideRef = useRef();
  const [activeModal, setActiveModal] = useState(CAPTAIN_MODALS.NEW_RIDE);

  useGSAP(
    function () {
      const animations = [
        {
          ref: ridePopUpRef,
          props: {
            transform: `translateY(${
              activeModal === CAPTAIN_MODALS.NEW_RIDE ? "0" : "100%"
            })`,
          },
        },
        {
          ref: confirmRideRef,
          props: {
            transform: `translateY(${
              activeModal === CAPTAIN_MODALS.CONFIRM_RIDE ? "0" : "100%"
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
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        className="fixed w-full z-10 bg-white px-3 py-10 pt-12 bottom-0 translate-y-full"
        ref={ridePopUpRef}
      >
        <RidePopup
          handleActiveModal={handleActiveModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div
        className="fixed w-full h-full z-10 bg-white px-3 py-10 pt-12 bottom-0 translate-y-full"
        ref={confirmRideRef}
      >
        <CaptainConfirmedRide
          handleActiveModal={handleActiveModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
