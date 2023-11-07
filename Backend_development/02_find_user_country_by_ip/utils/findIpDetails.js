const fs = require("fs").promises;
const convertNumberToIp = require("./convertNumberToIp");
const convertIpToNumber = require("./convertIpToNumber");
const parseCSV = require("./parseCSV");

const findIpDetails = async (ip) => {
  const convertedIp = convertIpToNumber(ip);
  const data = (
    await fs.readFile(`data/IP2LOCATION-LITE-DB1.csv`, "utf-8")
  ).split("\n");

  const csvData = await parseCSV(data);

  let countryCode = "Unknown";
  let countryName = "Unknown";
  let ipRangeFrom = null;
  let ipRangeTo = null;

  for (const el of csvData) {
    const from = el[0];

    const to = el[1];

    if (convertedIp >= from && convertedIp <= to) {
      countryCode = el[2];
      countryName = el[3];
      ipRangeFrom = convertNumberToIp(el[0]);
      ipRangeTo = convertNumberToIp(el[1]);
      break;
    }
  }

  console.log({
    ip,
    countryCode,
    countryName,
    ipRangeFrom,
    ipRangeTo,
  });
  return {
    ip,
    countryCode,
    countryName,
    ipRangeFrom,
    ipRangeTo,
  };
};

module.exports = findIpDetails;
