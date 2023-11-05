const { signUp, signIn } = require("../sevices/auth-service");
const ctrlWrapper = require("../utils/ctrlWrapper");

const register = async (req, res, next) => {
  try {
    const result = await signUp({
      ...req.body,
    });

    result.success
      ? res.status(201).json(result)
      : res.status(409).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const result = await signIn({
      ...req.body,
    });
    result.error ? res.status(404).json(result) : res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserFromToken = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      data: {
        id: user.userId,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getUserFromToken: ctrlWrapper(getUserFromToken),
};
