const { Client } = require("pg");
const { DB_HOST_CONNECTION_STR } = process.env;

const client = new Client({
  connectionString: DB_HOST_CONNECTION_STR,
});

client
  .connect()
  .then(() => {
    console.log(`Connected to Supabase DB`);
  })
  .catch((error) => {
    console.error(`Error connecting to Supabase DB`, error);
    process.exit(1);
  });

module.exports = client;
