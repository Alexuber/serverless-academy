const fs = require("fs").promises;

const twentyArrs = [];

async function getInfo() {
  console.time("Total time:");
  console.log("Unique users:", await uniqueValues());
  console.log("existInAllFiles:", await existInAllFiles());
  console.log("existInAtleastTen", await existInAtleastTen());
  console.timeEnd("Total time:");
}

async function uniqueValues() {
  const allUsers = [];

  const files = await fs.readdir("data", "utf8");

  for (const file of files) {
    const data = await fs.readFile(`data/${file}`, "utf-8");
    const usersArr = data.split("\n");

    allUsers.push(...usersArr);
    twentyArrs.push(usersArr);
  }
  const uniqueUsers = new Set(allUsers).size;
  return uniqueUsers;
}

const namesCount = {};

async function existInAllFiles() {
  twentyArrs.forEach((arr) => {
    const uniqueArr = new Set(arr);
    uniqueArr.forEach((user) => {
      if (namesCount.hasOwnProperty(user)) {
        namesCount[user]++;
      } else {
        namesCount[user] = 1;
      }
    });
  });

  const existInAll = Object.keys(namesCount).filter(
    (user) => namesCount[user] === 20
  );
  return existInAll.length;
}

async function existInAtleastTen() {
  const existInten = Object.keys(namesCount).filter(
    (user) => namesCount[user] >= 10
  );
  return existInten.length;
}

getInfo();
