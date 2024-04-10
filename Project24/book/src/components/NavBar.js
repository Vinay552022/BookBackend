import { Link } from "react-router-dom";
import logo from '../components/Images/logo.png'
export default function NavBar() {
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
        <a className="navbar-brand" href="#"><img  className="img-fluid "  style={{ width: "30px" }} src={logo}/></a><h5 className="mt-2 ms-0" style={h1Style}>HAELAN HOMEOPATHY</h5>
        </div>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Form"}>
                  Register
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#summary">
                  Summary
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#info">
                  Info
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#author">
                  Author
                </a>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to={"/Login"}>
                  Login
                </Link>
              </li>
            </ul>
            
            
          </div>
          {/* <div className="d-flex ms-auto">
              <button className="btn  btn-outline-light" style={{width:"150px"}}>Buy</button>
            </div> */}
        </div>
      </nav>
    </div>
  );
}