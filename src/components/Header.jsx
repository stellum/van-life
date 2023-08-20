import { Link, NavLink } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";
import logo from "../assets/images/logo.png";

const Header = () => {
  function fakeLogOut() {
    localStorage.removeItem("loggedin");
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
        <Link to="login" className="login-link">
          <img src={imageUrl} className="login-icon" />
        </Link>
        <button onClick={fakeLogOut}>Log out</button>
      </nav>
    </header>
  );
};

export default Header;
