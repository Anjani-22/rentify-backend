const express = require("express");

const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  likeProperty,
} = require("./../controllers/propertyController");
const protect = require("./../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").get(getProperties).post(protect, createProperty);
router.route("/seller").get(protect, getPropertyById);
router
  .route("/:id")
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

router.post("/:id/like", protect, likeProperty);

module.exports = router;
