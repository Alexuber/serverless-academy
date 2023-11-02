// const axios = require("axios");
// const fs = require("fs").promises;

// const processEndpoints = async () => {
//   const endpoints = await getData();

//   const results = await Promise.all(endpoints.map(getUrl));
//   const fullfieldValues = results.filter((result) => result === true);
//   const rejectedValues = results.filter((result) => result === false);

//   console.log(`Found True Values: ${fullfieldValues.length}`);
//   console.log(`Found False Values: ${rejectedValues.length}`);
// };

// async function getData() {
//   try {
//     const endpoints = JSON.parse(await fs.readFile(`endpoints.json`, "utf-8"));
//     return endpoints;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// const getUrl = async (url) => {
//   for (let times = 0; times < 3; times++) {
//     try {
//       const res = await axios.get(url);
//       if (res.status !== 200) {
//         console.log("Error response");
//       }
//       if (res.data.isDone !== undefined) {
//         console.log(`[Success] ${url}: isDone - ${res.data.isDone}`);
//         return res.data.isDone;
//       } else {
//         throw new Error(`${url}: isDone key no have`);
//       }
//     } catch (error) {
//       if (times === 2) {
//         console.log(`[Fail] ${url}: The endpoint is unavailable`);
//         return undefined;
//       }
//     }
//   }
// };
// processEndpoints();
const https = require("https");

https.get("https://coderbyte.com/api/challenges/json/age-counting", (resp) => {
  let content = "";

  // push data character by character to "content" variable
  resp.on("data", (c) => (content += c));

  // when finished reading all data, parse it for what we need now
  resp.on("end", () => {
    let jsonContent = JSON.parse(content);
    let jsonContentArray = jsonContent.data.split(",");
    let keyArray = [];

    for (let i = 0; i < jsonContentArray.length; i++) {
      let keySplit = jsonContentArray[i].trim().split("=");
      if (keySplit[0] === "key") {
        keyArray.push(keySplit[1]);
      }
    }
    const result = [];
    for (let i = 0; i < keyArray.length; i++) {
      if (i >= 10 && i < 15) {
        result.push(keyArray[i]);
      }
    }

    console.log(result.toString());
  });
});
