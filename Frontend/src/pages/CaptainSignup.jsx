import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CAPTAIN_SIGNUP_VALUES } from "../assets/utils/defaultValues";

const CaptainSignup = () => {
  const [signupDetails, setSignupDetails] = useState(CAPTAIN_SIGNUP_VALUES);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log(signupDetails);
    setSignupDetails(CAPTAIN_SIGNUP_VALUES);
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">
            What's our Captain name
          </h3>
          <div className="flex items-center justify-center gap-4 mb-5">
            <input
              className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="first name"
              required
              name="firstName"
              onChange={handleChange}
              value={signupDetails.firstName}
            />
            <input
              className="bg-[#eee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="last name"
              required
              name="lastName"
              onChange={handleChange}
              value={signupDetails.lastName}
            />
          </div>
          <h3 className="text-base font-medium mb-2">
            What's our Captain email
          </h3>
          <input
            className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            name="email"
            onChange={handleChange}
            value={signupDetails.email}
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
            name="password"
            onChange={handleChange}
            value={signupDetails.password}
          />
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Create Account
          </button>
          <p className="text-center">
            Already have a account?
            <Link to="/captain-login" className="text-blue-600 ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>{" "}
      </div>
    </div>
  );
};

export default CaptainSignup;
