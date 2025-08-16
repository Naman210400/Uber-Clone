import { useGSAP } from "@gsap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { API_MODELS, CAPTAIN_MODALS } from "../assets/utils/defaultValues";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import gsap from "gsap";
import CaptainConfirmedRide from "../components/CaptainConfirmRide";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { displayErrorToast } from "../assets/utils/validation";
import apiInstance from "../assets/utils/axiosInstance";

const CaptainHome = () => {
  const ridePopUpRef = useRef();
  const confirmRideRef = useRef();
  const [activeModal, setActiveModal] = useState(CAPTAIN_MODALS.NONE);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  const [newRide, setNewRide] = useState(null);

  useEffect(() => {
    socket.emit("join", { role: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-captain-location", {
            captainId: captain._id,
            location: { lat: latitude, lng: longitude },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 5000);
    return () => clearInterval(locationInterval);
  }, []);

  socket.on("new-ride", (ride) => {
    console.log("New ride received:", ride);
    setNewRide(ride);
    setActiveModal(CAPTAIN_MODALS.NEW_RIDE);
  });

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

  const handleAcceptRide = async (rideId, otp) => {
    try {
      const response = await apiInstance.post(
        `/${API_MODELS.RIDES}/accept-ride/${rideId}`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "UBER_CAPTAIN_TOKEN"
            )}`,
          },
        }
      );
      if (response?.data?.data) {
        const ride = response.data.data;
        console.log("Ride accepted successfully:", ride);
        handleActiveModal(CAPTAIN_MODALS.CONFIRM_RIDE);
      }
    } catch (error) {
      console.error("Error accepting ride:", error);
      displayErrorToast(
        error?.response?.data?.message || "Failed to accept ride"
      );
    }
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
        {activeModal === CAPTAIN_MODALS.NEW_RIDE && (
          <RidePopup
            newRide={newRide}
            handleActiveModal={handleActiveModal}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
      <div
        className="fixed w-full h-full z-10 bg-white px-3 py-10 pt-12 bottom-0 translate-y-full"
        ref={confirmRideRef}
      >
        {activeModal === CAPTAIN_MODALS.CONFIRM_RIDE && (
          <CaptainConfirmedRide
            newRide={newRide}
            handleAcceptRide={handleAcceptRide}
            handleCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default CaptainHome;
