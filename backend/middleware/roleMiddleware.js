export const requireHost = (req, res, next) => {
  if (req.user.role !== "host") {
    return res
      .status(403)
      .json({ message: "Only hosts can perform this action" });
  }
  next();
};
