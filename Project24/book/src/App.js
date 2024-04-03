import Book from './components/Book';
import Login from './components/Login';
import NavBar from './components/NavBar';
import UserForm from './components/UserForm';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AdminNav from './adminComponents/AdminNav';
import OfferBanner from './components/OfferBanner';
import Content from './homeCompnents/Content';
import Summary from './homeCompnents/Summary';
import Author from './homeCompnents/Author';
import HomeopathicDoctor from './adminComponents/HomeopathicDoctorTable';
import BHMSTable from './adminComponents/BHMSTable';
import GeneralIndividualTable from './adminComponents/GeneralIndividualTable'
import RegiserAdmin from './adminComponents/RegisterAdmin';
import RegisterUsers from './adminComponents/RegisterUsers';
import UsersRegisteredByMe from './adminComponents/UsersRegisteredByMe';
import BuyBooks from './adminComponents/BuyBooks';

function App() {
  const [cookies, removeCookie] = useCookies([])
  const [userData, setUserData] = useState({})
  const [data, setData] = useState({})
  const [filterData, setFilterData] = useState([])
  const [booksData,setBooksData]=useState([])
  useEffect(() => {
    console.log("hello", cookies)
    const verifyCookie = async () => {
      console.log("j")
      if (cookies.token != 'undefined') {
        console.log("p")
        try {
          const response = await axios.post(
            "http://localhost:4000",
            {},
            { withCredentials: true }
          );
          console.log(response.data, "kii")
          if (response.data.status) {
            console.log(response.data.user)
            setUserData(response.data.user)

          }
        } catch (error) {
          console.error("Error making POST app.js request:", error.message);
        }
      }

    };

    verifyCookie();

  }, [])
  function LogOut() {
    removeCookie("token")
    setUserData({})
  }
  useEffect(() => {
    if (userData.userType === "Admin") {
      const getUserData = async () => {
        try {
          const { data } = await axios.get('http://localhost:4000/user-data');
          setData(data);
          let filteredData = [];
          if (userData.usersAdded) {
            const { BHMSstudent, GeneralIndividual, HomeopathicDoctor } = data;
            const addedEmails = userData.usersAdded;

            filteredData = [
              ...BHMSstudent.filter(user => addedEmails.includes(user.email)),
              ...GeneralIndividual.filter(user => addedEmails.includes(user.email)),
              ...HomeopathicDoctor.filter(user => addedEmails.includes(user.email))
            ];
          }
          setFilterData(filteredData);

          console.log(data, "loo");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      getUserData();
      const getBooks=async()=>{
        try {
          const booksData  = await axios.get('http://localhost:4000/getBooks');
          setBooksData(booksData)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      getBooks()
    }
  }, [userData.userType]);
  console.log(userData, "hii")
  if (Object.keys(userData).length === 0) {
    return (
      <>
        <Router>
          <NavBar />
          <OfferBanner />
          <Routes>
            <Route path='/' exact element={<Book />}></Route>
            <Route path='/Form' element={<UserForm />}></Route>
            <Route path="/Login" element={<Login setUserData={setUserData} />} />
            <Route path='/Content' element={<Content />} />
            <Route path='/Summary' element={<Summary />} />
            <Route path='/Author' element={<Author />} />
          </Routes>
        </Router>
      </>
    );
  }
  else if (userData.userType == "Admin") {



    return (
      Object.keys(data).length != 0 &&
      <>
        <Router>
          <AdminNav LogOut={LogOut} />
          <Routes>
            <Route path='/' exact element={<BHMSTable data={Object.values(data.BHMSstudent)} />}></Route>
            <Route path='/HomeopathicDoctor' element={<HomeopathicDoctor data={Object.values(data.HomeopathicDoctor)} />}></Route>
            <Route path='/Practitioners' element={<GeneralIndividualTable data={Object.values(data.GeneralIndividual)} />}></Route>
            <Route path='/RegisterAdmin' element={<RegiserAdmin userData={userData} />} />
            <Route path='/RegisterUsers' element={<RegisterUsers userData={userData} />} />
            <Route path='/UsersRegisteredByMe' element={<UsersRegisteredByMe filterData={filterData}/>}/>
            <Route path='/BuyBooks' element={<BuyBooks userData={userData} booksData={booksData}/>}/>
          </Routes>
        </Router>
      </>
    )
  }
  else {
    return (
      <>hii</>
    )
  }
}

export default App;
// https://bookbackend-1.onrender.com