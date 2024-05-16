/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    }
  
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post('/signup', formData);
      if (!response.data.err) {
        navigate('/login'); 
        toast.success('Registered successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="reg-full-page">
      <div className="registration-container">
        <img src="/ADNOC YiS Lockup_NEG.png" alt="Logo" className="reg-logo" />
        <h2>REGISTRATION</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="input-field">
              <label htmlFor="name" ></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='(NAME)' 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <div className="alert">{errors.name}</div>}
            </div>
            <div className="input-field">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='(EMAIL)'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <div className="alert">{errors.email}</div>}
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="reg-button">
              REGISTER
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
  
};

export default RegistrationForm;
