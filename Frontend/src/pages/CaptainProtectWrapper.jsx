import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { SpinningLoader } from "../assets/utils/icons";
import apiInstance from "../assets/utils/axiosInstance";
import { API_MODELS } from "../assets/utils/defaultValues";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("UBER_CAPTAIN_TOKEN");
  const [isLoading, setIsLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      apiInstance
        .get(`/${API_MODELS.CAPTAINS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response?.data?.data;
          setIsLoading(false);
          setCaptain(data);
        })
        .catch(() => {
          localStorage.removeItem("UBER_CAPTAIN_TOKEN");
          navigate("/captain-login");
        });
    } else {
      navigate("/captain-login");
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

export default CaptainProtectWrapper;
