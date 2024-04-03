import {React,useState,useEffect} from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
export default function BHMSStudent(props){
  const { setData } = props;
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [residentialState, setResidentialState] = useState('');
  const [residentialDistrict, setResidentialDistrict] = useState('');
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userType:"HomeopathicDoctor",
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    university: "",
    college: "",
    qualification:"",
    speciality:"",
    registrationNumber:"",
    stateRegistered:"",
    currentJob:"",
    currentAddress: {
      lane1: "",
      lane2: "",
      pincode: "",
      state: "",
      district: ""
    },
    residentialAddress: {
      sameAsCurrent: false,
      lane1: "",
      lane2: "",
      pincode: "",
      state: "",
      district: ""
    },
    alternatePhoneNumber: ""
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      currentAddress: {
        ...prev.currentAddress,
        state: selectedState,
        district: selectedDistrict
      }
    }));
  }, [selectedState, selectedDistrict]);

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
          district: residentialDistrict
        }
      }));
    }
  }, [sameAsCurrent, residentialState, residentialDistrict,selectedState,selectedDistrict]);

  const handleStateChange = (e, setAddressState, setAddressDistrict) => {
    setAddressState(e.target.value);
    setAddressDistrict('');
  };

  const handleDistrictChange = (e, setAddressDistrict) => {
    setAddressDistrict(e.target.value);
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
  const statesAndDistricts ={  
    "states":[  
       {  
          "state":"Andhra Pradesh",
          "districts":[  
             "Anantapur",
             "Chittoor",
             "East Godavari",
             "Guntur",
             "Krishna",
             "Kurnool",
             "Nellore",
             "Prakasam",
             "Srikakulam",
             "Visakhapatnam",
             "Vizianagaram",
             "West Godavari",
             "YSR Kadapa"
          ]
       },
       {  
          "state":"Arunachal Pradesh",
          "districts":[  
             "Tawang",
             "West Kameng",
             "East Kameng",
             "Papum Pare",
             "Kurung Kumey",
             "Kra Daadi",
             "Lower Subansiri",
             "Upper Subansiri",
             "West Siang",
             "East Siang",
             "Siang",
             "Upper Siang",
             "Lower Siang",
             "Lower Dibang Valley",
             "Dibang Valley",
             "Anjaw",
             "Lohit",
             "Namsai",
             "Changlang",
             "Tirap",
             "Longding"
          ]
       },
       {  
          "state":"Assam",
          "districts":[  
             "Baksa",
             "Barpeta",
             "Biswanath",
             "Bongaigaon",
             "Cachar",
             "Charaideo",
             "Chirang",
             "Darrang",
             "Dhemaji",
             "Dhubri",
             "Dibrugarh",
             "Goalpara",
             "Golaghat",
             "Hailakandi",
             "Hojai",
             "Jorhat",
             "Kamrup Metropolitan",
             "Kamrup",
             "Karbi Anglong",
             "Karimganj",
             "Kokrajhar",
             "Lakhimpur",
             "Majuli",
             "Morigaon",
             "Nagaon",
             "Nalbari",
             "Dima Hasao",
             "Sivasagar",
             "Sonitpur",
             "South Salmara-Mankachar",
             "Tinsukia",
             "Udalguri",
             "West Karbi Anglong"
          ]
       },
       {  
          "state":"Bihar",
          "districts":[  
             "Araria",
             "Arwal",
             "Aurangabad",
             "Banka",
             "Begusarai",
             "Bhagalpur",
             "Bhojpur",
             "Buxar",
             "Darbhanga",
             "East Champaran (Motihari)",
             "Gaya",
             "Gopalganj",
             "Jamui",
             "Jehanabad",
             "Kaimur (Bhabua)",
             "Katihar",
             "Khagaria",
             "Kishanganj",
             "Lakhisarai",
             "Madhepura",
             "Madhubani",
             "Munger (Monghyr)",
             "Muzaffarpur",
             "Nalanda",
             "Nawada",
             "Patna",
             "Purnia (Purnea)",
             "Rohtas",
             "Saharsa",
             "Samastipur",
             "Saran",
             "Sheikhpura",
             "Sheohar",
             "Sitamarhi",
             "Siwan",
             "Supaul",
             "Vaishali",
             "West Champaran"
          ]
       },
       {  
          "state":"Chandigarh (UT)",
          "districts":[  
             "Chandigarh"
          ]
       },
       {  
          "state":"Chhattisgarh",
          "districts":[  
             "Balod",
             "Baloda Bazar",
             "Balrampur",
             "Bastar",
             "Bemetara",
             "Bijapur",
             "Bilaspur",
             "Dantewada (South Bastar)",
             "Dhamtari",
             "Durg",
             "Gariyaband",
             "Janjgir-Champa",
             "Jashpur",
             "Kabirdham (Kawardha)",
             "Kanker (North Bastar)",
             "Kondagaon",
             "Korba",
             "Korea (Koriya)",
             "Mahasamund",
             "Mungeli",
             "Narayanpur",
             "Raigarh",
             "Raipur",
             "Rajnandgaon",
             "Sukma",
             "Surajpur  ",
             "Surguja"
          ]
       },
       {  
          "state":"Dadra and Nagar Haveli (UT)",
          "districts":[  
             "Dadra & Nagar Haveli"
          ]
       },
       {  
          "state":"Daman and Diu (UT)",
          "districts":[  
             "Daman",
             "Diu"
          ]
       },
       {  
          "state":"Delhi (NCT)",
          "districts":[  
             "Central Delhi",
             "East Delhi",
             "New Delhi",
             "North Delhi",
             "North East  Delhi",
             "North West  Delhi",
             "Shahdara",
             "South Delhi",
             "South East Delhi",
             "South West  Delhi",
             "West Delhi"
          ]
       },
       {  
          "state":"Goa",
          "districts":[  
             "North Goa",
             "South Goa"
          ]
       },
       {  
          "state":"Gujarat",
          "districts":[  
             "Ahmedabad",
             "Amreli",
             "Anand",
             "Aravalli",
             "Banaskantha (Palanpur)",
             "Bharuch",
             "Bhavnagar",
             "Botad",
             "Chhota Udepur",
             "Dahod",
             "Dangs (Ahwa)",
             "Devbhoomi Dwarka",
             "Gandhinagar",
             "Gir Somnath",
             "Jamnagar",
             "Junagadh",
             "Kachchh",
             "Kheda (Nadiad)",
             "Mahisagar",
             "Mehsana",
             "Morbi",
             "Narmada (Rajpipla)",
             "Navsari",
             "Panchmahal (Godhra)",
             "Patan",
             "Porbandar",
             "Rajkot",
             "Sabarkantha (Himmatnagar)",
             "Surat",
             "Surendranagar",
             "Tapi (Vyara)",
             "Vadodara",
             "Valsad"
          ]
       },
       {  
          "state":"Haryana",
          "districts":[  
             "Ambala",
             "Bhiwani",
             "Charkhi Dadri",
             "Faridabad",
             "Fatehabad",
             "Gurgaon",
             "Hisar",
             "Jhajjar",
             "Jind",
             "Kaithal",
             "Karnal",
             "Kurukshetra",
             "Mahendragarh",
             "Mewat",
             "Palwal",
             "Panchkula",
             "Panipat",
             "Rewari",
             "Rohtak",
             "Sirsa",
             "Sonipat",
             "Yamunanagar"
          ]
       },
       {  
          "state":"Himachal Pradesh",
          "districts":[  
             "Bilaspur",
             "Chamba",
             "Hamirpur",
             "Kangra",
             "Kinnaur",
             "Kullu",
             "Lahaul &amp; Spiti",
             "Mandi",
             "Shimla",
             "Sirmaur (Sirmour)",
             "Solan",
             "Una"
          ]
       },
       {  
          "state":"Jammu and Kashmir",
          "districts":[  
             "Anantnag",
             "Bandipore",
             "Baramulla",
             "Budgam",
             "Doda",
             "Ganderbal",
             "Jammu",
             "Kargil",
             "Kathua",
             "Kishtwar",
             "Kulgam",
             "Kupwara",
             "Leh",
             "Poonch",
             "Pulwama",
             "Rajouri",
             "Ramban",
             "Reasi",
             "Samba",
             "Shopian",
             "Srinagar",
             "Udhampur"
          ]
       },
       {  
          "state":"Jharkhand",
          "districts":[  
             "Bokaro",
             "Chatra",
             "Deoghar",
             "Dhanbad",
             "Dumka",
             "East Singhbhum",
             "Garhwa",
             "Giridih",
             "Godda",
             "Gumla",
             "Hazaribag",
             "Jamtara",
             "Khunti",
             "Koderma",
             "Latehar",
             "Lohardaga",
             "Pakur",
             "Palamu",
             "Ramgarh",
             "Ranchi",
             "Sahibganj",
             "Seraikela-Kharsawan",
             "Simdega",
             "West Singhbhum"
          ]
       },
       {  
          "state":"Karnataka",
          "districts":[  
             "Bagalkot",
             "Ballari (Bellary)",
             "Belagavi (Belgaum)",
             "Bengaluru (Bangalore) Rural",
             "Bengaluru (Bangalore) Urban",
             "Bidar",
             "Chamarajanagar",
             "Chikballapur",
             "Chikkamagaluru (Chikmagalur)",
             "Chitradurga",
             "Dakshina Kannada",
             "Davangere",
             "Dharwad",
             "Gadag",
             "Hassan",
             "Haveri",
             "Kalaburagi (Gulbarga)",
             "Kodagu",
             "Kolar",
             "Koppal",
             "Mandya",
             "Mysuru (Mysore)",
             "Raichur",
             "Ramanagara",
             "Shivamogga (Shimoga)",
             "Tumakuru (Tumkur)",
             "Udupi",
             "Uttara Kannada (Karwar)",
             "Vijayapura (Bijapur)",
             "Yadgir"
          ]
       },
       {  
          "state":"Kerala",
          "districts":[  
             "Alappuzha",
             "Ernakulam",
             "Idukki",
             "Kannur",
             "Kasaragod",
             "Kollam",
             "Kottayam",
             "Kozhikode",
             "Malappuram",
             "Palakkad",
             "Pathanamthitta",
             "Thiruvananthapuram",
             "Thrissur",
             "Wayanad"
          ]
       },
       {  
          "state":"Lakshadweep (UT)",
          "districts":[  
             "Agatti",
             "Amini",
             "Androth",
             "Bithra",
             "Chethlath",
             "Kavaratti",
             "Kadmath",
             "Kalpeni",
             "Kilthan",
             "Minicoy"
          ]
       },
       {  
          "state":"Madhya Pradesh",
          "districts":[  
             "Agar Malwa",
             "Alirajpur",
             "Anuppur",
             "Ashoknagar",
             "Balaghat",
             "Barwani",
             "Betul",
             "Bhind",
             "Bhopal",
             "Burhanpur",
             "Chhatarpur",
             "Chhindwara",
             "Damoh",
             "Datia",
             "Dewas",
             "Dhar",
             "Dindori",
             "Guna",
             "Gwalior",
             "Harda",
             "Hoshangabad",
             "Indore",
             "Jabalpur",
             "Jhabua",
             "Katni",
             "Khandwa",
             "Khargone",
             "Mandla",
             "Mandsaur",
             "Morena",
             "Narsinghpur",
             "Neemuch",
             "Panna",
             "Raisen",
             "Rajgarh",
             "Ratlam",
             "Rewa",
             "Sagar",
             "Satna",
             "Sehore",
             "Seoni",
             "Shahdol",
             "Shajapur",
             "Sheopur",
             "Shivpuri",
             "Sidhi",
             "Singrauli",
             "Tikamgarh",
             "Ujjain",
             "Umaria",
             "Vidisha"
          ]
       },
       {  
          "state":"Maharashtra",
          "districts":[  
             "Ahmednagar",
             "Akola",
             "Amravati",
             "Aurangabad",
             "Beed",
             "Bhandara",
             "Buldhana",
             "Chandrapur",
             "Dhule",
             "Gadchiroli",
             "Gondia",
             "Hingoli",
             "Jalgaon",
             "Jalna",
             "Kolhapur",
             "Latur",
             "Mumbai City",
             "Mumbai Suburban",
             "Nagpur",
             "Nanded",
             "Nandurbar",
             "Nashik",
             "Osmanabad",
             "Palghar",
             "Parbhani",
             "Pune",
             "Raigad",
             "Ratnagiri",
             "Sangli",
             "Satara",
             "Sindhudurg",
             "Solapur",
             "Thane",
             "Wardha",
             "Washim",
             "Yavatmal"
          ]
       },
       {  
          "state":"Manipur",
          "districts":[  
             "Bishnupur",
             "Chandel",
             "Churachandpur",
             "Imphal East",
             "Imphal West",
             "Jiribam",
             "Kakching",
             "Kamjong",
             "Kangpokpi",
             "Noney",
             "Pherzawl",
             "Senapati",
             "Tamenglong",
             "Tengnoupal",
             "Thoubal",
             "Ukhrul"
          ]
       },
       {  
          "state":"Meghalaya",
          "districts":[  
             "East Garo Hills",
             "East Jaintia Hills",
             "East Khasi Hills",
             "North Garo Hills",
             "Ri Bhoi",
             "South Garo Hills",
             "South West Garo Hills ",
             "South West Khasi Hills",
             "West Garo Hills",
             "West Jaintia Hills",
             "West Khasi Hills"
          ]
       },
       {  
          "state":"Mizoram",
          "districts":[  
             "Aizawl",
             "Champhai",
             "Kolasib",
             "Lawngtlai",
             "Lunglei",
             "Mamit",
             "Saiha",
             "Serchhip"
          ]
       },
       {  
          "state":"Nagaland",
          "districts":[  
             "Dimapur",
             "Kiphire",
             "Kohima",
             "Longleng",
             "Mokokchung",
             "Mon",
             "Peren",
             "Phek",
             "Tuensang",
             "Wokha",
             "Zunheboto"
          ]
       },
       {  
          "state":"Odisha",
          "districts":[  
             "Angul",
             "Balangir",
             "Balasore",
             "Bargarh",
             "Bhadrak",
             "Boudh",
             "Cuttack",
             "Deogarh",
             "Dhenkanal",
             "Gajapati",
             "Ganjam",
             "Jagatsinghapur",
             "Jajpur",
             "Jharsuguda",
             "Kalahandi",
             "Kandhamal",
             "Kendrapara",
             "Kendujhar (Keonjhar)",
             "Khordha",
             "Koraput",
             "Malkangiri",
             "Mayurbhanj",
             "Nabarangpur",
             "Nayagarh",
             "Nuapada",
             "Puri",
             "Rayagada",
             "Sambalpur",
             "Sonepur",
             "Sundargarh"
          ]
       },
       {  
          "state":"Puducherry (UT)",
          "districts":[  
             "Karaikal",
             "Mahe",
             "Pondicherry",
             "Yanam"
          ]
       },
       {  
          "state":"Punjab",
          "districts":[  
             "Amritsar",
             "Barnala",
             "Bathinda",
             "Faridkot",
             "Fatehgarh Sahib",
             "Fazilka",
             "Ferozepur",
             "Gurdaspur",
             "Hoshiarpur",
             "Jalandhar",
             "Kapurthala",
             "Ludhiana",
             "Mansa",
             "Moga",
             "Muktsar",
             "Nawanshahr (Shahid Bhagat Singh Nagar)",
             "Pathankot",
             "Patiala",
             "Rupnagar",
             "Sahibzada Ajit Singh Nagar (Mohali)",
             "Sangrur",
             "Tarn Taran"
          ]
       },
       {  
          "state":"Rajasthan",
          "districts":[  
             "Ajmer",
             "Alwar",
             "Banswara",
             "Baran",
             "Barmer",
             "Bharatpur",
             "Bhilwara",
             "Bikaner",
             "Bundi",
             "Chittorgarh",
             "Churu",
             "Dausa",
             "Dholpur",
             "Dungarpur",
             "Hanumangarh",
             "Jaipur",
             "Jaisalmer",
             "Jalore",
             "Jhalawar",
             "Jhunjhunu",
             "Jodhpur",
             "Karauli",
             "Kota",
             "Nagaur",
             "Pali",
             "Pratapgarh",
             "Rajsamand",
             "Sawai Madhopur",
             "Sikar",
             "Sirohi",
             "Sri Ganganagar",
             "Tonk",
             "Udaipur"
          ]
       },
       {  
          "state":"Sikkim",
          "districts":[  
             "East Sikkim",
             "North Sikkim",
             "South Sikkim",
             "West Sikkim"
          ]
       },
       {  
          "state":"Tamil Nadu",
          "districts":[  
             "Ariyalur",
             "Chennai",
             "Coimbatore",
             "Cuddalore",
             "Dharmapuri",
             "Dindigul",
             "Erode",
             "Kanchipuram",
             "Kanyakumari",
             "Karur",
             "Krishnagiri",
             "Madurai",
             "Nagapattinam",
             "Namakkal",
             "Nilgiris",
             "Perambalur",
             "Pudukkottai",
             "Ramanathapuram",
             "Salem",
             "Sivaganga",
             "Thanjavur",
             "Theni",
             "Thoothukudi (Tuticorin)",
             "Tiruchirappalli",
             "Tirunelveli",
             "Tiruppur",
             "Tiruvallur",
             "Tiruvannamalai",
             "Tiruvarur",
             "Vellore",
             "Viluppuram",
             "Virudhunagar"
          ]
       },
       {  
          "state":"Telangana",
          "districts":[  
             "Adilabad",
             "Bhadradri Kothagudem",
             "Hyderabad",
             "Jagtial",
             "Jangaon",
             "Jayashankar Bhoopalpally",
             "Jogulamba Gadwal",
             "Kamareddy",
             "Karimnagar",
             "Khammam",
             "Komaram Bheem Asifabad",
             "Mahabubabad",
             "Mahabubnagar",
             "Mancherial",
             "Medak",
             "Medchal",
             "Nagarkurnool",
             "Nalgonda",
             "Nirmal",
             "Nizamabad",
             "Peddapalli",
             "Rajanna Sircilla",
             "Rangareddy",
             "Sangareddy",
             "Siddipet",
             "Suryapet",
             "Vikarabad",
             "Wanaparthy",
             "Warangal (Rural)",
             "Warangal (Urban)",
             "Yadadri Bhuvanagiri"
          ]
       },
       {  
          "state":"Tripura",
          "districts":[  
             "Dhalai",
             "Gomati",
             "Khowai",
             "North Tripura",
             "Sepahijala",
             "South Tripura",
             "Unakoti",
             "West Tripura"
          ]
       },
       {  
          "state":"Uttarakhand",
          "districts":[  
             "Almora",
             "Bageshwar",
             "Chamoli",
             "Champawat",
             "Dehradun",
             "Haridwar",
             "Nainital",
             "Pauri Garhwal",
             "Pithoragarh",
             "Rudraprayag",
             "Tehri Garhwal",
             "Udham Singh Nagar",
             "Uttarkashi"
          ]
       },
       {  
          "state":"Uttar Pradesh",
          "districts":[  
             "Agra",
             "Aligarh",
             "Allahabad",
             "Ambedkar Nagar",
             "Amethi (Chatrapati Sahuji Mahraj Nagar)",
             "Amroha (J.P. Nagar)",
             "Auraiya",
             "Azamgarh",
             "Baghpat",
             "Bahraich",
             "Ballia",
             "Balrampur",
             "Banda",
             "Barabanki",
             "Bareilly",
             "Basti",
             "Bhadohi",
             "Bijnor",
             "Budaun",
             "Bulandshahr",
             "Chandauli",
             "Chitrakoot",
             "Deoria",
             "Etah",
             "Etawah",
             "Faizabad",
             "Farrukhabad",
             "Fatehpur",
             "Firozabad",
             "Gautam Buddha Nagar",
             "Ghaziabad",
             "Ghazipur",
             "Gonda",
             "Gorakhpur",
             "Hamirpur",
             "Hapur (Panchsheel Nagar)",
             "Hardoi",
             "Hathras",
             "Jalaun",
             "Jaunpur",
             "Jhansi",
             "Kannauj",
             "Kanpur Dehat",
             "Kanpur Nagar",
             "Kanshiram Nagar (Kasganj)",
             "Kaushambi",
             "Kushinagar (Padrauna)",
             "Lakhimpur - Kheri",
             "Lalitpur",
             "Lucknow",
             "Maharajganj",
             "Mahoba",
             "Mainpuri",
             "Mathura",
             "Mau",
             "Meerut",
             "Mirzapur",
             "Moradabad",
             "Muzaffarnagar",
             "Pilibhit",
             "Pratapgarh",
             "RaeBareli",
             "Rampur",
             "Saharanpur",
             "Sambhal (Bhim Nagar)",
             "Sant Kabir Nagar",
             "Shahjahanpur",
             "Shamali (Prabuddh Nagar)",
             "Shravasti",
             "Siddharth Nagar",
             "Sitapur",
             "Sonbhadra",
             "Sultanpur",
             "Unnao",
             "Varanasi"
          ]
       },
       {  
          "state":"West Bengal",
          "districts":[  
             "Alipurduar",
             "Bankura",
             "Birbhum",
             "Burdwan (Bardhaman)",
             "Cooch Behar",
             "Dakshin Dinajpur (South Dinajpur)",
             "Darjeeling",
             "Hooghly",
             "Howrah",
             "Jalpaiguri",
             "Kalimpong",
             "Kolkata",
             "Malda",
             "Murshidabad",
             "Nadia",
             "North 24 Parganas",
             "Paschim Medinipur (West Medinipur)",
             "Purba Medinipur (East Medinipur)",
             "Purulia",
             "South 24 Parganas",
             "Uttar Dinajpur (North Dinajpur)"
          ]
       }
    ]
 }
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
        <label htmlFor="stateRegistered" className="col-sm-2 col-form-label">
          State Registered
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="stateRegistered"
            name="stateRegistered"
            value={formData.stateRegistered}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="" disabled>Select State</option>
            {statesAndDistricts.states.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>
      </div>
            <div className="row mb-3">
              <label htmlFor="inputUniversity" className="col-sm-2 col-form-label">
                University
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputUniversity" name="university" value={formData.university} onChange={(e)=>handleChange(e)} required/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="inputCollege" className="col-sm-2 col-form-label">
                College
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputCollege" name="college" value={formData.college} onChange={(e)=>handleChange(e)} required />
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
              <label htmlFor="selectState" className="col-sm-2 col-form-label">
                State
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="selectState"
                  onChange={(e) => handleStateChange(e, setSelectedState,setSelectedDistrict)}
                  value={selectedState}
                  required
                >
                  <option value="" disabled selected>
                    Select State
                  </option>
                  {statesAndDistricts.states.map((state) => (
                    <option key={state.state} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="selectDistrict" className="col-sm-2 col-form-label">
                District
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="selectDistrict"
                  onChange={(e) => handleDistrictChange(e, setSelectedDistrict)}
                  value={selectedDistrict}
                  required
                >
                  <option value="" disabled selected>
                    Select District
                  </option>
                  {selectedState &&
                    statesAndDistricts.states
                      .find((state) => state.state === selectedState)
                      .districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
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
                {/*res state */}
                <div className="row mb-3">
        <label htmlFor="residentialState" className="col-sm-2 col-form-label">
          Residential State
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="residentialState"
            onChange={(e) => handleStateChange(e, setResidentialState,setResidentialDistrict)}
            value={residentialState}
            required
            disabled={sameAsCurrent}
          >
            <option value="" disabled selected>
              Select State
            </option>
            {statesAndDistricts.states.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>
      </div>
              {/*res dist */}
      <div className="row mb-3">
        <label htmlFor="residentialDistrict" className="col-sm-2 col-form-label">
          Residential District
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="residentialDistrict"
            onChange={(e) => handleDistrictChange(e, setResidentialDistrict)}
            value={residentialDistrict}
            required
            disabled={sameAsCurrent}
          >
            <option value="" disabled selected>
              Select District
            </option>
            {residentialState &&
                    statesAndDistricts.states
                      .find((state) => state.state === residentialState)
                      .districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
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
