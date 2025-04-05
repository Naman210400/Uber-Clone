import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_MODELS, USER_SIGNUP_VALUES } from "../assets/utils/defaultValues";
import {
  checkValidEmail,
  checkValidPassword,
} from "../assets/utils/validation";
import { UserDataContext } from "../context/UserContext";
import apiInstance from "../assets/utils/axiosInstance";

const UserSignup = () => {
  const [signupDetails, setSignupDetails] = useState(USER_SIGNUP_VALUES);
  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const { setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  const validation = () => {
    let err = {};
    let details = signupDetails;
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
        const details = {
          email: signupDetails?.email,
          password: signupDetails?.password,
          fullname: {
            firstname: signupDetails?.firstName,
            lastname: signupDetails?.lastName,
          },
        };
        await apiInstance
          .post(`/${API_MODELS.USERS}/register`, details)
          .then((response) => {
            if (response?.data?.data) {
              const data = response?.data?.data;
              setSignupDetails(USER_SIGNUP_VALUES);
              setUser(data?.user);
              localStorage.setItem("UBER_USER_TOKEN", data?.token);
              setSubmitting(false);
              navigate("/home");
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
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">What's your name</h3>
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
          <h3 className="text-base font-medium mb-2">What's your email</h3>
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
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Account"}
          </button>
          <p className="text-center">
            Already have a account?
            <Link to="/login" className="text-blue-600 ml-1">
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

export default UserSignup;
