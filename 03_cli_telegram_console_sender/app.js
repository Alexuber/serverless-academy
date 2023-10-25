const TelegramBot = require("node-telegram-bot-api");
const program = require("commander");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN.trim();
const CHAT_ID = Number(process.env.CHAT_ID);

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
  polling: true,
});

program
  .command("send-message <message>")
  .description("send message to Telegram bot")
  .action((message) => {
    bot
      .sendMessage(CHAT_ID, message)
      .then(() => process.exit(0))
      .catch((error) => console.log("Error sending your message:", error));
  });

program
  .command("send-photo <path>")
  .description(
    "send photo to Telegram bot. Just drag and drop it console after p-flag"
  )
  .action((path) => {
    bot
      .sendPhoto(CHAT_ID, path)
      .then(() => process.exit(0))
      .catch((error) => console.log("Error sending your photo:", error));
  });

program.parse(process.argv);
