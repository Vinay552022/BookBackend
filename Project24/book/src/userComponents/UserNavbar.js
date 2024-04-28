import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import logo from '../components/Images/logo.png'
import { useUser } from '../App';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './UserNavbar.css'
import { ImExit } from "react-icons/im";

export default function UserNavbar(props) {
  const navigate = useNavigate();
  const { userData } = useUser();
  const { LogOut } = props;
  const h1Style = {
    fontFamily: "'Cinzel', serif",
    color: 'black',
    textTransform: 'uppercase',
    fontSize: '1.4 rem',
    textAlign: 'center'
  };

  return (
    <div>
      <nav className="navbar border-bottom border-body navbar-expand-lg" data-bs-theme="white">
        <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center">
        <Link className="navbar-brand" to={"/"}><img  className="img-fluid "  style={{ width: "30px" }} src={logo}/></Link><h5 className="mt-2 ms-0" style={h1Style}>HAELAN HOMEOPATHY</h5>
        </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ transition: "height 0.3s ease-in-out 0.5s" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              
              <li className="nav-item ">
                <Link className="nav-link align-items-center" to={"/cart"}>
                  <FaCartShopping size={24}/><span className="badge badge-black" style={{color:"black"}}>{userData.cart.length}</span>
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link align-items-center" to={"/orders"}>
                  Orders
                </Link>
              </li>
              <li  className="nav-item  dropdown">
    <Link className="nav-link dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      My Account
    </Link>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><Link className="nav-link" to='/updateprofile'><FaUser size={20}/> Profile</Link></li>
      <li><Link className="nav-link" to='/changePassword'><FaLock size={20}/> Login & security</Link></li>
      <li><Link className="nav-link" 
            onClick={(e) => {
              e.preventDefault();
                  LogOut();
                  navigate("/");
            }}><ImExit size={20}/> Logout</Link></li>
    </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}