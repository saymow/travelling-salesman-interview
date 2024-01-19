import express from "express";
import routes from "./routes";
import cors from "cors";
import db from "./database";

const PORT = 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server open on port ${PORT}`);
});
