import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

export const addReview = async (req, res) => {
  const { propertyId, rating, comment } = req.body;

  const booking = await Booking.findOne({
    user: req.user._id,
    property: propertyId,
    status: "confirmed",
  });

  if (!booking) {
    return res
      .status(403)
      .json({ message: "You must have booked this property to review" });
  }

  const alreadyReviewed = await Review.findOne({
    property: propertyId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ message: "You already reviewed this property" });
  }

  const review = await Review.create({
    property: propertyId,
    user: req.user._id,
    rating,
    comment,
  });

  // Update property's average rating
  const reviews = await Review.find({ property: propertyId });
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Property.findByIdAndUpdate(propertyId, {
    averageRating: averageRating.toFixed(1),
    numReviews: reviews.length,
  });

  res.status(201).json({ message: "Review added", review });
};
