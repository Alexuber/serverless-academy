const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");

const { ACCES_SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Token not provided" });
  }

  jwt.verify(token, ACCES_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    req.user = decoded;

    next();
  });
};

module.exports = authenticate;
