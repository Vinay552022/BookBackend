import React, { useState } from 'react';
import UpdateProfileBhms from './UpdateProfileBhms';
import UpdateProfileHomeo from './UpdateProfileHomeo';
import axios from 'axios';
import { useUser } from '../App';
import UpdateProfileGeneral from './UpdateProfileGeneral';
const UpdateProfile = () => {
    const { userData,setUserData } = useUser();
    
  const [notification, setNotification] = useState({ message: '', type: '' });
    const userType = userData.userType;
    const {cart,...remaining}=userData;
    const [formData,setFormData]=useState(remaining);
    const [sameAsCurrent, setSameAsCurrent] = useState(false);
    const handleStateChange = (e, setAddressState, setAddressDistrict) => {
        setAddressState(e.target.value);
        setAddressDistrict('');
    };
    const handleupdate = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/updateProfile', formData);
    
          if (!response.data) {
            throw new Error('Failed to register user');
          }
    
          // If registration is successful, show success notification
          window.scrollTo(0, 0); // Scroll to the top of the page
          setUserData({...formData,cart:cart});
          setNotification({ message: response.data.message, type: 'success' });
          setTimeout(() => {
            setNotification({ message: '', type: '' }); // Clear the notification
          }, 3000); // Timeout of 3 seconds
        } catch (error) {
    
          if (error.response && error.response.data && error.response.data.message) {
            // setNotification({ message: error.response.data.message, type: 'danger' });
            console.log("internal server error")
          } else {
            setNotification({ message: 'An error occurred', type: 'danger' });
          }
        }
    };
      const handleDistrictChange = (e, setAddressDistrict) => {
        setAddressDistrict(e.target.value);
      };
    
      const handleCheckboxChange = () => {
        setSameAsCurrent(!sameAsCurrent);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleCurrentAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          currentAddress: {
            ...prev.currentAddress,
            [name]: value
          }
        }));
      };
    
      const handleResidentialAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          residentialAddress: {
            ...prev.residentialAddress,
            [name]: value
          }
        }));
      };
    
    return (
        <>
            {userType === 'BHMSstudent' && <UpdateProfileBhms  formData={formData} setFormData={setFormData} handleStateChange={handleStateChange} handleupdate={handleupdate} handleDistrictChange={handleDistrictChange} handleCheckboxChange={handleCheckboxChange} handleChange={handleChange} handleCurrentAddressChange={handleCurrentAddressChange} handleResidentialAddressChange={handleResidentialAddressChange} sameAsCurrent={sameAsCurrent}/>}
            {userType === 'HomeopathicDoctor' && <UpdateProfileHomeo formData={formData} setFormData={setFormData} handleStateChange={handleStateChange} handleupdate={handleupdate} handleDistrictChange={handleDistrictChange} handleCheckboxChange={handleCheckboxChange} handleChange={handleChange} handleCurrentAddressChange={handleCurrentAddressChange} handleResidentialAddressChange={handleResidentialAddressChange} sameAsCurrent={sameAsCurrent}/>}
            {userType==='Practitioner with Non-Indian/International Degrees' && <UpdateProfileGeneral formData={formData} setFormData={setFormData} handleupdate={handleupdate}  handleCheckboxChange={handleCheckboxChange} handleChange={handleChange} handleCurrentAddressChange={handleCurrentAddressChange} handleResidentialAddressChange={handleResidentialAddressChange} sameAsCurrent={sameAsCurrent}/ >}
          
        </>
    );
};

export default UpdateProfile;
