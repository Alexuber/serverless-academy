const express = require("express");

const dataController = require("../controllers/data-controllers");
const router = express.Router();

router.put("/:jsonUser/:json_path", dataController.saveData);
router.get("/:jsonUser/:json_path", dataController.getData);

module.exports = router;
