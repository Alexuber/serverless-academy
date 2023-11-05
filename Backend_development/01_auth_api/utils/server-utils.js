const { PORT } = process.env;

function startServer(app, PORT = 3000) {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return server;
}

module.exports = { startServer };
