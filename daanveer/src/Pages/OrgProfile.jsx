import React, { useContext, useEffect,useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
} from '@mui/material';
import { AuthContext } from '../ApiContext/AuthContext';
import {Chart,ArcElement} from 'chart.js';
import {Doughnut} from 'react-chartjs-2'

const OrgProfile = () => {
    
  Chart.register(ArcElement)
    const {user} = useContext(AuthContext);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);
    useEffect(() => {
        const fetchDonations = async () => {
            if (user) {
              const response = await fetch(`http://localhost:3001/donations?orgId=${user._id}`);
              const data = await response.json();

                console.log(data);
      // Filter out donations that have an empty orgId
    //   const filteredDonations = data.filter(donation => donation.status === "pending");
    let pendingReq = 0;
    let conpletedReq = 0;

      const filteredDonations1 = data.filter(donation => donation.status !== "completed");
                data.forEach(donation => {
                    if(donation.status === "completed")
                    {
                        conpletedReq = conpletedReq+1;
                    }
                    if(donation.status === "pending")
                    {
                        pendingReq = pendingReq+1;
                    }
                });
                console.log(pendingReq)
                console.log(conpletedReq)
              setPending(pendingReq);
              setCompleted(conpletedReq);
              console.log(pending)
              console.log(completed)
            }
          };
          fetchDonations();
      }, [user,loading]);
    //   console.log(donations)
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            // data: [outOfStock, products.length - outOfStock],
            data: [pending, completed],
          },
        ],
        hoverOffset: 4,
      };
  return (
    <Box sx={{
        height: "100%",
        backgroundColor: "white"
    }} >
    {user && (<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: '100vh',
        padding: 3,
        backgroundColor: 'white',
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user.organizationName}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Basic Information</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Contact No:</strong> {user.contactNo}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Founder Name:</strong> {user.founderName}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Location:</strong> {user.locationOfOrg}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Temporary/Registered:</strong> {user.temporaryOrRegistered}</Typography>
            </Grid>

            {user.temporaryOrRegistered === 'Temporary' && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Aadhaar No:</strong> {user.temporaryDetails.adhaarNo}</Typography>
              </Grid>
            )}

            {user.temporaryOrRegistered === 'Registered' && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Organization Reg No:</strong> {user.registeredDetails.organizationRegNo}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6">Additional Information</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Role:</strong> {user.role}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{color:"black"}}><strong>Pending Requests:</strong> {pending}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{color:"black"}}><strong>Completed Requests:</strong> {completed}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className="doughnutChart" style={{
          
          width: "20vmax",
          margin: "auto",
        
      }}>
        <Doughnut data={doughnutState} />
        <Typography variant="body1" sx={{margin:"10px auto",
    textAlign:"center"}}><strong>Pending/Completed</strong></Typography>
      </div>
    </Box>)}
    </Box>
  );
};

export default OrgProfile;
