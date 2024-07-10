const express = require('express');
const router = express.Router();
const orgController = require('../controller/orgController'); // Adjust the path as needed

// Create a new organization
router.post('/createOrg', orgController.createOrg);

// Login
router.post('/login', orgController.login);

// Logout
router.post('/logout', orgController.logout);

// Update organization details
router.put('/updateOrg', orgController.updateOrg);

// Get details of the logged-in organization
router.get('/getOwnOrgDetails', orgController.getOwnOrgDetails);

// Get all organizations
router.get('/getAllOrgs', orgController.getAllOrgs);

// Delete organization account
router.delete('/deleteOrgAccount', orgController.deleteOrgAccount);

// Get all volunteer users
router.get('/getAllVolunteerUsers', orgController.getAllVolunteerUsers);

module.exports = router;
