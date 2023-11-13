const express = require("express");
const linkRouter = require("./routes/link-routes");
const app = express();

app.use(express.json());
app.use("/", linkRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  console.log("Error", message);
  res.status(status).json({ message });
});

module.exports = app;
