const pool = require("../db");

async function storageData({ jsonUser, json_path, jsonData }) {
  try {
    const userQuery = "SELECT id FROM jsonusers WHERE name = $1";
    const userResult = await pool.query(userQuery, [jsonUser]);

    if (userResult.rows.length === 0) {
      throw new Error("user not found");
    }

    const userId = userResult.rows[0].id;

    const saveFileQuery =
      "INSERT INTO json_files (user_id, json_path, json_data) VALUES ($1, $2, $3) RETURNING *";
    const fileResult = await pool.query(saveFileQuery, [
      userId,
      json_path,
      jsonData,
    ]);

    return fileResult.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getFile({ jsonUser, json_path }) {
  try {
    const userQuery = "SELECT id FROM jsonusers WHERE name = $1";
    const userResult = await pool.query(userQuery, [jsonUser]);

    if (userResult.rows.length === 0) {
      throw new Error("user not found");
    }

    const userId = userResult.rows[0].id;

    const fileQuery =
      "SELECT json_data FROM json_files WHERE user_id = $1 AND json_path = $2";
    const fileResult = await pool.query(fileQuery, [userId, json_path]);

    if (fileResult.rows.length === 0) {
      throw new Error("file not found");
    }

    return fileResult.rows[0].json_data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  storageData,
  getFile,
};
