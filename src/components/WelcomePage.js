/* eslint-disable */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);

  const handleRegister = () => {
    navigate("/registration");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const userData = user?.details?.email;
  const code = user?.details?.uniqueCode;
  const dispatch=useDispatch();

   const handleLogout = () => {


    axios.post("/logout", { userData,code }).then((response) => {
      if (!response.data.err) {
        dispatch({ type: "refresh" });
        navigate("/thank-you");
      }
    });
  };
  return (
    <div className="full-page">
      <div className="welcome-container">
        <img
          src="/ADNOC YiS Lockup_NEG.png"
          alt="Logo"
          className="welcome-logo"
        />
        <div className="content">
          <h1 className="welcome-heading">WELCOME</h1>
          <h3 className="guide-heading">VISITOR GUIDE</h3>
          <h3 className="program-info">
            Learn more about our world-class
            <br />
            Science, Technology, Engineering
            <br />
            and Math (STEM) programs
          </h3>
          <div className="button-containerwelcome">
            {!user.login ? (
              <>
                <button className="wel-button" onClick={handleRegister}>
                  REGISTER
                </button>
                <button className="wel-button" onClick={handleLogin}>
                  LOGIN
                </button>
              </>
            ) :  <button className="wel-button" onClick={handleLogout}>
            LOGOUT
          </button>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
