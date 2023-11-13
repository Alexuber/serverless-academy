const { storageLink, getFullLink } = require("../sevices/links-service");

const saveLink = async (req, res, next) => {
  try {
    const { link } = req.body;

    const shortLink = await storageLink(link);

    res
      .status(201)
      .json(
        `Succes! Your original link availaible at this short link: ${shortLink}`
      );
  } catch (error) {
    next(error);
  }
};

const getLink = async (req, res, next) => {
  const { shortLink } = req.params;

  try {
    const fullLink = await getFullLink(`http://localhost:3000/${shortLink}`);
    res.redirect(302, fullLink);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  saveLink,
  getLink,
};
