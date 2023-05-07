import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/LogoPlaceholder.png';
import Auth from '../../utils/auth';

function NavBar() {
  const loggedIn = Auth.loggedIn();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {loggedIn ? (
            <>
              <Link className="nav-item nav-link" to="/profile">
                Profile
              </Link>
              <Link className="nav-item nav-link" to="/moviefeed">
                Movie Feed
              </Link>
              <Link className="nav-item nav-link" to="/logout" onClick={Auth.logout}>
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
    </nav>
  );
}

export default NavBar;