const convertNumberToIp = (number) => {
  const octet1 = (number >>> 24) & 255;
  const octet2 = (number >>> 16) & 255;
  const octet3 = (number >>> 8) & 255;
  const octet4 = number & 255;

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

module.exports = convertNumberToIp;
