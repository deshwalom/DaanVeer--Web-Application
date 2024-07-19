import React, { useContext, useEffect } from 'react';
import {Chart,ArcElement} from 'chart.js';
import {Doughnut} from 'react-chartjs-2'

// import Chart from 'chart.js/auto';
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Divider,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AuthContext } from '../ApiContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate  = useNavigate();
  Chart.register(ArcElement)
  const {user} = useContext(AuthContext);

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        // data: [outOfStock, products.length - outOfStock],
        data: [user.pendingRequests, 11],
      },
    ],
    hoverOffset: 4,
  };
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])
  return (
    <div>
      {user && 
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '80vh' }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center" gutterBottom sx={{
          marginBottom: "70px"
        }}>
          My Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Avatar alt="Profile Picture" src={user.image} sx={{ width: 150, height: 150, mx: 'auto' }} />
            {/* <Button variant="contained" sx={{ mt: 2, display: 'block', mx: 'auto' }}>
              Change Photo
            </Button> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="caption" gutterBottom>
                Total Donations: {user.completedRequests + user.pendingRequests}
              </Typography>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                About
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                    User Id
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" gutterBottom>
                    {user.id}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" gutterBottom>
                    {user.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" gutterBottom>
                    {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" gutterBottom>
                    Phone
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" gutterBottom>
                    {user.mobile}
                  </Typography>
                </Grid>
                
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Work Link
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Website Link" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Bootsnipp Profile" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Bootply Profile" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Web Designer" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Web Developer" />
              </ListItem>
              <ListItem>
                <ListItemText primary="WordPress" />
              </ListItem>
              <ListItem>
                <ListItemText primary="WooCommerce" />
              </ListItem>
              <ListItem>
                <ListItemText primary="PHP, .Net" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>
        </Grid> */}
        <div className="doughnutChart" style={{
          
            width: "20vmax",
            margin: "auto",
          
        }}>
          <Doughnut data={doughnutState} />
        </div>
      </Grid>
    </Grid>}
    </div>
  );
};

export default MyProfile;
