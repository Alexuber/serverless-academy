const { uid } = require("uid");

const DOMAIN = "http://localhost:3000/";

function createShortLink() {
  const short = uid(8);
  return `${DOMAIN}${short}`;
}

module.exports = createShortLink;
