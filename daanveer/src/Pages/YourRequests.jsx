import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ApiContext/AuthContext';
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';
import DonationCard from '../components/donationCard';
import Empty from '../components/Empty';

const YourRequests = () => {

    const { user } = useContext(AuthContext);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchDonations = async () => {
            if (user) {
              const response = await fetch(`http://localhost:3001/donations?status=pending&orgId=${user._id}`);
              const data = await response.json();


      // Filter out donations that have an empty orgId
      const filteredDonations = data.filter(donation => donation.orgId === user._id);

              setDonations(filteredDonations);
            }
          };
          fetchDonations();
      }, [user,loading]);
      console.log(donations)
      if (!user) {
        return <p>Please log in to see your donations.</p>;
      }
      const handleUpdation = async (donationId,updatedFields) => {
        setLoading(true);
        try {
        const response = await fetch(`http://localhost:3001/donations/${donationId}`);
        const donation = await response.json();

        // Update the donation with new fields
        const updatedDonation = { ...donation, ...updatedFields };

        // Send the updated donation back to the server
        const updateResponse = await fetch(`http://localhost:3001/donations/${donationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDonation)
        });

        if (updateResponse.ok) {
            // Update the state to reflect the changes
            setDonations(prevDonations =>
                prevDonations.map(donation => donation.id === donationId ? updatedDonation : donation)
            );
            // window.location.reload()
            
        }
      }catch (error) {
        console.error('Error updating donation:', error);
      } finally {
        setLoading(false); // Ensure to reset loading state
      }
    };
  return (
    <Box sx={{
        width: "90vw",
        margin: "auto"
    }}>
    <Typography variant="h5" sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                fontSize: "1.7rem",
                                color: "#161d2f",
                                textAlign: "center",
                                margin: "1rem 0"
                            }} gutterBottom>
          Your Donation Requests
        </Typography>
        {donations.length === 0 ? (
        <Empty/>
      ) : (
        <Box>
          <List>
            {donations.map((donation, index) => (
              <DonationCard 
                key={index} 
                donation={donation} 
                index={index} 
                handleUpdation={handleUpdation} 
              />
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default YourRequests