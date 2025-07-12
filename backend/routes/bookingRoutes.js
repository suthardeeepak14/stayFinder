import express from "express";
import {
  createBooking,
  getUserBookings,
  getOwnerBookings,
  confirmBookingOTP,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.post("/verify", protect, confirmBookingOTP);
router.post("/cancel", protect, cancelMyBooking);
router.put("/status", protect, updateBookingStatus);
router.get("/user", protect, getUserBookings);
router.get("/owner", protect, getOwnerBookings);

export default router;
