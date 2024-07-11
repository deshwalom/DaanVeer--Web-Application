import React from 'react'
import './home.css'

const Home = () => {
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
          {/* <a href="" className="company-logo"> */}
            <img src='../daanveer/DaanVeerIcon2.png' alt="company's logo" />
          {/* </a> */}
          <div className="nav-links" id="nav-links">
            <ul className="flex">
              <li><a href="#" className="hover-links">Home</a></li>
              <li><a href="#" className="hover-links">Your Donations</a></li>
              <li><a href="#" className="hover-links">Settings</a></li>
              <li><a href="#" className="hover-links">Organizations</a></li>
              <li><a href="#" className="hover-links secondary-button">Log in</a></li>
              <li><a href="#" className="hover-links primary-button">Sign up</a></li>
            </ul>
          </div>
          <a href="#" className="nav-toggle hover-links" id="nav-toggle">
            <i className="fa-solid fa-bars"></i>
          </a>
        </div>
      </nav>

      <header>
        <div className="container header-section flex">
          <div className="header-left">
            <h1>Donate confidently.</h1>
            <p>"We are in a mission to help the helpless."</p>
            <span>Digital platform for collecting donations to be distributed to people in need. We build strength, stability and self reliance.</span>
            <br />
            <a className="primary-button get-started-button" href="#">Let's Donate </a>
          </div>
          <div className="header-right">
            <img className="" src="../daanveer/intro_image.png" alt="team-work" />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home