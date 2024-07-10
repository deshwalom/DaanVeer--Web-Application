const Organization = require('../models/orgModel'); // Adjust the path to your model

// Create a new organization
exports.createOrg = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json({ message: 'Organization created successfully', organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const organization = await Organization.findOne({ email, password });
    if (!organization) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  // Implementation of logout depends on how you handle authentication (e.g., JWT, session, etc.)
  res.status(200).json({ message: 'Logout successful' });
};

// Update organization details
exports.updateOrg = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByIdAndUpdate(id, req.body, { new: true });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization updated successfully', organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get details of the logged-in organization
exports.getOwnOrgDetails = async (req, res) => {
  try {
    const { id } = req.params; // Adjust according to how you handle user identification
    const organization = await Organization.findById(id);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all organizations
exports.getAllOrgs = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete organization account
exports.deleteOrgAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await Organization.findByIdAndDelete(id);
    res.status(200).json({ message: 'Organization account deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all volunteer users
exports.getAllVolunteerUsers = async (req, res) => {
  // Assuming you have a Volunteer model and volunteers are related to organizations
  try {
    const volunteers = await Volunteer.find({ organizationId: req.params.id });
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
