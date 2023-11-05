const jwt = require("jsonwebtoken");
const { ACCES_SECRET_KEY } = process.env;
const { REFRESH_SECRET_KEY } = process.env;
const { ACCES_SECRET_KEY_EXPIRES_SEC } = process.env;

function generateTokens(userId, email) {
  const accessToken = jwt.sign({ userId, email }, ACCES_SECRET_KEY, {
    expiresIn: Number(ACCES_SECRET_KEY_EXPIRES_SEC),
  });

  const refreshToken = jwt.sign({ userId, email }, REFRESH_SECRET_KEY);

  return { accessToken, refreshToken };
}

module.exports = generateTokens;
