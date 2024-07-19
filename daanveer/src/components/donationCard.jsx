import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './donationCard.css'
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText, Button } from '@mui/material';
import {
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    FormHelperText,
    Input,
} from '@mui/material';
import { AuthContext } from '../ApiContext/AuthContext';




const DonationCard = ({ donation, index, handleUpdation }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRejecton = () => {
        const updatedFields = { status: 'rejected' }
        handleUpdation(donation.id, updatedFields)
    }
    const handleAccept = () => {
        const updatedFields = { status: 'accepted', orgId: user._id, donationType: "specific" }
        handleUpdation(donation.id, updatedFields)
    }
    const handleMoreDetails = ()=>{

    }
    const handleComplete = () => {
        const updatedFields = { status: 'completed', orgId: user._id }
        handleUpdation(donation.id, updatedFields)
    }
    const [errors, setErrors] = useState({
        title: '',
        // desc: '',
        assignedTo: '',
        estTime: '',
        priority: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrTask({
            ...currTask,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const [open, setOpen] = useState(false);
    const [currTask, setCurrTask] = useState({
        _id: "",
        title: "",
        desc: "",
        priority: "",
        stage: "",
        estTime: 0,
        assignedTo: ""
    })

    const handleClickOpen = (task) => {
        // setCurrTask({...task});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div key={index} className='taskCard'>
            <Box sx={{
                display:"flex",
                gap:2,
                justifyContent:"space-between"
            }}>
                <Box>
                <Typography variant="h6" sx={{
                textDecoration: "none",
                fontWeight: 500,
                fontFamily: "Poppins",
                fontSize: "1.1rem",
                color: "#161d2f"
            }}>{donation.itemName}</Typography>
            <Typography variant="body2" sx={{

                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                color: "#161d2f"
            }}>Description: {donation.description}</Typography>
            <Typography variant="body2" sx={{

                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                color: "#161d2f"
            }}> Category: {donation.category}</Typography>
            <Typography variant="body2" sx={{

                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                color: "#161d2f"
            }}>Quantity: {donation.quantity}</Typography>
            <Typography variant="body2" sx={{

                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                color: "#161d2f"
            }}>Pincode: {donation.pinCode}</Typography>
            <Typography variant="body2" sx={{

                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "0.9rem",
                color: "#161d2f"
            }}>Address: {`${donation.address}, ${donation.city}, ${donation.state}, ${donation.country},`}</Typography>
                </Box>
                <Box>
                <Typography variant="h6" sx={{
                textDecoration: "none",
                fontWeight: 500,
                fontFamily: "Poppins",
                fontSize: "1.1rem",
                color: "#161d2f"
            }}>Donator Name: {donation.donatorName}</Typography>
            <Typography variant="body2" sx={{

                fontWeight: "500",
                fontFamily: "Poppins",
                fontSize: "1rem",
                color: "#161d2f"
            }}>Phone no. : {donation.phoneNo}</Typography>
            
                </Box>
            </Box>
            
            <Box mt={2} display="flex" gap={1} justifyContent={'space-between'}>
                <Box mt={2} display="flex" gap={1}>
                    {donation.images && donation.images.map((image, index) => (
                        <img key={index} src={image} alt={`Donation ${index}`} style={{ width: '100px', height: '100px' }} />
                    ))}

                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end" gap={1} sx={{ alignItems: 'center' }}>
                {/* <Button size="small" variant="outlined" color="primary" onClick={() => handleMoreDetails()}>
                        More Details
                    </Button> */}
                    
                    {donation.donationType === "specific" && (<Button size="small" variant="outlined" color="error" onClick={() => handleRejecton()} sx={{ height: 'fit-content' }}>
                        Cancel
                    </Button>)
                    }
                    {donation.status === "accepted" && <Button size="small" variant="contained" color="success" onClick={() => handleComplete()} sx={{ height: 'fit-content' }}>
                        Complete
                    </Button>}
                    {donation.status === "pending" && <Button size="small" variant="contained" color="primary" onClick={() => handleAccept()} sx={{ height: 'fit-content' }}>
                        Accept
                    </Button>}
                    {/* <Button size="small" variant="contained" color="primary" onClick={()=>handleClickOpen(task)}>
                        Update Task
                      </Button> */}

                </Box>

            </Box>
        </div>
    )
}

export default DonationCard