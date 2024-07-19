import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ApiContext/AuthContext';
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';
import OrgCard from '../components/orgCard';

const Organizations = () => {

    const { user } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await fetch(`http://localhost:3001/organizations`);
            const data = await response.json();
            console.log(data)
            setOrganizations(data);
        };
    
        fetchOrganizations();
      }, [user]);
  return (
    <Box sx={{
      margin: "auto",
      width: "80vw"
    }}>
    <Typography variant="h5" sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                fontSize: "1.7rem",
                                color: "#161d2f",
                                // margin:"auto"
                                textAlign:"center"
                            }} gutterBottom>
          All Organizations
        </Typography>
        <Box sx={{
          padding:"1vmax",
          border: "1px solid #c3c3c7",
    borderRadius: "15px",
    padding: "20px",
    margin: '10px 5px',
    boxShadow: "1px 1px 17px 0px #959595",
    backgroundColor: "#f2f8fc",
        }}>
        {organizations ? organizations.map((organization, index) => (
              <OrgCard index={index} organization = {organization}/>
            )
        ): (<div>
                    <Typography variant="h5" sx={{
                                fontWeight: 500,
                                fontFamily: "Poppins",
                                fontSize: "1.2rem",
                                color: "white",
                                textAlign: "center"
                            }} gutterBottom>
          The organizations are not present at that moment.
        </Typography>
            
        </div>)}
        </Box>
    </Box>
  )
}

export default Organizations