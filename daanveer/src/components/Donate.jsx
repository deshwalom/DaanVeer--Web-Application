import React, { Fragment, useContext, useEffect, useState } from "react";
import './donate.css'
import { Box, Button, Typography, TextField, Link } from '@mui/material';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ApiContext/AuthContext";

const Donate = () => {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    const categories = [
        "Cereals",
        "Shoes",
        "Clothes",
        "Books",
        "Food",
        "Electronics",
    ];
    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Clicked")
        setLoading(true);
        if (images.length < 1) {
            // alert.error("Please Add Atleast On Product Image ")
            alert("Please Add Atleast On Product Image");
            setLoading(false);
            return;
        }

        const myForm = new FormData();
        const donation = {
            itemName, description, category, quantity
        };

        // Initialize an array to store images
        const imageArray = [];

        // Add images to the array
        images.forEach((image) => {
            imageArray.push(image);
        });

        // Add the images array to the donation object
        donation.images = imageArray;
        donation.donatorName = user.name;
        
  // Store the updated JS object back in localStorage
  localStorage.setItem('donation', JSON.stringify(donation));

        navigate('/donate/shipping')

//   // Retrieve the JS object from localStorage
// const storedFormObject = localStorage.getItem('myForm');

// if (storedFormObject) {
//   const parsedFormObject = JSON.parse(storedFormObject);
//   console.log(parsedFormObject);

        // setLoading(false);
        // console.log(myForm.get("itemName"));
        // dispatch(createProduct(myForm));
    };
    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    const {user} = useContext(AuthContext);
    useEffect(() => {
        // Redirect based on user role if already logged in
        if (!user) {
            navigate('/login');
        }
      }, [user, navigate]);
    return (
        <Fragment>
            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                >
                    <h1>Donate Item</h1>

                    <div>
                        <SpellcheckIcon />
                        <input
                            type="text"
                            placeholder="Item Name"
                            required
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>


                    <div>
                        <DescriptionIcon />

                        <textarea
                            placeholder="Item Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            cols="30"
                            rows="1"
                        ></textarea>
                    </div>

                    <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate) => (
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <StorageIcon />
                        <input
                            type="number"
                            placeholder="Quantity"
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            multiple
                        />
                    </div>

                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false}
                        sx={{
                            fontSize: "1rem",
                            fontFamily: "Poppins"
                        }}
                    >
                        Donate
                    </Button>
                </form>
            </div>
        </Fragment>
    )
}

export default Donate