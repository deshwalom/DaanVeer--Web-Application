import React from 'react';
import { Box, Typography, Button, Icon } from '@mui/material';
import EmptyIcon from '../daanveer/EmptyIcon.png';
const Empty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Icon sx={{ fontSize: 48, color: 'primary.main' }}>
        <img src={EmptyIcon}/>
      </Icon>
      <Typography variant="h2" sx={{ marginTop: 2 }}>
        No Donations Yet
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Be the first to make a difference! Your donation can bring hope and
        change to those who need it most.
      </Typography>
      <Button variant="contained" color="primary">
        Donate Now
      </Button>
    </Box>
  )
}

export default Empty