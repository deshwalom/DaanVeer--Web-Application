import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../ApiContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Link
} from '@mui/material';
import { Select, MenuItem, InputLabel, Checkbox, Grid } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

const Signup = () => {
  const { user, register } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    // Default USER fields
    name: '',
    email: '',
    password: '',
    gender: 'male',
    age: '',
    mobile: '',
    address: '',
    district: '',
    isVolunteer: false,
    role: 'USER',
    image: '',

    // ORGANIZATION fields
    organizationName: '',
    founderName: '',
    // email: '',
    // password: '',
    contactNo: '',
    locationOfOrg: '',
    temporaryOrRegistered: 'Temporary',
    temporaryDetails: {
      adhaarNo: ''
    },
    registeredDetails: {
      organizationRegNo: ''
    }
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [userType, setUserType] = useState('USER');
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submittion Starts")
    // Determine API endpoint based on userType
    let apiEndpoint = '';
    let payload = {};

    if (userType === 'USER') {
      apiEndpoint = '/users';
      payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: formData.age,
        image: image[0],
        mobile: formData.mobile,
        address: formData.address,
        district: formData.district,
        isVolunteer: formData.isVolunteer,
        role: 'USER',
        _id: uuidv4(),
        createdAt: new Date().toISOString(),
        resetPasswordToken: null,
        resetPasswordExpire: null,
        pendingRequests: 0,
        completedRequests: 0,
      };
    } else if (userType === 'ORGANIZATION') {
      apiEndpoint = '/organizations';
      payload = {
        
        organizationName: formData.organizationName,
        email: formData.email,
        password: formData.password,
        founderName: formData.founderName,
        contactNo: formData.contactNo,
        locationOfOrg: formData.locationOfOrg,
        temporaryOrRegistered: formData.temporaryOrRegistered,
        temporaryDetails: {
          adhaarNo: formData.temporaryDetails.adhaarNo,
          adhaarImages: formData.temporaryDetails.adhaarImages,
          declarationOfHonesty: formData.temporaryDetails.declarationOfHonesty
        },
        registeredDetails: {
          organizationRegNo: formData.registeredDetails.organizationRegNo,
          uploadImageOfCertificate: formData.registeredDetails.uploadImageOfCertificate,
          describeYourOrganization: formData.registeredDetails.describeYourOrganization
        },
        role: 'ORGANIZATION',
        _id: uuidv4(),
        createdAt: new Date().toISOString(),
        resetPasswordToken: null,
        resetPasswordExpire: null,
        pendingRequests: 0,
        completedRequests: 0,
      };
    }
    console.log(apiEndpoint)
    console.log(payload)
    try {
      const registeredUser = await register(apiEndpoint,payload);
      alert('Registration successful');
      console.log('Registered user:', registeredUser);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed');
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: type === 'checkbox' ? checked : value
  //   });
  // };

  // const handleSignup = async (event) => {
  //   event.preventDefault();
  //   let valid = true;
  //   const newErrors = {};

  //   // Validate fields
  //   Object.keys(formValues).forEach((key) => {
  //     if (!formValues[key] && key !== 'isVolunteer') {
  //       newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
  //       valid = false;
  //     }
  //   });

  //   setErrors(newErrors);

  //   if (valid) {
  //     const newUser = {
  //       _id: uuidv4(),
        // createdAt: new Date().toISOString(),
        // resetPasswordToken: null,
        // resetPasswordExpire: null,
        // pendingRequests: 0,
        // completedRequests: 0,
  //       ...formValues
  //     };

      // try {
      //   const registeredUser = await register(newUser);
      //   alert('Registration successful');
      //   console.log('Registered user:', registeredUser);
      //   navigate('/');
      // } catch (err) {
      //   console.error('Registration error:', err);
      //   alert('Registration failed');
      // }
  //   }
  // };

  useEffect(() => {
    // Redirect based on user role if already logged in
    if (user) {
        navigate('/');
    }
  }, [user, navigate]);
  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [name]: value
      }
    });
  };
  const [image, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
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
  return (
    <div>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '30vh',
          padding: 4,
          backgroundColor: '#f3f3f3',
          width: {
            lg: '500px',
            md: '450px',
            sm: '50vw',
            xs: '80vw'
          },
          borderRadius: '8px',
          border: '1px solid #b7dbdb',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin:"auto"
        }}
      >
        <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontSize: '1.7rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700'
              }}
            >
              Sign Up
            </Typography>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">User Type</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={userType}
            onChange={handleUserTypeChange}
            row
          >
            <FormControlLabel value="USER" control={<Radio />} label="USER" />
            <FormControlLabel value="ORGANIZATION" control={<Radio />} label="ORGANIZATION" />
          </RadioGroup>
        </FormControl>

        {/* Conditional rendering based on userType */}
        {userType === 'USER' && (
          <>

            

            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <TextField
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
              required
            />
            <TextField
              label="Mobile"
              name="mobile"
              type="tel"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              required
            />
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              required
            />
            <TextField
              label="District"
              name="district"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.district}
              onChange={handleChange}
              error={!!errors.district}
              helperText={errors.district}
              required
            />
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Volunteer</FormLabel>
              <RadioGroup
                aria-label="isVolunteer"
                name="isVolunteer"
                value={formData.isVolunteer ? 'true' : 'false'}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            required
                        />
                    </div>

                    <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>
          </>
        )}

        {userType === 'ORGANIZATION' && (
          <>
            <TextField
              label="Organization Name"
              name="organizationName"

              variant="outlined"
              value={formData.organizationName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />


            <TextField
              label="Founder Name"
              name="founderName"
              variant="outlined"
              value={formData.founderName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Create Password"
              name="password"
              type='password'
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Contact No"
              name="contactNo"
              variant="outlined"
              value={formData.contactNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Location of Organization"
              name="locationOfOrg"
              variant="outlined"
              value={formData.locationOfOrg}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth>
              <InputLabel>Temporary or Registered</InputLabel>
              <Select
                name="temporaryOrRegistered"
                value={formData.temporaryOrRegistered}
                onChange={handleChange}
                fullWidth
                required

                variant="outlined"
                margin="normal"
              >
                <MenuItem value="Temporary">Temporary</MenuItem>
                <MenuItem value="Registered">Registered</MenuItem>
              </Select>
            </FormControl>
            {formData.temporaryOrRegistered === 'Temporary' && (
              <>

                <TextField
                  label="Founder Adhaar No"
                  name="adhaarNo"
                  value={formData.temporaryDetails.adhaarNo}
                  onChange={(e) => handleNestedChange(e, 'temporaryDetails')}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                />
                {/* Add fields for adhaarImages and declarationOfHonesty */}
              </>
            )}

            {formData.temporaryOrRegistered === 'Registered' && (
              <>
                <TextField
                  label="Organization Reg No"
                  name="organizationRegNo"
                  value={formData.registeredDetails.organizationRegNo}
                  onChange={(e) => handleNestedChange(e, 'registeredDetails')}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                />
                {/* Add fields for uploadImageOfCertificate and describeYourOrganization */}
              </>
            )}







          </>
        )}

        <Button
          type="submit"
          // onClick={}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Sign Up
        </Button>
        <Link
          onClick={() => navigate('/login')}
          sx={{
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          Already have an account? Log in
        </Link>

      </Box>



    </div>
  );






  // return (
  //   <div className="signupbox">
  // <Box
  //   component="form"
  //   onSubmit={handleSignup}
  //   sx={{
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     minHeight: '30vh',
  //     padding: 4,
  //     backgroundColor: '#dddddd',
  //     width: {
  //       lg: '500px',
  //       md: '450px',
  //       sm: '50vw',
  //       xs: '80vw'
  //     },
  //     borderRadius: '8px',
  //     border: '1px solid #b7dbdb',
  //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  //   }}
  // >
  //   <Typography
  //     variant="h4"
  //     component="h1"
  //     gutterBottom
  //     sx={{
  //       fontSize: '1.7rem',
  //       fontFamily: 'Inter, sans-serif',
  //       fontWeight: '700'
  //     }}
  //   >
  //     Sign Up
  //   </Typography>

  //   <TextField
  //     label="Name"
  //     name="name"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.name}
  //     onChange={handleChange}
  //     error={!!errors.name}
  //     helperText={errors.name}
  //   />
  //   <TextField
  //     label="Email"
  //     name="email"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.email}
  //     onChange={handleChange}
  //     error={!!errors.email}
  //     helperText={errors.email}
  //   />
  //   <TextField
  //     label="Password"
  //     name="password"
  //     type="password"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.password}
  //     onChange={handleChange}
  //     error={!!errors.password}
  //     helperText={errors.password}
  //   />
  //   <FormControl component="fieldset" margin="normal">
  //     <FormLabel component="legend">Gender</FormLabel>
  //     <RadioGroup
  //       aria-label="gender"
  //       name="gender"
  //       value={formValues.gender}
  //       onChange={handleChange}
  //       row
  //     >
  //       <FormControlLabel value="male" control={<Radio />} label="Male" />
  //       <FormControlLabel value="female" control={<Radio />} label="Female" />
  //       <FormControlLabel value="other" control={<Radio />} label="Other" />
  //     </RadioGroup>
  //   </FormControl>
  //   <TextField
  //     label="Age"
  //     name="age"
  //     type="number"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.age}
  //     onChange={handleChange}
  //     error={!!errors.age}
  //     helperText={errors.age}
  //   />
  //   <TextField
  //     label="Mobile"
  //     name="mobile"
  //     type="tel"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.mobile}
  //     onChange={handleChange}
  //     error={!!errors.mobile}
  //     helperText={errors.mobile}
  //   />
  //   <TextField
  //     label="Address"
  //     name="address"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.address}
  //     onChange={handleChange}
  //     error={!!errors.address}
  //     helperText={errors.address}
  //   />
  //   <TextField
  //     label="District"
  //     name="district"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={formValues.district}
  //     onChange={handleChange}
  //     error={!!errors.district}
  //     helperText={errors.district}
  //   />
  //   <FormControl component="fieldset" margin="normal">
  //     <FormLabel component="legend">Volunteer</FormLabel>
  //     <RadioGroup
  //       aria-label="isVolunteer"
  //       name="isVolunteer"
  //       value={formValues.isVolunteer ? 'true' : 'false'}
  //       onChange={handleChange}
  //       row
  //     >
  //       <FormControlLabel value="true" control={<Radio />} label="Yes" />
  //       <FormControlLabel value="false" control={<Radio />} label="No" />
  //     </RadioGroup>
  //   </FormControl>
  //   <FormControl component="fieldset" margin="normal">
  //     <FormLabel component="legend">Role</FormLabel>
  //     <RadioGroup
  //       aria-label="role"
  //       name="role"
  //       value={formValues.role}
  //       onChange={handleChange}
  //       row
  //     >
  //       <FormControlLabel value="USER" control={<Radio />} label="User" />
  //       <FormControlLabel value="ORG" control={<Radio />} label="Organization" />
  //     </RadioGroup>
  //   </FormControl>
  //   <Button
  //     type="submit"
  //     variant="contained"
  //     color="primary"
  //     fullWidth
  //     sx={{ mt: 2, mb: 2 }}
  //   >
  //     Sign Up
  //   </Button>
  //   <Link
  //     onClick={() => navigate('/login')}
  //     sx={{
  //       marginTop: '10px',
  //       cursor: 'pointer'
  //     }}
  //   >
  //     Already have an account? Log in
  //   </Link>
  // </Box>
  //   </div>
  // );
};

export default Signup;
