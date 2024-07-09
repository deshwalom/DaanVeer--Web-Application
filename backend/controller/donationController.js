const Donation = require('../models/donationModel'); // Make sure to adjust the path to your model

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: 'Donation created successfully', donation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a donation
exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    await Donation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get details of a specific donation
exports.getDonationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all donations of a specific user
exports.getOwnAllDonations = async (req, res) => {
  try {
    const { donatorId } = req.params;
    const donations = await Donation.find({ donatorId });
    res.status(200).json(donations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update donation by organization
exports.updateDonationByOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findByIdAndUpdate(id, req.body, { new: true });
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json({ message: 'Donation updated successfully', donation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
