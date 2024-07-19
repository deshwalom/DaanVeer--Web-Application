import React, { useContext } from 'react';
import { AuthContext } from '../ApiContext/AuthContext';
import icon from '../daanveer/DaanVeerIcon2.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <div className="top-banner">
        <div className="container">
          <div className="small-bold-text banner-text">
            📣 "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
          </div>
        </div>
      </div>

      <nav>
        <div className="container menu-nav flex">
          <Link to="/" className="company-logo">
            <img src={icon} alt="company's logo" />
          </Link>
          <div className="nav-links" id="nav-links">
            <ul className="flex">
              {<li><Link to="/" className="hover-links">Home</Link></li>}
              {user && user.role === "USER" ? (
                <li>
                  <Link to="/donations" className="hover-links">Your Donations</Link>
                </li>
              ) : null}
              {user && user.role === "USER" ? (
                <li>
                  <Link to="/organizations" className="hover-links">Organizations</Link>
                  </li>
              ) : null}
              {user && user.role === "USER" ? (
               
                  <li><Link to="/profile" className="hover-links">My Profile</Link></li>
                
              ) : null}
              {user && user.role === "ORGANIZATION" ? (
                 <li>
                  <Link to="/requests" className="hover-links">Your Requests</Link>
                  </li>
              ) : null}
              {user && user.role === "ORGANIZATION" ? (
                 <li>
                  <Link to="/allrequests" className="hover-links">Common Requests</Link>
                  </li>
              ) : null}
              {user && user.role === "ORGANIZATION" ? (
                 <li>
                  <Link to="/orgDonations" className="hover-links">Active Donations</Link>
                  </li>
              ) : null}
              {user && user.role === "ORGANIZATION" ? (
                 <li>
                  <Link to="/orgProfile" className="hover-links">Your Account</Link>
                  </li>
              ) : null}
              
              {!user && <li><Link to="/login" className="hover-links secondary-button">Log in</Link></li>}
              {!user && <li><Link to="/signup" className="hover-links primary-button">Sign up</Link></li>}
              {user && <li><Link onClick={handleLogout} to="/" className="hover-links secondary-button">Log Out</Link></li>}
            </ul>
          </div>
          <Link to="/" className="nav-toggle hover-links" id="nav-toggle">
            <i className="fa-solid fa-bars"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
