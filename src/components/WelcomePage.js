/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/registration');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <div className="full-page">
    <div className="welcome-container">
      <img src="/ADNOC YiS Lockup_NEG.png" alt="Logo" className="welcome-logo" />
      <div className="content">
        <h1 className="welcome-heading">WELCOME</h1>
        <h3 className="guide-heading">VISITOR GUIDE</h3>
        <h3
         className="program-info">
          Learn more about our world-class<br/>
          Science, Technology, Engineering<br/>
          and Math (STEM) programs
        </h3>
        <div className="button-containerwelcome">
          <button className="wel-button" onClick={handleRegister}>
            REGISTER
          </button>
          <button className="wel-button" onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default WelcomePage;
