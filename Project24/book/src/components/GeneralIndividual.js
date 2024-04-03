import {React,useState,useEffect} from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Country, State, City } from 'country-state-city';
export default function BHMSStudent(props){
  
  const { setData } = props;
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [residentialCountry, setResidentialCountry] = useState('');
  const [residentialState, setResidentialState] = useState('');
  const [residentialCity, setResidentialCity] = useState('');
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountryISO,setSelectedCountryISO]=useState('')
  const [selectedStateISO,setSelectedStateISO]=useState('')
  const [residentialStateISO,setResidentialStateISO]=useState('')
  const [residentialCountryISO,setResidentialCountryISO]=useState('')
  const initialFormData={
    userType:"Practitioner with Non-Indian/International Degrees",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    institute: "",
    qualification:"",
    speciality:"",
    registrationNumber:"",
    countryRegisteredWith:"",
    registeredCouncil:"",
    currentJob:"",
    currentAddress: {
      lane1: "",
      lane2: "",
      pincode: "",
      state: "",
      city: "",
      country:""
    },
    residentialAddress: {
      sameAsCurrent: false,
      lane1: "",
      lane2: "",
      pincode: "",
      state: "",
      city:"",
      country:""
    },
    alternatePhoneNumber: ""
  }
  


  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      currentAddress: {
        ...prev.currentAddress,
        state: selectedState,
        city:selectedCity,
        country:selectedCountry
      }
    }));
  }, [selectedCountry,selectedCity,selectedState]);

  useEffect(() => {
    if (sameAsCurrent) {
      setFormData(prev => ({
        ...prev,
        residentialAddress: {
          ...prev.currentAddress
          
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        residentialAddress: {
          ...prev.residentialAddress,
          state: residentialState,
          city:residentialCity,
          country:residentialCountry
        }
      }));
    }
  }, [sameAsCurrent, residentialState, selectedCountry,selectedCity,selectedState,residentialCity,residentialCountry]);

  const handleCountryChange = (event, setAddressCountry, setAddressState, setAddressCity,setCountryISO,setStateISO) => {
    setAddressCountry(event.target.value);
    setCountryISO(event.target.options[event.target.selectedIndex].getAttribute("iso"))
    setStateISO('')
    setAddressState('');
    setAddressCity('');
  };

  const handleStateChange = (event, setAddressState,setAddressCity,setStateISO) => {
    setAddressState(event.target.value);
    setStateISO(event.target.options[event.target.selectedIndex].getAttribute("iso"))
    setAddressCity('');
  };

  const handleCityChange = (event, setAddressCity) => {
    setAddressCity(event.target.value);
  };

  const handleCheckboxChange = () => {
    setSameAsCurrent(!sameAsCurrent);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value,formData)
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

  const handleSubmit = (e) => {
    setData(formData);
    
  };
  
    return(
      
        <div className="user-section m-3" >
            <div className="row mb-3">
              <label htmlFor="Name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
              <input 
                  type="text" 
                  className="form-control" 
                  name="name" 
                  value={formData.name} 
                  required 
                  id="Name" 
                  onChange={(e) => handleChange(e)} 
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputPhoneNumber"
                className="col-sm-2 col-form-label"
              >
                Phone Number
              </label>
              <div className="col-sm-10">
                <input
                  type="tel"
                  className="form-control"
                  id="inputPhoneNumber" required
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e)=>handleChange(e)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input type="email" className="form-control" name="email" value={formData.email}  id="inputEmail3" onChange={(e)=>handleChange(e)} required/>
              </div>
            </div>
            <div className="row mb-3">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="inputPassword"
              name="password"
              value={formData.password}
              onChange={(e)=>handleChange(e)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", paddingRight: "20px", fontSize: "20px" }}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
                <label htmlFor="qualification" className="col-sm-2 col-form-label">
                    Qualification
                </label>
                <div className="col-sm-10">
                    <select
                        className="form-control"
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Qualification</option>
                        <option value="BHMS">BHMS</option>
                        <option value="MD">MD</option>
                    </select>
                </div>
            </div>

            {formData.qualification === 'MD' && (
                <div className="row mb-3">
                    <label htmlFor="speciality" className="col-sm-2 col-form-label">
                        speciality
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="speciality"
                            placeholder="Enter speciality"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            )}
      <div className="row mb-3">
        <label htmlFor="registrationNumber" className="col-sm-2 col-form-label">
          Registration Number
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="registrationNumber"
            placeholder="Enter Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-3">
              <label htmlFor="inputCouncil" className="col-sm-2 col-form-label">
              Registered Council
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputCouncil" name="registeredCouncil" value={formData.registeredCouncil} onChange={(e)=>handleChange(e)} required/>
              </div>
         </div>
      <div className="row mb-3">
        <label htmlFor="countryRegisteredWith" className="col-sm-2 col-form-label">
          Country Registered With
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="countryRegisteredWith"
            name="countryRegisteredWith"
            onChange={(e) => handleChange(e)}
            value={formData.countryRegisteredWith}
            required
          >
            <option value="" disabled>Select Country</option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode}  value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
            <div className="row mb-3">
              <label htmlFor="inputInstitute" className="col-sm-2 col-form-label">
              Institution attended for Homeopathy
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputInstitute" name="institute" value={formData.institute} onChange={(e)=>handleChange(e)} required/>
              </div>
            </div>
            
            <div className="row mb-3">
              <label htmlFor="inputJob" className="col-sm-2 col-form-label">
                Current Job
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="currentJob" value={formData.currentJob} onChange={handleChange} id="inputJob" required />
              </div>
            </div>
            
            
            <div className="row mb-3">
              <label htmlFor="currentAddress" className="col-sm-2 col-form-label">
                Current Address
              </label>
              <div className="col-sm-10">
              <div className="mb-3">
                  <input type="text" className="form-control" id="inputLane1" name="lane1" value={formData.currentAddress.lane1} onChange={handleCurrentAddressChange}  placeholder="Lane 1" required/>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" id="inputLane2" name="lane2" value={formData.currentAddress.lane2} onChange={handleCurrentAddressChange} placeholder="Lane 2" required/>
                </div>
                <div className="mb-3">
                  <input type="number" className="form-control" id="inputPincode" name="pincode" value={formData.currentAddress.pincode} onChange={handleCurrentAddressChange} placeholder="Pincode" required/>
                </div>
                <div className="row mb-3">
        <label htmlFor="selectCountry" className="col-sm-2 col-form-label">
          Country
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="selectCountry"
            onChange={(e) => handleCountryChange(e, setSelectedCountry, setSelectedState, setSelectedCity,setSelectedCountryISO,setSelectedStateISO)}
            value={selectedCountry}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            {Country.getAllCountries().map((country) => (
              <option key={country.isoCode} iso={country.isoCode} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="selectState" className="col-sm-2 col-form-label">
          State
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="selectState"
            onChange={(e) => handleStateChange(e, setSelectedState,setSelectedCity,setSelectedStateISO)}
            value={selectedState}
            
          >
            <option value="" disabled>
              Select State
            </option>
            {State.getStatesOfCountry(selectedCountryISO).map((state) => (
              <option key={state.isoCode} iso={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="selectCity" className="col-sm-2 col-form-label">
          City
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="selectCity"
            onChange={(e) => handleCityChange(e, setSelectedCity)}
            value={selectedCity}
            
          >
            <option value="" disabled>
              Select City
            </option>
            {City.getCitiesOfState(selectedCountryISO, selectedStateISO).map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
            <div className="row mb-3">
            <div className="col-sm-6">
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsCurrentCheckbox"
              checked={sameAsCurrent}
              onChange={handleCheckboxChange}
            />
            <label
              className="form-check-label"
              htmlFor="sameAsCurrentCheckbox"
            >
              Residential address same as current address
            </label>
          </div>
        </div>     
        </div>
        </div>
      </div>
           {!sameAsCurrent && (
        <div className="row mb-3">
        <label htmlFor="residentialAddress" className="col-sm-2 col-form-label">
          Residential Address
        </label>
        <div className="col-sm-10">
        <div className="mb-3">
            <input type="text" className="form-control" id="rinputLane1" name="lane1" value={formData.residentialAddress.lane1} onChange={handleResidentialAddressChange}  placeholder="Lane 1" required/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="rinputLane2" name="lane2" value={formData.residentialAddress.lane2} onChange={handleResidentialAddressChange} placeholder="Lane 2" required/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="rinputPincode" name="pincode" value={formData.residentialAddress.pincode} onChange={handleResidentialAddressChange} placeholder="Pincode" required/>
        </div>
          {/*res country */}
          <div className="row mb-3">
            <label htmlFor="residentialCountry" className="col-sm-2 col-form-label">
              Residential Country
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                id="residentialCountry"
                onChange={(e) => handleCountryChange(e, setResidentialCountry, setResidentialState, setResidentialCity,setResidentialCountryISO,setResidentialStateISO)}
                value={residentialCountry}
                required
                disabled={sameAsCurrent}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {Country.getAllCountries().map((country) => (
                  <option key={country.isoCode} iso={country.isoCode} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        {/*res dist */}
        <div className="row mb-3">
            <label htmlFor="residentialState" className="col-sm-2 col-form-label">
              Residential State
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                id="residentialState"
                onChange={(e) => handleStateChange(e, setResidentialState,setResidentialCity,setResidentialStateISO)}
                value={residentialState}
                
                disabled={sameAsCurrent}
              >
                <option value="" disabled>
                  Select State
                </option>
                {State.getStatesOfCountry(residentialCountryISO).map((state) => (
                  <option key={state.isoCode}  iso={state.isoCode} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/*res city*/}
          <div className="row mb-3">
            <label htmlFor="residentialCity" className="col-sm-2 col-form-label">
              Residential City
            </label>
            <div className="col-sm-10">
              <select
                className="form-control"
                id="residentialCity"
                onChange={(e) => handleCityChange(e, setResidentialCity)}
                value={residentialCity}
                
                disabled={sameAsCurrent}
              >
                <option value="" disabled>
                  Select City
                </option>
                {City.getCitiesOfState(residentialCountryISO, residentialStateISO).map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
  </div>
  </div>
)}
            <div className="row mb-3">
              <label
                htmlFor="optionalInputPhoneNumber"
                className="col-sm-2 col-form-label"
              >
                Alternate Phone Number
              </label>
              <div className="col-sm-10">
                <input
                  type="tel"
                  className="form-control"
                  id="optionalInputPhoneNumber"
                  name="alternatePhoneNumber"
                  value={formData.alternatePhoneNumber}
                  onChange={(e)=>handleChange(e)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark mb-2" onClick={handleSubmit} >submit</button>
          </div>
    )
}
