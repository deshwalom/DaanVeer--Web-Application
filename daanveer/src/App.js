import logo from './logo.svg';
import './App.css';
import YourDonations from './Pages/YourDonations';
import {BrowserRouter as Router, Route , Routes} from "react-router-dom" 
import React, { Fragment} from "react"
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';

import AuthProvider from './ApiContext/AuthContext';
import Signup from './Pages/Signup';
import Donate from './components/Donate';
import Shipping from './components/Shipping';
import ConfirmOrder from './components/ConfirmOrder';
import Organizations from './Pages/Organizations';
import SendRequest from './components/SendRequest';
import YourRequests from './Pages/YourRequests';
import CommonRequests from './Pages/CommonRequests';
import OrgDonations from './Pages/OrgDonations';
import MyProfile from './Pages/MyProfile';
import HomePage from './Pages/HomePage';
import OrgProfile from './Pages/OrgProfile';

function App() {
  return (
    // <div className="App">
    //   <Home />
    // </div>
    <AuthProvider>
    <Router>
    <Navbar/>
      <Fragment>
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile" element={<MyProfile />} />
          <Route exact path="/donate" element={<Donate/>} />
          <Route exact path="/donate/shipping" element={<Shipping/>} />
          <Route exact path="/donate/confirm" element={<ConfirmOrder/>} />
          <Route exact path="/donate/send" element={<SendRequest/>} />
          <Route exact path="/donations" element={<YourDonations/>} />
          <Route exact path="/organizations" element={<Organizations/>} />
          <Route exact path="/requests" element={<YourRequests/>} />
          <Route exact path="/allrequests" element={<CommonRequests/>} />
          <Route exact path="/orgDonations" element={<OrgDonations/>} />
          <Route exact path="/orgProfile" element={<OrgProfile/>} />
          {/* <Route exact path="/nav" element={<Navbar/>} /> */}
      </Routes>
      </Fragment>
  </Router>
  </AuthProvider>
  );
}

export default App;
