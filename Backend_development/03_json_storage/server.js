const app = require("./app");
const { startServer } = require("./utils");
const { PORT = 3000 } = process.env;

startServer(app, PORT);
