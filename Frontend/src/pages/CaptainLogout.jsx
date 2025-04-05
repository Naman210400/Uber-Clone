import React from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../assets/utils/axiosInstance";
import { API_MODELS } from "../assets/utils/defaultValues";

const CaptainLogout = () => {
  const token = localStorage.getItem("UBER_CAPTAIN_TOKEN");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await apiInstance
      .get(`/${API_MODELS.CAPTAINS}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("UBER_CAPTAIN_TOKEN");
          navigate("/captain-login");
        }
      });
  };

  return <div>CaptainLogout</div>;
};

export default CaptainLogout;
