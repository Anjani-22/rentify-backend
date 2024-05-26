const Property = require("../models/Property");

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
    } = req.body;

    const property = new Property({
      title,
      description,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
      user: req.user.id,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get a property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const {
      title,
      description,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges,
    } = req.body;

    property.title = title || property.title;
    property.description = description || property.description;
    property.place = place || property.place;
    property.area = area || property.area;
    property.bedrooms = bedrooms || property.bedrooms;
    property.bathrooms = bathrooms || property.bathrooms;
    property.nearbyHospitals = nearbyHospitals || property.nearbyHospitals;
    property.nearbyColleges = nearbyColleges || property.nearbyColleges;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await property.remove();
    res.json({ message: "Property removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Like a property
// @route   POST /api/properties/:id/like
// @access  Private
const likeProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.likes += 1;
    await property.save();

    res.json({ message: "Property liked", likes: property.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  likeProperty,
};
