import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import UserLogin from "./pages/UserLogin";
import CaptainLogin from "./pages/CaptainLogin";
import UserSignup from "./pages/UserSignup";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />

      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />

      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />

      <Route
        path="/home"
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
      <Route
        path="/user/logout"
        element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }
      />
    </Routes>
  );
};

export default App;
