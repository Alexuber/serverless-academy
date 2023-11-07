const { compareIp } = require("../sevices/user-service");
const ctrlWrapper = require("../utils/ctrlWrapper");

const detectIp = async (req, res, next) => {
  const userIP = req.headers["x-forwarded-for"];

  try {
    const result = await compareIp(userIP);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  detectIp: ctrlWrapper(detectIp),
};
