const express = require("express");
const router = express.Router();

const { validateLink } = require("../middlewares");
const linksController = require("../controllers/links-controllers");

router.post("/", validateLink, linksController.saveLink);
router.get("/:shortLink", linksController.getLink);

module.exports = router;
