const { isValidUrl } = require("../utils");

const validateLink = (req, res, next) => {
  const { link } = req.body;

  if (!isValidUrl(link)) {
    return res.status(400).json({ error: "Invalid link" });
  }
  next();
};

module.exports = validateLink;
