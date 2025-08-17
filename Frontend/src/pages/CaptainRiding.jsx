import { Link, useNavigate } from "react-router-dom";
import { API_MODELS, CAPTAIN_MODALS } from "../assets/utils/defaultValues";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import apiInstance from "../assets/utils/axiosInstance";
import { displayErrorToast } from "../assets/utils/validation";

const CaptainRiding = () => {
  const finishRideRef = useRef();
  const query = new URLSearchParams(window.location.search);
  const rideId = query.get("rideId");
  const [activeModal, setActiveModal] = useState(CAPTAIN_MODALS.NONE);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await apiInstance.get(
          `/${API_MODELS.RIDES}/${rideId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "UBER_CAPTAIN_TOKEN"
              )}`,
            },
          }
        );
        if (response?.data?.data) {
          setRide(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };
    if (rideId) {
      fetchRideDetails();
    }
  }, [rideId]);

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

  if (!ride) {
    return <div>Loading...</div>;
  }

  const handleActiveModal = (modal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(CAPTAIN_MODALS.NONE);
  };

  const handleFinishRide = async () => {
    try {
      const response = await apiInstance.post(
        `/${API_MODELS.RIDES}/finish-ride/${ride._id}`,
        {},
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
        console.log("Ride finished successfully:", ride);
        navigate(`/captain-home`);
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
      displayErrorToast(
        error?.response?.data?.message || "Failed to confirm ride"
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
        <FinishRide
          handleFinishRide={handleFinishRide}
          ride={ride}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
