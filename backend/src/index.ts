import "express-async-errors";
import cors from "cors";
import express from "express";
import env from "./env";
import routes from "./routes";
import { errorHandler } from "./middlewares/error-handler-middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server open on port ${env.PORT}`);
});
