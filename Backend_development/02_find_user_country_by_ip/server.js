const app = require("./app");
const { startServer } = require("./utils");

startServer(app, (PORT = 3000));
