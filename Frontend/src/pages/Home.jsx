import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import {
  API_MODELS,
  BOOK_RIDE_VALUES,
  USER_MODALS,
} from "../assets/utils/defaultValues";
import ConfirmedRide from "../components/ConfirmedRide";
import LocationSearch from "../components/LocationSearch";
import LookingForDriver from "../components/LookingForDriver";
import VehiclePanel from "../components/VehiclePanel";
import WaitingForDriver from "../components/WaitingForDriver";
import apiInstance from "../assets/utils/axiosInstance";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { displayErrorToast } from "../assets/utils/validation";

const Home = () => {
  const [book, setBook] = useState(BOOK_RIDE_VALUES);
  const modalRef = useRef();
  const vehiclePanelRef = useRef();
  const confirmRideRef = useRef();
  const lookingForDriverRef = useRef();
  const waitingForDriverRef = useRef();
  const [activeModal, setActiveModal] = useState(USER_MODALS.NONE);
  const [activeField, setActiveField] = useState(null);
  const [acceptedRide, setAcceptedRide] = useState(null);

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { role: "user", userId: user._id });
  }, []);

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

  const handleInputFocus = (field) => {
    setActiveField(field);
    setActiveModal(USER_MODALS.LOCATION);
  };

  const setFieldValue = (value) => {
    setBook({ ...book, [activeField]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    await apiInstance
      .get(
        `/${API_MODELS.RIDES}/get-fares?pickupLocation=${encodeURIComponent(
          book.from
        )}&dropOffLocation=${encodeURIComponent(book.to)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UBER_USER_TOKEN")}`,
          },
        }
      )
      .then((response) => {
        if (response?.data?.data) {
          const fares = response.data.data;
          setBook({
            ...book,
            fare: fares,
          });
          handleActiveModal(USER_MODALS.VEHICLES);
        }
      })
      .catch((error) => {
        console.error("Error fetching fares:", error);
      });
  };
  const handleSelectVehicle = (vehicleType) => {
    setBook({ ...book, vehicleType });
    handleActiveModal(USER_MODALS.CONFIRM_RIDE);
  };

  const handleCreateRide = async () => {
    const rideDetails = {
      pickupLocation: book.from,
      dropOffLocation: book.to,
      vehicleType: book.vehicleType || "car",
    };
    try {
      const response = await apiInstance.post(
        `/${API_MODELS.RIDES}/create`,
        rideDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UBER_USER_TOKEN")}`,
          },
        }
      );
      if (response?.data?.data) {
        const ride = response.data.data;
        console.log("Ride created successfully:", ride);
        handleActiveModal(USER_MODALS.LOOKING_FOR_DRIVER);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      displayErrorToast(
        error?.response?.data?.message || "Failed to create ride"
      );
    }
  };

  socket.on("ride-accepted", (ride) => {
    console.log("Ride accepted:", ride);
    setAcceptedRide(ride);
    setActiveModal(USER_MODALS.WAITING_FOR_DRIVER);
  });
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
        <div className="h-[50%] p-5 bg-white relative">
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
            <div className="line absolute h-16 w-1 top-[32%] left-10 bg-gray-700 rounded-full" />
            <input
              type="text"
              placeholder="Add a pick-up location"
              className="bg-[#eee] mt-5 rounded-lg px-12 py-2 border w-full text-base placeholder:text-base"
              name="from"
              onChange={handleChange}
              value={book.from}
              onFocus={() => handleInputFocus("from")}
            />
            <input
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] mt-3 rounded-lg px-12 py-2 border w-full text-base placeholder:text-base"
              name="to"
              onChange={handleChange}
              value={book.to}
              onFocus={() => handleInputFocus("to")}
            />
            <button
              className={`bg-black text-white font-semibold mt-5 rounded-lg px-4 py-2 w-full text-base placeholder:text-base
    ${!book.from || !book.to ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!book.from || !book.to}
              type="submit"
            >
              Find a trip
            </button>
          </form>
          <div className="bg-white">
            <LocationSearch
              activeField={activeField}
              fieldValue={book[activeField]}
              setFieldValue={setFieldValue}
              activeModal={activeModal}
            />
          </div>
        </div>
        <div
          ref={vehiclePanelRef}
          className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-10 pt-12"
        >
          <VehiclePanel
            handleSelectVehicle={handleSelectVehicle}
            handleCloseModal={handleCloseModal}
            book={book}
          />
        </div>
        <div
          ref={confirmRideRef}
          className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
        >
          <ConfirmedRide
            handleCreateRide={handleCreateRide}
            book={book}
            handleCloseModal={handleCloseModal}
          />
        </div>
        <div
          ref={lookingForDriverRef}
          className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
        >
          <LookingForDriver book={book} handleCloseModal={handleCloseModal} />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6 pt-12"
        >
          {activeModal === USER_MODALS.WAITING_FOR_DRIVER && (
            <WaitingForDriver
              handleCloseModal={handleCloseModal}
              acceptedRide={acceptedRide}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
