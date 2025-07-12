import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    const imageUrl = req.file?.path;

    const property = new Property({
      ...req.body,
      imageUrl,
      owner: req.user._id,
    });

    const saved = await property.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProperties = async (req, res) => {
  const {
    location,
    minPrice,
    maxPrice,
    minRating,
    page = 1,
    limit = 6,
  } = req.query;

  const filter = {};

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minRating) {
    filter.averageRating = { $gte: Number(minRating) };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const total = await Property.countDocuments(filter);
  const properties = await Property.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    properties,
  });
};

export const getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Not found" });
  res.json(property);
};

export const updateProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Not found" });

  if (property.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  Object.assign(property, req.body);
  const updated = await property.save();
  res.json(updated);
};

export const deleteProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: "Not found" });

  if (property.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await property.remove();
  res.json({ message: "Property deleted" });
};

export const getMyListings = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const total = await Property.countDocuments({ owner: req.user._id });
  const listings = await Property.find({ owner: req.user._id })
    .skip(skip)
    .limit(Number(limit));

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    listings,
  });
};
