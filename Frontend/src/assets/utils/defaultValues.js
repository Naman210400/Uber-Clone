export const LOGIN_VALUES = {
  email: "",
  password: "",
};

export const USER_SIGNUP_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const VEHICLE_TYPES = ["car", "auto", "motorcycle"];

export const CAPTAIN_SIGNUP_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  vehicleColor: "",
  vehiclePlate: "",
  vehicleCapacity: "",
  vehicleType: VEHICLE_TYPES[0],
};

export const USER_PROFILE_VALUES = {
  email: "",
  fullName: {
    firstName: "",
    lastName: "",
  },
};

export const API_MODELS = {
  USERS: "users",
  CAPTAINS: "captains",
  MAPS: "maps",
  RIDES: "rides",
};

export const BOOK_RIDE_VALUES = {
  from: "",
  to: "",
  vehicleType: "",
  fare: {
    car: 0,
    motorcycle: 0,
    auto: 0,
  },
};

export const USER_MODALS = {
  NONE: "NONE",
  LOCATION: "LOCATION",
  VEHICLES: "VEHICLES",
  CONFIRM_RIDE: "CONFIRM_RIDE",
  WAITING_FOR_DRIVER: "WAITING_FOR_DRIVER",
  LOOKING_FOR_DRIVER: "LOOKING_FOR_DRIVER",
};

export const CAPTAIN_MODALS = {
  NONE: "NONE",
  NEW_RIDE: "NEW_RIDE",
  CONFIRM_RIDE: "CONFIRM_RIDE",
  FINISH_RIDE: "FINISH_RIDE",
};
