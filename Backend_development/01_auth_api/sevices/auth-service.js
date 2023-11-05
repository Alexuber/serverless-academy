const client = require("../db");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../utils");

async function signUp(data) {
  const { email, password } = data;

  const checkUserQuery = "SELECT * FROM users WHERE email = $1";
  const checkUserValues = [email];

  try {
    const existingUser = await client.query(checkUserQuery, checkUserValues);

    if (existingUser.rows.length > 0) {
      return {
        success: false,
        error: `Email ${email} is taken already`,
      };
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
      const values = [email, hashPassword];

      const result = await client.query(query, values);
      const user = result.rows[0];
      const id = user.id;

      const { accessToken, refreshToken } = generateTokens(id, user.email);

      return {
        success: true,
        data: {
          id: id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

async function signIn(data) {
  const { email, password } = data;

  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return { error: "Invalid email or password" };
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch && email === user.email) {
      const { accessToken, refreshToken } = generateTokens(user.id, user.email);

      return {
        success: true,
        data: {
          id: user.id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    }

    return { error: "Invalid email or password" };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

module.exports = {
  signUp,
  signIn,
};
