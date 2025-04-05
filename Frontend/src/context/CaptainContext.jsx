import React, { createContext, useState } from "react";
import { USER_PROFILE_VALUES } from "../assets/utils/defaultValues";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(USER_PROFILE_VALUES);

  return (
    <div>
      <CaptainDataContext.Provider value={{ captain, setCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
