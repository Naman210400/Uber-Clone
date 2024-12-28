import React from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../assets/utils/axiosInstance";
import { API_MODELS } from "../assets/utils/defaultValues";

const UserLogout = () => {
  const token = localStorage.getItem("UBER_USER_TOKEN");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await apiInstance
      .get(`/${API_MODELS.USERS}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("UBER_USER_TOKEN");
          navigate("/login");
        }
      });
  };

  return <div>UserLogout</div>;
};

export default UserLogout;
