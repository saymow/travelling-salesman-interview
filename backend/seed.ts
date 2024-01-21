import db from "./src/database";
import fs from "fs";

fs.readFile("../sample-dml.sql", "utf-8", (err, blob) => {
  if (err) {
    console.error("Failed to seed database: ", err);
    process.exit(1);
  }

  const sql = blob.toString();

  db.query(sql)
    .then(() => {
      console.log("Database seeded successfully");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Failed to seed database: ", err);
      process.exit(1);
    });
});
