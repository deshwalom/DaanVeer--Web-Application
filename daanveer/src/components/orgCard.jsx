import React from 'react'

import { Card, CardContent, Typography, Grid, Divider, Box } from '@mui/material';

const OrgCard = ({ organization }) => {
    return (
      <Card variant="outlined" style={{ padding:"0",backgroundColor:"transparent", border:"none"  }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom style={{
            fontFamily:'Poppins',
            fontWeight:"500"
          }}>
            {organization.organizationName}
          </Typography>
  
          <Divider />
  
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="p">
                <strong>Founder Name:</strong> {organization.founderName}
              </Typography>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> {organization.email}
              </Typography>
              <Typography variant="subtitle1" component="p">
                <strong>Contact No:</strong> {organization.contactNo}
              </Typography>
              <Typography variant="subtitle1" component="p">
                <strong>Location:</strong> {organization.locationOfOrg}
              </Typography>
              <Typography variant="subtitle1" component="p">
                <strong>Authorization Type:</strong> {organization.temporaryOrRegistered}
              </Typography>
              {organization.temporaryOrRegistered === 'Temporary' && (
                <>
                  <Typography variant="subtitle1" component="p">
                    <strong>Adhaar No:</strong> {organization.temporaryDetails.adhaarNo}
                  </Typography>
                  
                </>
              )}
              {organization.temporaryOrRegistered === 'Registered' && (
                <>
                  <Typography variant="subtitle1" component="p">
                    <strong>Organization Reg No:</strong> {organization.registeredDetails.organizationRegNo}
                  </Typography>
                  
                </>
              )}
              <Typography variant="subtitle1" component="p">
                <strong>Registered At:</strong> {new Date(organization.createdAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
  
          {/* <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2" color="textSecondary">
              Pending Requests: {organization.pendingRequests}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completed Requests: {organization.completedRequests}
            </Typography>
          </Box> */}
        </CardContent>
      </Card>
    );
  };
  
  export default OrgCard;