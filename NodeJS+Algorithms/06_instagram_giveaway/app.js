const fs = require("fs").promises;

const twentyArrays = [];

async function getInfo() {
  console.time("Total time:");
  console.log("Unique users:", await uniqueValues());
  console.log("Exist in all 20 files:", await existInAllFiles());
  console.log("Exist in at least 10:", await existInAtleastTen());
  console.timeEnd("Total time:");
}

async function uniqueValues() {
  const allUsers = [];

  const files = await fs.readdir("data", "utf8");

  for (const file of files) {
    const data = await fs.readFile(`data/${file}`, "utf-8");
    const usersArr = data.split("\n");

    allUsers.push(...usersArr);
    twentyArrays.push(usersArr);
  }
  const uniqueUsers = new Set(allUsers).size;
  return uniqueUsers;
}

const namesCount = {};

async function existInAllFiles() {
  twentyArrays.forEach((arr) => {
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
  const existInTen = Object.keys(namesCount).filter(
    (user) => namesCount[user] >= 10
  );
  return existInTen.length;
}

getInfo();
