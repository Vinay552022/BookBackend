import Book from './components/Book';
import Homepagevideo from './components/homepagevideo';
import Login from './components/Login';
import NavBar from './components/NavBar';
import UserForm from './components/UserForm';
import { useState,useEffect, useContext, createContext } from 'react';
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
//nishanth
import Cart from './userComponents/Cart';
import SelectedBook from './userComponents/SelectedBook';
import Dashboard from './userComponents/Dashboard';
import UserNavbar from './userComponents/UserNavbar';
import PlaceOrder from './userComponents/PlaceOrder';
import Orders from './userComponents/Orders';
import BookStats from './adminComponents/BookStats';
//nishanth
const UserContext = createContext();
export const useUser = () => useContext(UserContext);


function App() {
  const [cookies, removeCookie] = useCookies([])
  const [userData, setUserData] = useState({})
  const [data, setData] = useState({})
  const [datas, setDatas] = useState({})
  const [filterData, setFilterData] = useState([])
  const [booksData,setBooksData]=useState([])
  //nishanth
  const [books,setBooks]=useState({})
  const [cart, setCart] = useState([]);
  const [orders,setOrders]=useState([]);
  //nishanth
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
          setDatas(data);

          //nishanth
          const response = await axios.get(`http://localhost:4000/getCart/${userData.email}/${userData.userType}`);
          console.log(response.data);
          setBooks(response.data.allBooks);
          //nishanth
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
    else if(Object.keys(userData).length!=0){
      const fetchBookData = async () => {
        try {
          console.log(userData);
          const response = await axios.get(`http://localhost:4000/getCart/${userData.email}/${userData.userType}`);
            // const response = await axios.get('http://localhost:4000/getbooks');
            console.log(response.data);
            setData(response.data.allBooks);
            setCart(response.data.booksInCart);
            setOrders(response.data.finalOrders);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchBookData();
    }
  }, [userData.userType]);
  console.log(userData, "hii")
  if (Object.keys(userData).length === 0) {
    return (
      <>
        <Router>
          <NavBar />
          {/* <OfferBanner /> */}
          <Routes>
            <Route path='/' exact element={<Homepagevideo />}></Route>
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
      
      Object.keys(datas).length != 0 &&
      <>
        <Router>
          <AdminNav LogOut={LogOut} />
          <Routes>
            <Route path='/' exact element={<BHMSTable data={Object.values(datas.BHMSstudent)} />}></Route>
            <Route path='/HomeopathicDoctor' element={<HomeopathicDoctor data={Object.values(datas.HomeopathicDoctor)} />}></Route>
            <Route path='/Practitioners' element={<GeneralIndividualTable data={Object.values(datas.GeneralIndividual)} />}></Route>
            <Route path='/RegisterAdmin' element={<RegiserAdmin userData={userData} />} />
            <Route path='/RegisterUsers' element={<RegisterUsers userData={userData} />} />
            <Route path='/UsersRegisteredByMe' element={<UsersRegisteredByMe filterData={filterData}/>}/>
            <Route path='/BuyBooks' element={<BuyBooks userData={userData} booksData={booksData}/>}/>
            <Route path='/BookStats' element={<BookStats  books={books} setBooks={setBooks}/>}/>
          </Routes>
        </Router>
      </>
    )
  }
  else{
    return(
      Object.keys(userData).length!=0 && 
      Object.keys(data).length!=0 && 
      <>
      <UserContext.Provider value={{ userData, setUserData ,data,setData,cart,setCart,orders,setOrders}}>
      <Router>
            <UserNavbar  LogOut={LogOut}/>
            <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/SelectedBook' element={<SelectedBook/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/placeOrder' element={<PlaceOrder/>}/>
              <Route path='/orders' element={<Orders/>}/>

            </Routes>
          </Router>
          </UserContext.Provider>
        </>
    )
  }
}

export default App;
// https://bookbackend-1.onrender.com