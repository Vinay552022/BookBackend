import { Link, useNavigate } from "react-router-dom";

export default function AdminNav(props) {
  const navigate = useNavigate();
  const { LogOut } = props;

  return (
    <div>
      <nav
        className="navbar border-bottom border-body navbar-expand-lg"
        style={{ backgroundColor: "black" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            JAVA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
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
              <li className="nav-item">
                <Link className="nav-link" to={"/HomeoPathicDoctor"}>
                  HomiopathicDoctors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Practitioners"}>
                  Practitioners
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/RegisterUsers"}>
                  RegisterUsers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/RegisterAdmin"}>
                  RegisterAdmin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/UsersRegisteredByMe"}>
                  UsersRegisteredByMe
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/BookStats"}>
                  BookStats
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    LogOut();
                    navigate("/");
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <button
                className="btn  btn-outline-light"
                style={{ width: "150px" }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
