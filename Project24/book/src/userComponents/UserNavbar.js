import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useUser } from '../App';
export default function UserNavbar(props) {
  const navigate = useNavigate();
  const { userData } = useUser();
  const { LogOut } = props;

  return (
    <div>
      <nav className="navbar border-bottom border-body navbar-expand-lg" style={{ backgroundColor: "black" }}data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">JAVA</a>
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
              <li className="nav-item ">
                <Link className="nav-link align-items-center" to={"/cart"}>
                  <FaCartShopping size={24}/><span class="badge badge-light">{userData.cart.length}</span>
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link align-items-center" to={"/orders"}>
                  Orders
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <button
                className="btn  btn-outline-light"
                style={{ width: "150px" }}>
                Buy
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
