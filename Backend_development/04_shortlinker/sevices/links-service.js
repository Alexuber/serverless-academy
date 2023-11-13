const client = require("../db");
const { createShortLink } = require("../utils");

async function storageLink(link) {
  const shortLink = await createShortLink();

  try {
    const query =
      "INSERT INTO shortlinks (short_link, full_link) VALUES ($1, $2) RETURNING *";
    const values = [shortLink, link];

    await client.query(query, values);

    return shortLink;
  } catch (error) {
    throw error;
  }
}

async function getFullLink(shortLink) {
  try {
    const linkQuery = "SELECT full_link FROM shortlinks WHERE short_link = $1";
    const linkResult = await client.query(linkQuery, [shortLink]);

    if (linkResult.rows.length === 0) {
      throw new Error("Link not found in DB");
    }

    const fullLink = linkResult.rows[0].full_link;

    return fullLink;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  storageLink,
  getFullLink,
};
