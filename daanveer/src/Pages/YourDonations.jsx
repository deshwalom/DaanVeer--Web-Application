import React, { Fragment, useContext, useEffect, useState } from 'react';

import { AuthContext } from '../ApiContext/AuthContext';

import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Avatar, Paper, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const YourDonations = () => {
    const donations1 = [
        {
            _id: "13123141",
          itemName: "Books",
          itemImages: [
            {
              public_id: "image1",
              url: "https://example.com/images/book1.jpg"
            },
            {
              public_id: "image2",
              url: "https://example.com/images/book2.jpg"
            }
          ],
          quantity: 10,
          donationStatus: "Pending",
          donatorId: "donator1",
          orgId: "org1",
          categoryOfItem: "Education",
          descriptionOfDonation: "A collection of educational books for children.",
          coordinates: "40.712776, -74.005974",
          deliveryMode: "Pick-up"
        },
        {
            _id: "131211231x3141",
          itemName: "Clothes",
          itemImages: [
            {
              public_id: "image3",
              url: "https://example.com/images/clothes1.jpg"
            }
          ],
          quantity: 20,
          donationStatus: "Pending",
          donatorId: "donator2",
          orgId: "org2",
          categoryOfItem: "Apparel",
          descriptionOfDonation: "Various sizes and types of clothes for all ages.",
          coordinates: "34.052235, -118.243683",
          deliveryMode: "Delivery"
        },
        {
            _id: "13qeqrwg123141",
          itemName: "Toys",
          itemImages: [
            {
              public_id: "image4",
              url: "https://example.com/images/toys1.jpg"
            },
            {
              public_id: "image5",
              url: "https://example.com/images/toys2.jpg"
            }
          ],
          quantity: 15,
          donationStatus: "Pending",
          donatorId: "donator3",
          orgId: "org3",
          categoryOfItem: "Children",
          descriptionOfDonation: "Assorted toys for kids of different age groups.",
          coordinates: "51.507351, -0.127758",
          deliveryMode: "Pick-up"
        },
        {
            _id: "13ahfkjahfj123141",
          itemName: "Furniture",
          itemImages: [
            {
              public_id: "image6",
              url: "https://example.com/images/furniture1.jpg"
            }
          ],
          quantity: 5,
          donationStatus: "Pending",
          donatorId: "donator4",
          orgId: "org4",
          categoryOfItem: "Household",
          descriptionOfDonation: "Gently used furniture including chairs and tables.",
          coordinates: "48.856613, 2.352222",
          deliveryMode: "Delivery"
        },
        {_id: "1afalskfj3123141",
          itemName: "Electronics",
          itemImages: [
            {
              public_id: "image7",
              url: "https://example.com/images/electronics1.jpg"
            }
          ],
          quantity: 8,
          donationStatus: "Pending",
          donatorId: "donator5",
          orgId: "org5",
          categoryOfItem: "Technology",
          descriptionOfDonation: "Various electronic devices including phones and laptops.",
          coordinates: "35.689487, 139.691711",
          deliveryMode: "Pick-up"
        }
      ];

      const { user } = useContext(AuthContext);
      const [donations, setDonations] = useState([]);
      useEffect(() => {
        const fetchDonations = async () => {
          if (user) {
            const response = await fetch(`http://localhost:3001/donations?donatorId=${user._id}`);
            const data = await response.json();
            setDonations(data);
          }
        };
    
        fetchDonations();
      }, [user]);
    
      if (!user) {
        return <p>Please log in to see your donations.</p>;
      }
      const handleDelete = (donationID) => {
        fetch(`http://localhost:3001/donations/${donationID}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            // Remove the deleted item from the state
            
            setDonations(donations.filter(donation => donation.id !== donationID));
            alert("Deleted Successfully.")
          } else {
            console.error('Failed to delete donation');
          }
        })
        .catch(error => console.error('Error:', error));
      };
    
    const columns = [
        { field: "id", headerName: "Donation ID", minWidth: 150, flex: 1 },
        {
          field: "itemName",
          headerName: "Name",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName:"greenColor"
          // cellClassName: (params) => {
          //   return params.value === "pending"
          //     ? "greenColor"
          //     : "redColor";
          // },
        },
        
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.6,
        },
    
        // {
        //   field: "amount",
        //   headerName: "Amount",
        //   type: "number",
        //   minWidth: 270,
        //   flex: 0.5,
        // },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
        //   valueGetter: (params) => params.row.id,//ye use hota h value ko lene k liye from other columns return -> string only

          renderCell: (params) => {
            return (
              <Link  onClick={()=>handleDelete(params.id)}>
              {/* <Link to={`/order/${params.getValue(params.id, "id")}`}> */}
                <DeleteForeverIcon />
              </Link>
            );
          },
        },
      ];
      const rows = [];
    
      donations &&
      donations.forEach((item, index) => {
        rows.push({
          itemsQty: item.quantity,
          itemName: item.itemName,
          id: item.id,
          status: item.status.toUpperCase(),
          // amount: item.quantity*100,
        });
      });



    //   useEffect(()=>{
    //     let res = async () => {
    //         for (const item of donations) {
    //             await rows.push({
    //                 itemsQty: item.quantity,
    //                 id: item._id,
    //                 status: item.donationStatus,
    //                 amount: item.quantity * 100,
    //             });
    //         }
    //     };
    //     res();
    //   })
    // let res = async () => {
    //     for (const item of donations) {
    //         await rows.push({
    //             itemsQty: item.quantity,
    //             id: item._id,
    //             status: item.donationStatus,
    //             amount: item.quantity * 100,
    //         });
    //     }
    // };






  return (
    <Fragment>
      <span style={{    marginLeft: "60px"}}>*Organization may contact with you for pickup the donation.</span>
      {rows && rows.length > 0 ?
      <div 
      style={{ marginTop: "170px", width: '100%' }}
      className="myOrdersPage"
      >
      
      <DataGrid rows={rows} columns={columns} autoHeight pageSize={6} disableSelectionOnClick className="myOrdersTable" 
    //   checkboxSelection ->is for check box
        // rowsPerPageOptions={[5]} ->pta nhi kya h
      />
      <Typography id="myOrdersHeading">Yout Donations</Typography>
    </div>
      
       : ""}
    
    </Fragment>
  )
}

export default YourDonations