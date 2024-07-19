import React, { useContext } from 'react'
import './home.css'
import introImage from '../daanveer/intro_image.png';
import icon from '../daanveer/DaanVeerIcon2.png';
import iconPng from '../daanveer/DaanVeerIcon3.png';
import c1 from '../assets/asset 3.png';
import c2 from '../assets/asset 4.png';
import c3 from '../daanveer/microsoft.png';
import c4 from '../daanveer/cisco.png';
import c5 from '../daanveer/samsung.png';
import c6 from '../assets/asset 22.png';
import clothesImg from '../daanveer/clothesview2.png';
import cerealsImg from '../daanveer/cerealsview2.png';
import eduImg from '../daanveer/educationview2.png';
import foodImg from '../daanveer/foodview2.png';
import shoeImg from '../daanveer/shoesview2.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../ApiContext/AuthContext';
import { Grid, Typography, Button, Card, CardContent, CardActions, Box, Paper, Avatar } from '@mui/material';
import giftBox from '../daanveer/giftbox.png'
import requests from '../daanveer/requests.png';
import donationImg from '../daanveer/donation_png.png';


const Home = () => {
  const {user} = useContext(AuthContext);

  

  return (
    <div>
    {(user && user.role === "ORGANIZATION") ? (<Grid container spacing={2}>
      
      <Grid item xs={12}>
      <header>
        <div className="container header-section flex">
          <div className="header-left">
            <h1>Help confidently.</h1>
            <p style={{fontFamily:"Poppins", margin:"8px 0px"}}>"Hope is the light that guides us through darkness. Your support illuminates the path for those who need it most."</p>
            <span>Digital platform for collecting donations to be distributed to people in need. We build strength, stability and self reliance.</span>
            <br />
            <Link className="primary-button get-started-button" to="/donate">Let's Checkout Donations </Link> 
          </div>
          <div className="header-right">
            <img className="" src={introImage} alt="team-work" />
          </div>
        </div>
      </header>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="h5" sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                fontSize: "2rem",
                                color: "#183b56",
                                textAlign: "center",
                                margin: "1rem 0"
                            }} gutterBottom>
          Welcome to Organization's Dashboard
        </Typography>
      </Grid>
      
      <div className="features flex" style={{
        width: "80vw",
        margin:"2vmax auto"
      }}>
            <div className="features-item">
              <img src={requests} alt="" />
              <p>Your Donation Requests</p>
              <Link className="secondary-button features-button" to="">
                GO TO YOUR REQUESTS <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            <div className="features-item">
              <img src={donationImg} alt="" />
              <p>All Common Donations</p>
              <Link className="secondary-button features-button" to="">
                GO TO COMMON DONATIONS <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            <div className="features-item">
              <img src={giftBox} alt="" />
              <p>Your Accepted Donations</p>
              <Link className="secondary-button features-button" to="">
                GO TO ACCEPTED DONATIONS <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            
          </div>
      
    </Grid>) : (<div>
      

      <header>
        <div className="container header-section flex">
          <div className="header-left">
            <h1>Donate confidently.</h1>
            <p>"We are in a mission to help the helpless."</p>
            <span>Digital platform for collecting donations to be distributed to people in need. We build strength, stability and self reliance.</span>
            <br />
            <Link className="primary-button get-started-button" to="/donate">Let's Donate </Link> 
          </div>
          <div className="header-right">
            <img className="" src={introImage} alt="team-work" />
          </div>
        </div>
      </header>
      {/* Companies Section */}
      <section className="companies-section">
        <div className="container">
          <div className="small-bold-text companies-header">
            The world’s best companies that promote donation.
          </div>
          <div className="logos flex">
            <img className="logo" src={c1} alt="company-logo" />
            <img className="logo" src={c2} alt="company-logo" />
            <img className="logo" src={c3} alt="company-logo" />
            <img className="logo" src={c4} alt="company-logo" />
            <img className="logo" src={c5} alt="company-logo" />
            <img className="logo" src={c6} alt="company-logo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2>Transform lives by donating these valuable items today!</h2>
            <br />
            <Link className="secondary-button features-button" to="">
              See all donatable items <i className="fa-solid fa-right-long"></i>
            </Link> 
          </div>
          <div className="features flex">
            <div className="features-item">
              <img src={clothesImg} alt="" />
              <p>Your old clothes can be someone’s new hope. Donate today!</p>
              <Link className="secondary-button features-button" to="/donate">
                Donate now <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            <div className="features-item">
              <img src={cerealsImg} alt="" />
              <p>Feed a family, nourish a future: donate cereals today.</p>
              <Link className="secondary-button features-button" to="/donate">
                Donate now <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            <div className="features-item">
              <img src={eduImg} alt="" />
              <p>Share knowledge, ignite minds, and change futures with your books.</p>
              <Link className="secondary-button features-button" to="/donate">
                Donate now <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            <div className="features-item">
              <img src={foodImg} alt="" />
              <p>Feeding others is an act of love and humanity.</p>
              <Link className="secondary-button features-button" to="/donate">
                Donate now <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
            <div className="features-item">
              <img src={shoeImg} alt="" />
              <p>Step into kindness – donate shoes, change someone's journey.</p>
              <Link className="secondary-button features-button" to="/donate">
                Donate now <i className="fa-solid fa-right-long"></i>
              </Link> 
            </div>
          </div>
        </div>
      </section>
      <br /><br /><br />
      {/* Big Feature Section */}
      <section className="big-feature-section">
        <div className="container flex big-feature-container">
          <div className="feature-image">
            <img src={introImage} alt="" />
          </div>
          <div className="feature-desc flex">
            <h4>Join Us in Making a Difference with -</h4>
            <h2>DaanVeer</h2>
            
            <br />
            <h3>Mahatma Gandhi</h3>
            <br />
            <h4>- "The best way to find yourself is to lose yourself in the service of others."</h4>
            <br />
          </div>
        </div>
      </section>
      <section className="big-feature-section">
        <div className="container"></div>
      </section>
      <section className="big-feature-section">
        <div className="container"></div>
      </section>
    
  <footer>
    <div className="container flex footer-section">
      <Link to="" className="company-logo">
        <img src={iconPng} alt="Company Logo" />
      </Link> 
      <div className="link-column flex">
        <h4>Product</h4>
        <Link to="" className="hover-links">Your Donations</Link> 
        <Link to="" className="hover-links">Overview</Link> 
        <Link to="" className="hover-links">Organizations panel</Link> 
        <Link to="" className="hover-links">Settings</Link> 
        <Link to="" className="hover-links">Sign up</Link> 
      </div>
      <div className="link-column flex">
        <h4>Methodologies</h4>
        <Link to="" className="hover-links">Sustainablity</Link>
        <Link to="" className="hover-links">Reusablity</Link> 
        <Link to="" className="hover-links">Surveys</Link> 
        {/* These empty links can be removed if not needed */}
        <Link to="" className="hover-links"></Link> 
        <Link to="" className="hover-links"></Link> 
        <Link to="" className="hover-links"></Link> 
        <Link to="" className="hover-links"></Link> 
      </div>
      <div className="link-column flex">
        <h4>Resources</h4>
        <Link to="" className="hover-links">Blog</Link> 
        <Link to="" className="hover-links">Examples</Link> 
        <Link to="" className="hover-links">Guides</Link> 
        <Link to="" className="hover-links">Help center</Link> 
        <Link to="" className="hover-links">Contact</Link> 
      </div>
    </div>
  </footer>
  </div>)}
  </div>
  )
}

export default Home