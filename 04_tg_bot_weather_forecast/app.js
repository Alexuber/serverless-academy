const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN.trim();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const axiosWeather = axios.create({
  baseURL: WEATHER_API_URL,
  params: {
    appid: WEATHER_API_KEY,
    units: "metric",
    lat: 50.45466,
    lon: 30.5238,
    cnt: 12,
  },
});

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
  polling: true,
});

const mainMenu = {
  reply_markup: {
    keyboard: [["Get weather"]],
    resize_keyboard: true,
  },
};

const subMenu = {
  reply_markup: {
    keyboard: [["Every 3 hours", "Every 6 hours"], ["Back"]],
    resize_keyboard: true,
  },
};

bot.onText(/\/start/, (message) => {
  const CHAT_ID = message.chat.id;
  bot.sendMessage(
    CHAT_ID,
    "Welcome! I can show forecast in Kyiv for you!☀️ ⛅️ ☔️",
    mainMenu
  );
});

bot.on("message", (message) => {
  const text = message.text;
  const CHAT_ID = message.chat.id;

  if (text === "Get weather") {
    bot.sendMessage(CHAT_ID, "Please choose the interval ❓", subMenu);
  } else if (text === "Every 3 hours") {
    getWeather(3, CHAT_ID);

    bot.sendMessage(CHAT_ID, "Please your weather for every 3 hours 👌");
  } else if (text === "Every 6 hours") {
    getWeather(6, CHAT_ID);
    bot.sendMessage(CHAT_ID, "Please your weather for every 6 hours 👌");
  } else if (text === "Back") {
    bot.sendMessage(CHAT_ID, "Back to main menu 🔙", mainMenu);
    bot.sendMessage(CHAT_ID, "Have a nice day! 👋");
  }
});

async function getWeather(interval, CHAT_ID) {
  try {
    const { data } = await axiosWeather.get();
    sendNormalizeData(data.list, interval, CHAT_ID);
  } catch (error) {
    console.log(error);
  }
}

function sendNormalizeData(list, interval, CHAT_ID) {
  let finalData = [];

  for (const item of list) {
    const dateTime = new Date(item.dt * 1000).toLocaleString();
    const temperature = item.main.temp;
    const description = item.weather[0].description;

    finalData.push(`${dateTime} | Temp: ${temperature}°C | ${description}`);
  }

  if (interval === 3) {
    bot.sendMessage(CHAT_ID, finalData.join("\n"));
  } else {
    let sixHourForecast = [];
    for (let i = 0; i < finalData.length; i += 2) {
      sixHourForecast.push(finalData[i]);
    }
    bot.sendMessage(CHAT_ID, sixHourForecast.join("\n"));
  }
}
