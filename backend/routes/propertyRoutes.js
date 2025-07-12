import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyListings,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { requireHost } from "../middleware/roleMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProperties)
  .post(protect, upload.single("image"), createProperty);

router.get("/my-listings", protect, requireHost, getMyListings);

router
  .route("/:id")
  .get(getPropertyById)
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

export default router;
