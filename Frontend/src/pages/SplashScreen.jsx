import React from "react";
import { Link } from "react-router-dom";

const SplashScreen = () => {
  return (
    <div>
      <div className="bg-[url('public/images/home-background.jpg')] bg-no-repeat bg-contain bg-top h-screen pt-8 flex justify-between flex-col w-full">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full text-white bg-black py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
