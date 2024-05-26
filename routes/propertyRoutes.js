const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPropertiesBySeller,
  updateProperty,
  deleteProperty,
  likeProperty,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllProperties).post(protect, createProperty);
router.route("/seller").get(protect, getPropertiesBySeller);
router
  .route("/:id")
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

router.post("/:id/like", protect, likeProperty);

module.exports = router;
