import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (apiEndpoint,payload) => {
    try {
      const response = await fetch(`http://localhost:3001${apiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const newUser = await response.json();
        login(newUser);  // Log the user in after registration
        return newUser;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };
  const addDonation = async (payload) => {
    try {
      const response = await fetch(`http://localhost:3001/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const donation = await response.json();
        // login(newUser);  // Log the user in after registration
        return donation;
      } else {
        throw new Error('Donation failed');
      }
    } catch (error) {
      console.error('Error during donation submittion:', error);
      throw error;
    }
  };

  const updateUser = (payload) => {
    setUser(payload);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, register, addDonation,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
