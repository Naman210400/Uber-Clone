const axios = require("axios");

exports.getAddressCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates for the provided address");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw new Error("Failed to fetch coordinates");
  }
};

exports.getDistanceAndTime = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      // return {
      //   distance: element.distance.text,
      //   duration: element.duration.text,
      // };
      return element;
    } else {
      throw new Error(
        "Unable to fetch distance and time for the provided locations"
      );
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw new Error("Failed to fetch distance and time");
  }
};

exports.getAutoCompleteSuggestions = async (input) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      // return response.data.predictions.map((prediction) => ({
      //   description: prediction.description,
      //   place_id: prediction.place_id,
      // }));
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions for the input");
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw new Error("Failed to fetch suggestions");
  }
};
