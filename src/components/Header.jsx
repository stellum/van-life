import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // runs on location, i.e. route, change
    // console.log("handle route change here", location);
    updateLoginStatus();
  }, [location]);

  const updateLoginStatus = () => {
    const storedLoginStatus = localStorage.getItem("loggedin");
    setIsLoggedIn(storedLoginStatus === "true");
    console.log("updating login status ", storedLoginStatus);
  };

  function logOut() {
    localStorage.removeItem("loggedin");
    navigate("/login");
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        <img src={logo} className="logo-icon" />
      </Link>

      <nav>
        <NavLink
          to="host"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          className={({ isActive }) => (isActive ? "active-link" : null)}
        >
          Vans
        </NavLink>

        {isLoggedIn ? (
          <button onClick={logOut} className="link-button">
            Log out
          </button>
        ) : (
          <Link to="login" className="login-link">
            <img src={imageUrl} className="login-icon" />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
