const { findIpDetails } = require("../utils");

async function compareIp(data) {
  try {
    const ipDetails = findIpDetails(data);
    return ipDetails;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

module.exports = {
  compareIp,
};
