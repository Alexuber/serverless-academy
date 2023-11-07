const express = require("express");
const userRouter = require("./routes/user-routes");
const app = express();

app.use(express.json());
app.use("/", userRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
