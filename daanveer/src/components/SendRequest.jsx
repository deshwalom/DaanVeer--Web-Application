import "./payment.css";
import CheckoutSteps from "./CheckoutSteps";
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../ApiContext/AuthContext';
import {
  Paper, Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel, Button, MenuItem, Select, Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const SendRequest = () => {
  
  const navigate = useNavigate();
  const [donationType, setDonationType] = useState('any');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const { user, addDonation,updateUser } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await fetch(`http://localhost:3001/organizations`);
            const data = await response.json();
            setOrganizations(data);
        };
    
        fetchOrganizations();
      }, [user]);

  const handleRadioChange = (event) => {
    setDonationType(event.target.value);
    setSelectedOrganization("");
  };

  const handleOrgChange = (event) => {
    console.log("handle chng")
    console.log(event.target.value)
    setSelectedOrganization(event.target.value);
  };

  const handleUpdation = async () => {
    // setLoading(true);

    try {
    const response = await fetch(`http://localhost:3001/users/${user.id}`);
    const user1 = await response.json();
    console.log("user handle updation entered")
      var pendingRequests1 = user1.pendingRequests + 1;
    // Update the donation with new fields
  const updation = {pendingRequests: pendingRequests1};
    const updateUser1 = { ...user1, ...updation };

    console.log("updated USer===>")
    console.log(updateUser1)
    // Send the updated donation back to the server
    const updateResponse = await fetch(`http://localhost:3001/users/${user1.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateUser1)
    });

    if (updateResponse.ok) {
      updateUser(updateUser1)
      console.log("updated USer success")
        // Update the state to reflect the changes
        // setDonations(prevDonations =>
        //     prevDonations.map(donation => donation.id === donationId ? updatedDonation : donation)
        // );
        // window.location.reload()
        
    }
  }catch (error) {
    console.error('Error updating donation:', error);
  } 
};

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle form submission logic
    const storedDonation = localStorage.getItem('donation');
    if(storedDonation){
      console.log("storedDonation - " + storedDonation)
      try {
      let donation = JSON.parse(storedDonation);
      if(donationType === 'specific' && selectedOrganization === ""){
        alert("Please select organization.")
        return;
      }
      donation = {...donation, donationType,orgId: selectedOrganization,
        _id: uuidv4(),
        createdAt: new Date().toISOString(),
        donatorId: user._id,
        status: "pending",
      };
  
      
        const newDonation = await addDonation(donation);
        alert('Donation sent successfully.');
        console.log('Donation sent:', newDonation);
        handleUpdation();
        localStorage.removeItem('donation')
        navigate('/');

        return;
      } catch (err) {
        console.error('Donation error:', err);
        alert('Donation failed');
      }

    }else{
      console.log("stored nhi h")
      navigate('/donate')
  
    }

    console.log({
      donationType,
      selectedOrganization,
    });
  };

  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />
    <Paper elevation={3} style={{ padding: '20px', width:"50vw", margin:"20px auto", marginTop: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Donation Request
      </Typography>
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Send donation request to:</FormLabel>
        <RadioGroup
          aria-label="donationType"
          name="donationType"
          value={donationType}
          onChange={handleRadioChange}
          row
        >
          <FormControlLabel value="any" control={<Radio />} label="Any Organization" />
          <FormControlLabel value="specific" control={<Radio />} label="Specific Organization" />
        </RadioGroup>
      </FormControl>
      {donationType === 'specific' && (
        <FormControl variant="outlined" fullWidth margin="normal">
          <FormLabel component="legend">Select Organization</FormLabel>
          <Select
            value={selectedOrganization}
            onChange={handleOrgChange}
            label="Organization"
          >
            {organizations.map((org) => (
              <MenuItem key={org._id} value={org._id}>{org.organizationName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        onClick={handleSubmit}
      >
        Submit Donation Request
      </Button>
    </Paper>
    </Fragment>
  );
};

export default SendRequest;











// import React, { Fragment, useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import MetaData from "../layout/MetaData";
// import { Typography } from "@material-ui/core";
// import {useNavigate} from "react-router-dom"
// import { useAlert } from "react-alert";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import axios from "axios";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import EventIcon from "@mui/icons-material/Event";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import { createOrder, clearErrors } from "../../actions/orderAction";
// import Loader from "../layout/Loader/loader";
    
// const Payment = () => {
//   const navigate = useNavigate();
//     const dispatch = useDispatch();
//   const alert = useAlert();
//   const stripe = useStripe();
//   const elements = useElements();
//   // const [loading, setLoading] = useState(null)
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);
//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };
//   const order = {
//     shippingInfo,
//     orderItems: cartItems,//ye jo h na isme vhi saare order honge jo cart mein thy
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax,
//     shippingPrice: orderInfo.shippingCharges,
//     totalPrice: orderInfo.totalPrice,
//   };
//     const payBtn = useRef(null)
//     const [loading, setLoading] = useState(false)
 
// const submitHandler = async (e) => {
//   e.preventDefault();

//   payBtn.current.disabled = true;

//   try {
//     setLoading(true)
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
    
//     const { data } = await axios.post(
//       "/api/v1/payment/process",
//       paymentData,
//       config
//     );

//     const client_secret = data.client_secret;

//     if (!stripe || !elements) return;

//     const result = await stripe.confirmCardPayment(client_secret, {
//       payment_method: {
//         card: elements.getElement(CardNumberElement),
//         billing_details: {
//           name: user.name,
//           email: user.email,
//           address: {
//             line1: shippingInfo.address,
//             city: shippingInfo.city,
//             state: shippingInfo.state,
//             postal_code: shippingInfo.pinCode,
//             country: shippingInfo.country,
//           },
//         },
//       },
//     });

//     if (result.error) {
//       payBtn.current.disabled = false;
//       setLoading(false);
//       alert.error(result.error.message);
//     } else {
//       if (result.paymentIntent.status === "succeeded") {
//         order.paymentInfo = {
//           id: result.paymentIntent.id,
//           status: result.paymentIntent.status,
//         };

//         dispatch(createOrder(order));
//         navigate("/success", {replace:true})
//         // history.push("/success");
//       } else {
//         alert.error("There's some issue while processing payment ");
//       }
//     }
//   } catch (error) {
//     payBtn.current.disabled = false;
//     setLoading(false);
//     alert.error(error.response.data.message);
//   }
// };
//     useEffect(() => {
//       if (error) {
//         alert.error(error);
//         dispatch(clearErrors());
//       }
//     }, [dispatch, error, alert,loading]);
  
//   return (
//     <Fragment>
//       {loading?(<div><Loader/></div>):(
    
//     <Fragment>
//         <CheckoutSteps activeStep={2} />
//         <div className="paymentContainer">
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <img src="/payment_card.png" alt="payment" style={{width:"15%",margin:"auto"}}/>
//           <Typography>Payment Information</Typography>
//           <div >
//             <CreditCardIcon />
//             <CardNumberElement className="paymentInput" />
//           </div>
//           <div>
//             <EventIcon />
//             <CardExpiryElement className="paymentInput" />
//           </div>
//           <div>
//             <VpnKeyIcon />
//             <CardCvcElement className="paymentInput" />
//           </div>

//           <input
//             type="submit"
//             value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="paymentFormBtn"
//           />
//         </form>
//         </div>
//     </Fragment>
//     )}
//     </Fragment>
//   )
// }

// export default Payment