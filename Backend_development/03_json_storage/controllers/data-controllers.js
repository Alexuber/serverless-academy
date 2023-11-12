const { storageData, getFile } = require("../sevices/data-service");

const saveData = async (req, res, next) => {
  try {
    const { json_path, jsonUser } = req.params;
    const jsonData = req.body;

    await storageData({
      jsonUser,
      json_path,
      jsonData,
    });

    res.status(201).json({
      message: `JSON stored, your path: ${jsonUser}/${json_path}`,
    });
  } catch (error) {
    next(error);
  }
};

const getData = async (req, res, next) => {
  const { jsonUser, json_path } = req.params;

  try {
    const fileData = await getFile({ jsonUser, json_path });
    res.json(fileData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveData,
  getData,
};
