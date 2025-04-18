import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API_MODELS } from "../assets/utils/defaultValues";
import apiInstance from "../assets/utils/axiosInstance";
import { SpinningLoader } from "../assets/utils/icons";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("UBER_USER_TOKEN");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (token) {
      apiInstance
        .get(`/${API_MODELS.USERS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response?.data?.data;
          setIsLoading(false);
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem("UBER_USER_TOKEN");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <SpinningLoader />
          <span className="text-base font-bold">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
