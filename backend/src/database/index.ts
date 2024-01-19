import { Client } from "pg";
import env from "../env";

const db = new Client({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
});

db
  .connect()
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to the database: ", err);
    process.exit(1);
  });

// pings the database to check connection
db.query("SELECT 1;");

export default db;
