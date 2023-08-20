import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loggedin");
    setIsLoggedIn(storedLoginStatus === "true");
  }, []);

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <div className="site-wrapper">
      <Header isLoggedIn={isLoggedIn} onLogout={fakeLogOut} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
