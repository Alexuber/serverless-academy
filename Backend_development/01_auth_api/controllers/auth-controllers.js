const ctrlWrapper = require("../utils/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
// const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;
// const client = require("../server");
// console.log("🆑  client:", client);

async function signUp(req, res) {
  const { email, password } = req.body;
  console.log("🆑  password:", password);

  console.log("🆑  email:", email);

  const query =
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
  const values = [email, password];

  try {
    const result = await client.query(query, values);
    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const values = [email, password];

  try {
    const result = await client.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).json({ user: result.rows[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// const signUp = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, "Email in use");
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   const newUser = await User.create({ ...req.body, password: hashPassword });

//   res.status(201).json({
//     user: {
//       email: newUser.email,
//       subscription: newUser.subscription,
//     },
//   });
// };

// const signIn = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(401, "Email or password invalid");
//   }

//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw HttpError(401, "Email or password invalid");
//   }

//   const payload = {
//     id: user._id,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
//   await User.findByIdAndUpdate(user._id, { token });

//   res.json({
//     token,
//     user: {
//       email: user.email,
//       subscription: user.subscription,
//     },
//   });
// };

const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.json({
    email,
    subscription,
  });
};

// const logout = async (req, res) => {
//   const { _id } = req.user;

//   await User.findByIdAndUpdate(_id, { token: "" });
//   res.status(204).send();
// };

// const subscriptionUpdate = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     if (JSON.stringify(req.body) === "{}") {
//       return res.status(400).json({ message: `missing field "subscription"` });
//     }
//     const result = await User.findByIdAndUpdate({ _id: contactId }, req.body, {
//       new: true,
//     });
//     if (!result) {
//       return res.status(400).json({ message: `Not found` });
//     }
//     res.json(`Your subscription updated to ${req.body.subscription}`);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrent: ctrlWrapper(getCurrent),
  //   logout: ctrlWrapper(logout),
  //   subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
};
