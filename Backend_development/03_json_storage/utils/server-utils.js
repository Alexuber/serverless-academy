function startServer(app, PORT) {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  return server;
}

module.exports = startServer;
