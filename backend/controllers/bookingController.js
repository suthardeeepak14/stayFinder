import Booking from "../models/Booking.js";
import { sendBookingEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// CREATE BOOKING & SEND OTP
export const createBooking = async (req, res) => {
  try {
    const { property, checkIn, checkOut, totalPrice } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const newBooking = new Booking({
      user: req.user._id,
      property,
      checkIn,
      checkOut,
      totalPrice,
      otp: hashedOtp,
      otpExpires,
    });

    const savedBooking = await newBooking.save();

    await sendBookingEmail(
      req.user.email,
      "StayFinder Booking OTP",
      `Your booking OTP is: ${otp}`
    );

    res.status(201).json({
      message: "Booking created. OTP sent to your email.",
      bookingId: savedBooking._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CONFIRM OTP
export const confirmBookingOTP = async (req, res) => {
  try {
    const { bookingId, otp } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "confirmed")
      return res.status(400).json({ message: "Booking already confirmed" });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (
      booking.otp !== hashedOtp ||
      !booking.otpExpires ||
      new Date() > new Date(booking.otpExpires)
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    booking.status = "confirmed";
    booking.otp = undefined;
    booking.otpExpires = undefined;

    await booking.save();

    res.json({
      message: "Booking confirmed!",
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const cancelMyBooking = async (req, res) => {
  const { bookingId, reason } = req.body;

  const booking = await Booking.findById(bookingId);

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  booking.status = "cancelled";
  booking.cancelledAt = new Date();
  if (reason) booking.cancellationReason = reason;
  await booking.save();

  res.json({ message: "Booking cancelled successfully" });
};

// GET BOOKINGS BY USER
export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate(
    "property"
  );
  res.json(bookings);
};

// GET BOOKINGS BY PROPERTY OWNER
export const getOwnerBookings = async (req, res) => {
  const allBookings = await Booking.find().populate("property");
  const ownerBookings = allBookings.filter(
    (b) => b.property?.owner?.toString() === req.user._id.toString()
  );
  res.json(ownerBookings);
};

// UPDATE BOOKING STATUS (for property owners)
export const updateBookingStatus = async (req, res) => {
  const { bookingId, status } = req.body;

  const booking = await Booking.findById(bookingId).populate("property");

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  if (booking.property.owner.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the listing owner can update this booking" });
  }

  const newStatus = status.toLowerCase();
  if (!["confirmed", "cancelled"].includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  booking.status = newStatus;
  await booking.save();

  res.json({ message: `Booking marked as ${status}` });
};
