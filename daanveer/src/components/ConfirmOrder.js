import React, { Fragment, useEffect, useState,useContext } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { Link,useNavigate } from 'react-router-dom'
import PinDropIcon from "@mui/icons-material/PinDrop";
import "./confirmOrder.css"
import { AuthContext } from '../ApiContext/AuthContext';


const ConfirmOrder = () => {
    
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    let donation = JSON.parse(localStorage.getItem('donation')); 
    
    const shippingCharges = 110 > 1000 ? 0 : 200;

    const tax = 110 * 0.18;

    const totalPrice = 110 + tax + shippingCharges;
    const deleteCartItems = () =>{
        //code to delete the localStorage('donation)
        localStorage.removeItem('donation');
        navigate('/')
      }
    const placeOrderHandler = () =>{
        console.log("Placed Donations")
        navigate('/donate/send')
        // const data = {
        //     subtotal,
        //     shippingCharges,
        //     tax,
        //     totalPrice,
        //   };
      
        //   sessionStorage.setItem("orderInfo", JSON.stringify(data));

        // navigate("/process/payment" )
        // navigate(0)
      }
    // useEffect(() => {
    //     if(cartItems.length === 0){
    //         navigate('/cart')
    //     }
    //     setSubtotal(cartItems.reduce(
    //         (acc, item) => acc + item.quantity * item.price,
    //         0
    //       ))
    // }, [cartItems,navigate])
    
    return (
        user ? (
          <Fragment>
            <CheckoutSteps activeStep={1} />
            <div className="ConfirmContainer">
              <div className="productShippingDetailsBox">
                <div className="shippingDetailsBox">
                  <div className="customerBox">
                    <div>
                      <p className='title'>Your Information</p>
                      
                    </div>
                    <p className='normalText'>{user.name}</p>
                    <span className='normalText'>Mobile: {donation.phoneNo}</span>
                    <span className='normalText'>Email: {user.email}</span>
                  </div>
                  <div className="addressBox">
                    <div>
                      <p className='title'>Shipping Address</p>
                      <Link to="/donate/shipping" className='editBtn' >Edit</Link>
                    </div>
                    <p className='normalText'>{user.name}</p>
                    <div className="pinCode">
                      <p className='normalText'><PinDropIcon /> {donation.pinCode}</p>
                    </div>
                    <span className='normalText'>{donation.address}</span>
                    <span className='normalText'>{donation.city}, {donation.state} ({donation.country})</span>
                  </div>
                </div>
                <div className="productDetailsBox">
                  <div className="productBox">
                    <div>
                      <img src={donation.images[0]} alt="img" />
                    </div>
                    <div>
                      <p>{donation.itemName}</p>
                      <span className='normalText'>Description: {donation.description}</span>
                      <button onClick={deleteCartItems}>Cancel the donation</button>
                    </div>
                    <div>
                      {/* <p>THANKS</p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="paymentDetailsBox">
                <div>
                  <p>Basic Details</p>
                </div>
                <div>
                  <p>Quantity</p>
                  <p>{donation.quantity}</p>
                </div>
                <div>
                  <p>Category</p>
                  <p>{donation.category}</p>
                </div>
                
                <div className='totalAmountDiv'>
                  <p>Confirm Your Donation Here</p>
                </div>
                <button onClick={placeOrderHandler}>Place Donation</button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div>Please login</div>
        )
      );
    }
    
    export default ConfirmOrder;