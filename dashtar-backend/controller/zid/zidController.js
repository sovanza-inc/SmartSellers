// File: zidController.js

const Zid = require('../../models/zid/info'); // Adjust the path as necessary

// Fetch all Zid records
exports.getAllZids = async (req, res) => {
  try {
    const zids = await Zid.find();
    res.status(200).json(zids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save Zid record details
exports.createZid = async (req, res) => {
  const zid = new Zid(req.body);
  console.log(req.body);
  try {
    const newZid = await zid.save();
    res.status(201).json(newZid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get details of a particular Zid record
exports.getZidByStore = async (req, res) => {
  try {
    const zids = await Zid.find({ adminId: req.params.adminId });
    if (zids.length === 0) {
      return res.status(404).json({ message: 'No Zid records found for this store' });
    }
    res.json(zids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Zid record details
exports.updateZid = async (req, res) => {
  try {
    const updatedZid = await Zid.findOneAndUpdate(
      { _id: req.params.id }, // Use the Zid's ID as the filter
      req.body, // These are the updates
      { new: true } // This option returns the document after update
    );

    if (!updatedZid) {
      return res.status(404).json({ message: 'Zid not found' });
    }

    res.json(updatedZid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Zid record
exports.deleteZid = async (req, res) => {
  try {
    const deletedZid = await Zid.findByIdAndDelete(req.params.id);
    if (!deletedZid) {
      return res.status(404).json({ message: 'Zid not found' });
    }
    res.json({ message: 'Zid deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
