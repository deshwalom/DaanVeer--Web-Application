import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../ApiContext/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, TextField, Link } from '@mui/material';
const Login = () => {
    const { user, login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

  const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Proceed with login logic
            console.log('Form submitted:', { email, password });
            try {
                // Fetch users and organizations data from db.json
                const [usersResponse, orgsResponse] = await Promise.all([
                  fetch('http://localhost:3001/users'),
                  fetch('http://localhost:3001/organizations')
                ]);
                const [users, organizations] = await Promise.all([usersResponse.json(), orgsResponse.json()]);
          
                // Check if user exists in users array
                const user = users.find((user) => user.email === email && user.password === password);
                if (user) {
                  login(user);
                  navigate('/'); // Navigate to users route
                } else {
                  // Check if user exists in organizations array
                  const orgUser = organizations.find((org) => org.email === email && org.password === password);
                  if (orgUser) {
                    login(orgUser);
                    navigate('/'); // Navigate to organizations route
                  } else {
                    setError('Invalid email or password');
                  }
                }
              } catch (error) {
                console.error('Login error:', error);
                setError('Login failed');
              }
        }

    };


  
    useEffect(() => {
        // Redirect based on user role if already logged in
        if (user) {
            navigate('/');
        }
      }, [user, navigate]);



    return (

<Box sx={{
    height:"100%"
}}>
        <div className="loginbox">

            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '30vh',
                    padding: 4,
                    backgroundColor: '#f3f3f3',
                    width: {
                        lg: "250px",
                        md: "350px",
                        sm: "50vw",
                        xs: "80vw"
                    },
                    borderRadius: "8px",
                    border: "1px soild #b7dbdb",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    margin:"auto"
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{
                    fontSize: "1.7rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "700"
                }}>
                    Login
                </Typography>

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                >
                    Login
                </Button>
                {error && (
          <Typography variant="body2" color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
                <Link
                    onClick={() => navigate('/signup')}
                    sx={{
                        marginTop: "10px",
                        cursor: "pointer",
                    }}
                >
                    Create a new account
                </Link>
            </Box>


            {/* </div> */}
        </div>
        </Box>
    );
};

export default Login;
