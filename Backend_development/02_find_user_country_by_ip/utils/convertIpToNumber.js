const convertIpToNumber = (ip) => {
  const parts = ip.split(".");

  let number = 0;
  for (let i = 0; i < parts.length; i++) {
    number = (number << 8) + parseInt(parts[i], 10);
  }
  return number >>> 0;
};

module.exports = convertIpToNumber;
