const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const NodeCache = require("node-cache");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN.trim();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const MONO_BASE_URL = "https://api.monobank.ua/bank/currency";
const PRIVAT_BASE_URL =
  "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";

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
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
  polling: true,
});

const mainMenu = {
  reply_markup: {
    keyboard: [["Get weather ☀️", "Exchange 💵"]],
    resize_keyboard: true,
  },
};

const subMenuWeather = {
  reply_markup: {
    keyboard: [["Every 3 hours", "Every 6 hours"], ["⬅️ Back"]],
    resize_keyboard: true,
  },
};

const subMenuCurrency = {
  reply_markup: {
    keyboard: [["USD", "EUR"], ["⬅️ Back"]],
    resize_keyboard: true,
  },
};

bot.onText(/\/start/, (message) => {
  const CHAT_ID = message.chat.id;
  bot.sendMessage(
    CHAT_ID,
    "Welcome! I can show forecast in Kyiv or currency exchange rate for you!☀️",
    mainMenu
  );
});

bot.on("message", async (message) => {
  const text = message.text;
  const CHAT_ID = message.chat.id;

  if (text === "Get weather ☀️") {
    bot.sendMessage(CHAT_ID, "Please choose the interval ❓", subMenuWeather);
  } else if (text === "Every 3 hours") {
    getWeather(3, CHAT_ID);

    bot.sendMessage(CHAT_ID, "Please your weather for every 3 hours 👌");
  } else if (text === "Every 6 hours") {
    getWeather(6, CHAT_ID);
    bot.sendMessage(CHAT_ID, "Please your weather for every 6 hours 👌");
  } else if (text === "⬅️ Back") {
    bot.sendMessage(CHAT_ID, "Back to main menu 🔙", mainMenu);
  } else if (text === "Exchange 💵") {
    bot.sendMessage(CHAT_ID, "Please choose currency", subMenuCurrency);
  } else if (text === "USD") {
    const currency = await getCurrency(text);
    await bot.sendMessage(
      CHAT_ID,
      "✅ Done! Here is the actual currency exchnage rate USD:"
    );
    bot.sendMessage(CHAT_ID, currency, subMenuCurrency);
  } else if (text === "EUR") {
    const currency = await getCurrency(text);
    await bot.sendMessage(
      CHAT_ID,
      "✅ Done! Here is the actual currency exchnage rate EUR:"
    );

    bot.sendMessage(CHAT_ID, currency, subMenuCurrency);
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

async function getCurrency(currency) {
  let resultMono = null;
  const value = myCache.get("monoCurr");

  if (value == undefined) {
    const monoCurrency = await axios.get(MONO_BASE_URL);
    myCache.set("monoCurr", monoCurrency.data, 90);
    resultMono = monoCurrency.data;
  } else {
    resultMono = value;
  }
  const privatCurrency = await axios.get(PRIVAT_BASE_URL);

  const usdMono = resultMono.find(
    ({ currencyCodeA, currencyCodeB }) =>
      currencyCodeA === 840 && currencyCodeB === 980
  );

  const eurMono = resultMono.find(
    ({ currencyCodeA, currencyCodeB }) =>
      currencyCodeA === 978 && currencyCodeB === 980
  );

  const messageEUR = `Monobank: BUY ${
    eurMono.rateBuy
  } | SALE ${eurMono.rateSell.toFixed(2)}  \n PrivatBank: BUY ${Number(
    privatCurrency.data[0].buy
  ).toFixed(2)} | SALE ${Number(privatCurrency.data[0].sale).toFixed(2)}`;
  const messageUSD = `Monobank: BUY ${
    usdMono.rateBuy
  } | SALE ${usdMono.rateSell.toFixed(2)}  \n PrivatBank: BUY ${Number(
    privatCurrency.data[1].buy
  ).toFixed(2)} | SALE ${Number(privatCurrency.data[1].sale).toFixed(2)}`;

  if (currency === "EUR") {
    return messageEUR;
  }
  return messageUSD;
}
