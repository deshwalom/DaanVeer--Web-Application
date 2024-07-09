const express = require('express');
const router = express.Router();
const donationController = require('../controller/donationController'); // Adjust the path as needed

// Create a new donation
router.post('/createDonation', donationController.createDonation);

// Delete a donation
router.delete('/deleteDonation', donationController.deleteDonation);

// Get details of a specific donation
router.get('/getDonationDetails', donationController.getDonationDetails);

// Get all donations
router.get('/getAllDonations', donationController.getAllDonations);

// Get all donations of a specific user
router.get('/getOwnAllDonations', donationController.getOwnAllDonations);

// Update donation by organization
router.put('/updateDonationByOrg', donationController.updateDonationByOrg);

module.exports = router;
