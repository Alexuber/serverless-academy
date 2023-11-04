const app = require("./app");
const supabaseUrl = "https://xubckxohjhzalkeggcoi.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YmNreG9oamh6YWxrZWdnY29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxMDA3ODQsImV4cCI6MjAxNDY3Njc4NH0.QHpz6xk7SKJVSqc55I-vjy1JLrvnUsOAoNpi5PYMLo4";
const PORT = 3000;
// const supabase = createClient(supabaseUrl, supabaseKey);

const DB_NAME = "users";
const { Client } = require("pg");

const client = new Client({
  connectionString: `postgresql://postgres:mishonokend1@db.xubckxohjhzalkeggcoi.supabase.co:5432/postgres`,
});

client
  .connect()
  .then(() => {
    app.listen(PORT);
    console.log(
      `Connected to Supabase DB-name: ${DB_NAME}\nServer running on PORT: ${PORT}`
    );
  })
  .catch((error) => {
    console.error(`Error connecting to Supabase DB-name: ${DB_NAME}\n`, error);
    process.exit(1);
  });

// Supbase variant

// const { createClient } = require("@supabase/supabase-js");
// const supabase = createClient(supabaseUrl, supabaseKey);
// async function connectToSupabase() {
//   try {
//     await supabase.from(DB_NAME).select("*");
//     app.listen(PORT);
//     console.log(
//       `Connected to Supabase DB-name: ${DB_NAME}\nServer running on PORT: ${PORT}`
//     );
//   } catch (error) {
//     console.error(`Error connecting to Supabase DB-name: ${DB_NAME}`, error);
//   }
// }

// connectToSupabase();

// client.query("SELECT * FROM users", (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(res.rows); // Ваши данные
//   client.end();
// });
module.exports = client;
