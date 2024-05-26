const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPropertiesBySeller,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllProperties).post(protect, createProperty);
router.route("/seller").get(protect, getPropertiesBySeller);
router
  .route("/:id")
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

router.post("/:id/like", protect, async (req, res) => {
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
});

module.exports = router;
