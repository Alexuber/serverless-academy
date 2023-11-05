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

// async function createTable() {
//   const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(100),
//     password TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;
//   try {
//     const result = await client.query(createTableQuery);
//     console.log("Table created successfully");
//   } catch (error) {
//     console.error("Error creating table:", error);
//   } finally {
//     client.end();
//   }
// }
// createTable();
