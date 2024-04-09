import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterAdmin(props) {
  let {userData}=props
  console.log(userData,"uioi")
  const [passwordError, setPasswordError] = useState(false);
  const [registrationData, setRegistrationData] = useState({ username: '', email: '', password: '',registeringAdminEmail:userData.email });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Check if password is entered
    const password = e.target.elements.inputPassword.value;
    if (!password) {
      setPasswordError(true);
      return;
    }
  
    // Reset password error state if a valid password is entered
    setPasswordError(false);
    try {
      const { data } = await axios.post('https://bookbackend-4.onrender.com/registerAdmin', registrationData, {
        withCredentials: true,
      });
  
      if (data.success) {
        // Registration successful, set success message
        setSuccessMessage('Admin registered successfully');
        setErrorMessage('');
  
        // Clear fields after 2 seconds
        setTimeout(() => {
          setRegistrationData({ username: '', email: '', password: '', registeringAdminEmail: userData.email });
          setSuccessMessage('');
          setErrorMessage('');
          
        }, 2000);
      } else {
        // Handle registration failure
        setErrorMessage('Registration failed. Please try again.');
        setSuccessMessage('');
  
        // Remove error message after 2 seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    } catch (error) {
      
      console.error('Error occurred during registration:', error);
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
  
      // Remove error message after 2 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <div className='container'>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <form
          onSubmit={handleFormSubmit}
          className="p-5 shadow-lg bg-white rounded"
          style={{ minWidth: '400px', maxWidth: '450px' }}
        >
          <h2 className="text-center mb-4 text-tertiary">Admin Registration</h2>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="inputUsername"
              value={registrationData.username}
              onChange={(e) =>
                setRegistrationData({ ...registrationData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="inputEmail"
              value={registrationData.email}
              onChange={(e) =>
                setRegistrationData({ ...registrationData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id="inputPassword"
              value={registrationData.password}
              onChange={(e) =>
                setRegistrationData({ ...registrationData, [e.target.name]: e.target.value })
              }
            />
            {passwordError && (
              <div className="invalid-feedback">Please enter your password.</div>
            )}
          </div>

          <button type="submit" className="btn btn-dark btn-block">
            Register
          </button>
          
        </form>
      </div>
    </div>
  );
}
