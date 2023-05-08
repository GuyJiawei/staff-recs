import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/LogoPlaceholder.png';
import Auth from '../../utils/auth';

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  const handleLogout = () => {
    Auth.logout();
    setLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt='StaffRecs Logo' height="50" />
        </Link>
        <div className="navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {loggedIn ? (
              <>
                <Link className="nav-item nav-link" to="/profile">
                  Profile
                </Link>
                <Link className="nav-item nav-link" to="/moviefeed">
                  Movie Feed
                </Link>
                <Link className="nav-item nav-link" to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-item nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-item nav-link" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
