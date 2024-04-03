import React, { useState } from 'react';
import axios from 'axios';
import BHMSStudent from './BHMSStudent';
import HomeopathicDoctor from './HomeopathicDoctor';
import GeneralIndividual from './GeneralIndividual';
import { useNavigate } from 'react-router-dom';
import "../form.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [userType, setUserType] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/registerUser', data);

      if (!response.data) {
        throw new Error('Failed to register user');
      }

      // If registration is successful, show success notification
      window.scrollTo(0, 0); // Scroll to the top of the page

      setNotification({ message: response.data.message, type: 'success' });
      setTimeout(() => {
        setNotification({ message: '', type: '' }); // Clear the notification
        navigate("/Login");
      }, 3000); // Timeout of 3 seconds
    } catch (error) {
      console.error('Error:', error);
      // Show error notification to the user
      window.scrollTo(0, 0); // Scroll to the top of the page

      if (error.response && error.response.data && error.response.data.message) {
        setNotification({ message: error.response.data.message, type: 'danger' });
      } else {
        setNotification({ message: 'An error occurred', type: 'danger' });
      }
    }
  };

  return (
    <>
      

      <div className="container mt-3 rounded shadow">
        {/* Notification */}
      {notification.message && (
        <div className={`alert alert-${notification.type}`} role="alert">
          {notification.message}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="form-group p-3">
            <label htmlFor="userType" className="m-2">
              Select User Type:
            </label>
            <select
              className="form-control mb-"
              id="userType"
              onChange={handleUserTypeChange}
              required
            >
              <option value="" disabled selected>
                Select User Type
              </option>
              <option value="BHMSStudent">BHMS Student</option>
              <option value="HomeopathicDoctor">Homeopathic Doctor</option>
              <option value="Practitioner with Non-Indian/International Degrees">Practitioner with Non-Indian/International Degrees</option>
            </select>
          </div>

          {/* Render appropriate form based on user type */}
          {userType === 'BHMSStudent' && (
            <BHMSStudent setData={setData}/>
          )}
          {userType === 'HomeopathicDoctor' && (
            <HomeopathicDoctor setData={setData}/>
          )}
          {userType === 'Practitioner with Non-Indian/International Degrees' && (
            <div className="user-section">
              <GeneralIndividual setData={setData}/>
            </div>
          )}

        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
