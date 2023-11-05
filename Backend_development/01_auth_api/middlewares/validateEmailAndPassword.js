const { isValidEmail, isValidPassword } = require("../utils");

async function validateEmailAndPassword(req, res, next) {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({ error: "Invalid password" });
  }
  next();
}
module.exports = validateEmailAndPassword;
