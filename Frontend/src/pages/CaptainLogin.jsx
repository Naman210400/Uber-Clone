import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_MODELS, LOGIN_VALUES } from "../assets/utils/defaultValues";
import { CaptainDataContext } from "../context/CaptainContext";
import {
  checkValidEmail,
  checkValidPassword,
} from "../assets/utils/validation";
import apiInstance from "../assets/utils/axiosInstance";

const CaptainLogin = () => {
  const [loginDetails, setLoginDetails] = useState(LOGIN_VALUES);
  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const validation = () => {
    let err = {};
    let details = loginDetails;
    for (let key in details) {
      if (!details[key]) {
        err[key + "_err"] = "Please enter " + key.replace(/_/g, " ");
      } else if (key === "email") {
        if (!checkValidEmail(details[key])) {
          err[key + "_err"] = "Email is not valid";
        }
      } else if (key === "password") {
        if (!checkValidPassword(details[key])) {
          err[key + "_err"] = "Password is not strong enough";
        }
      }
    }
    console.log(err);
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        setSubmitting(true);
        await apiInstance
          .post(`/${API_MODELS.CAPTAINS}/login`, loginDetails)
          .then((response) => {
            if (response?.data?.data) {
              const data = response?.data?.data;
              setLoginDetails(LOGIN_VALUES);
              setCaptain(data?.captain);
              localStorage.setItem("UBER_CAPTAIN_TOKEN", data?.token);
              setSubmitting(false);
              navigate("/captain-home");
            }
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
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
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            name="email"
            onChange={handleChange}
            value={loginDetails.email}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            required
            name="password"
            onChange={handleChange}
            value={loginDetails.password}
          />
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
          <p className="text-center">
            Join a fleet?
            <Link to="/captain-signup" className="text-blue-600 ml-1">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
