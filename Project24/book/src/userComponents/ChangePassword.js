import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useUser } from '../App';

export default function ChangePassword({LogOut}) {
  const { userData } = useUser();
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle,setMessageStyle]=useState('alert-danger');
  const navigate = useNavigate();
  const Log=()=>{
    LogOut();
    navigate('/');
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if current password, new password, and confirm new password are entered
    if (!currentPassword || !password || !confirmPassword) {
      setPasswordError(true);
      return;
    }

    // Check if new password and confirm new password match
    if (password !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    // Reset error states
    setPasswordError(false);
    setMessage('');

    try {
      const { data } = await axios.post('http://localhost:4000/changePassword', {
        email: userData.email,
        currentPassword: currentPassword,
        password: password
      }, {
        withCredentials: true,
      });
      console.log(data);
      if (data.message=="Password updated successfully") {
        // Password changed successfully, you might want to redirect to a success page
        // navigate('/password-changed', { replace: true });
        setMessage(data.message);
        console.log("hello");
        setMessageStyle('alert-success');
        setTimeout(Log, 2000);
      } else {
        // Handle password change failure
        setMessage(data.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('An error occurred while changing password');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form
        onSubmit={handleFormSubmit}
        className="p-5 shadow-lg bg-white rounded"
        style={{ minWidth: '400px', maxWidth: '450px' }}
      >
        <h2 className="text-center mb-4 text-tertiary">Change Password</h2>
        {message && (
          <div className={`alert ${messageStyle}`} role="alert">
          {message}
        </div>
        
        )}
        <div className="mb-3">
          <label htmlFor="inputCurrentPassword" className="form-label">
            Current Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              className={`form-control ${
                passwordError ? 'is-invalid' : ''
              }`}
              id="inputCurrentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="inputpassword" className="form-label">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`form-control ${
              passwordError ? 'is-invalid' : ''
            }`}
            id="inputpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputconfirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className={`form-control ${
              passwordError ? 'is-invalid' : ''
            }`}
            id="inputconfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark btn-block">
          Change Password
        </button>
      </form>
    </div>
  );
}
