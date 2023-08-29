import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedOut } from "../reducers/loginReducer";
import logo from "../assets/images/logo.png";
import { useToast } from "@chakra-ui/react";

function TopHeader() {
  const loggedinuser = useSelector((state) => state.loggedin.user);
  // const loggedin = useSelector(state => state.login)
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(isLoggedOut("access_token", ""));
    localStorage.setItem("access_token", "");
    localStorage.setItem("user", "");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg  fixed-top-header border-bottom">
      <div className="container-fluid">
        {/* <h2 className="m-0 page-heading">TASK MANAGEMENT</h2> */}
        <img src={logo} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav ms-auto mt-2 mt-lg-0">
            <div
              className="collapse navbar-collapse bell-anchor"
              id="navbarSupportedContent"
            >
              {/* <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown notifications">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-bell"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#!">
                      Action
                    </a>
                    <a className="dropdown-item" href="#!">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#!">
                      Something else here
                    </a>
                  </div>
                </li>
              </ul> */}
              <h2 className="top-heading">TASK MANAGEMENT</h2>
            </div>
            <div className="dropdown fixed-bottom-dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-decoration-none dropdown-toggle"
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <span>{loggedinuser.username}</span>
              </a>
              <ul
                className="dropdown-menu text-small shadow"
                aria-labelledby="dropdownUser2"
              >
                <li>
                  <Link className="dropdown-item" to="profile">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>{" "}
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleClick}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Sign
                    out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopHeader;
