import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Card, CardContent, CardActions, Box, Paper, Avatar } from '@mui/material';
import introImage from '../daanveer/intro_image.png';
import giftBox from '../daanveer/giftbox.png'
import requests from '../daanveer/requests.png';
import donationImg from '../daanveer/donation_png.png';
import eduImg from '../daanveer/educationview2.png';
import foodImg from '../daanveer/foodview2.png';
import shoeImg from '../daanveer/shoesview2.png';
import { AuthContext } from '../ApiContext/AuthContext';

function HomePage() {
    const {user} = useContext(AuthContext);
  return (
    <Grid container spacing={2}>
      
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
      
    </Grid>
  );
}

export default HomePage;