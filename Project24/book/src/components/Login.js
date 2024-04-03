import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const [passwordError, setPasswordError] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserData } = props;
  const navigate = useNavigate();

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
      const { data } = await axios.post('http://localhost:4000/login', login, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.user);
        // Navigate to the home page
        console.log(data);
        navigate('/', { replace: true });
      } else {
        // Handle login failure
        setErrorMessage('Incorrect email or password');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form
        onSubmit={handleFormSubmit}
        className="p-5 shadow-lg bg-white rounded"
        style={{ minWidth: '400px', maxWidth: '450px' }}
      >
        <h2 className="text-center mb-4 text-tertiary">Welcome Back!</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="inputEmail"
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
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
            className={`form-control ${
              passwordError ? 'is-invalid' : ''
            }`}
            id="inputPassword"
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          {passwordError && (
            <div className="invalid-feedback">Please enter your password.</div>
          )}
        </div>

        <button type="submit" className="btn btn-dark btn-block">
          Sign in
        </button>
        <p className="text-center mt-3">
          <a href="#" className="text-muted">
            Forgot your password?
          </a>
        </p>
        <hr className="my-4" />
        {/* <p className="text-center">
          Don't have an account? <a href="#" className="text-primary">Sign Up</a>
        </p> */}
      </form>
    </div>
  );
}
