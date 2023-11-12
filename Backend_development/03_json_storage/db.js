const { Pool } = require("pg");
const { DB_HOST_CONNECTION_STR } = process.env;

const pool = new Pool({
  connectionString: DB_HOST_CONNECTION_STR,
});

pool
  .connect()
  .then(() => {
    console.log(`Connected to Supabase DB`);
  })
  .catch((error) => {
    console.error(`Error connecting to Postgres DB`, error);
    process.exit(1);
  });

module.exports = pool;

// async function createTables() {
//   try {
//     const createUsersTableQuery = `
//         CREATE TABLE IF NOT EXISTS jsonUsers (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(100),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//       `;
//     await client.query(createUsersTableQuery);
//     console.log("Users table created successfully");

//     const createJsonFilesTableQuery = `
//         CREATE TABLE IF NOT EXISTS json_files (
//           id SERIAL PRIMARY KEY,
//           user_id INTEGER REFERENCES jsonUsers(id),
//           json_path VARCHAR(255) UNIQUE,
//           json_data JSONB,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//       `;
//     await client.query(createJsonFilesTableQuery);
//     console.log("Json files table created successfully");
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await client.end();
//   }
// }

// createTables();
