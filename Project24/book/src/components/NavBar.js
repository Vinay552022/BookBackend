import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <div>
      <nav className="navbar border-bottom border-body navbar-expand-lg" style={{ backgroundColor: "black" }} data-bs-theme="dark">

        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            JAVA
          </Link>
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
              {/* <li className="nav-item">
                <Link className="nav-link" to={"/Form"}>
                  Form
                </Link>
              </li> */}
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
          <div className="d-flex ms-auto">
              <button className="btn  btn-outline-light" style={{width:"150px"}}>Buy</button>
            </div>
        </div>
      </nav>
    </div>
  );
}

  