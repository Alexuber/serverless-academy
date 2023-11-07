function parseCSV(data) {
  const parsed = data.map((row) =>
    row.split(",").map((item) => {
      if (item.startsWith('"') && item.endsWith('"')) {
        const number = parseInt(item.replace(/"/g, ""), 10);
        return isNaN(number) ? item.replace(/"/g, "") : number;
      } else {
        return item.replace(/\r?'?$/, "").replace(/"/g, "");
      }
    })
  );
  return parsed;
}

module.exports = parseCSV;
