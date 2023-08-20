import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";
import logo from "../assets/images/logo.png";

const Header = ({ isLoggedIn, onLogout }) => {
  console.log("isLoggedIn prop:", isLoggedIn);

  // function fakeLogOut() {
  //   localStorage.removeItem("loggedin");
  // }

  // const isLoggedIn = localStorage.getItem("loggedin") === "true";

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
          <>
            <Link to="host" className="login-link">
              <img src={imageUrl} className="login-icon" />
            </Link>
            <button onClick={onLogout}>Log out</button>
          </>
        ) : (
          <Link to="login" className="login-link">
            <img src={imageUrl} className="login-icon" />
          </Link>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
