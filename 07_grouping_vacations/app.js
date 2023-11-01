const fs = require("fs").promises;

async function convertJson() {
  const data = JSON.parse(await fs.readFile(`data.json`, "utf-8"));
  const result = {};

  data.forEach(({ user, endDate, startDate }) => {
    const newData = {
      userId: user._id,
      userName: user.name,
      vacations: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
    };

    const vacation = {
      startDate,
      endDate,
    };

    if (result[user._id]) {
      result[user._id].vacations.push(vacation);
    } else {
      result[user._id] = newData;
    }
  });

  const resultArr = Object.values(result);
  const newJson = JSON.stringify(resultArr);

  try {
    await fs.writeFile("newData.json", newJson, "utf-8");
  } catch (error) {
    console.log(error);
  }

  console.log(resultArr);
}

convertJson();
