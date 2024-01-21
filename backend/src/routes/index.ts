import { Router } from "express";
import ClientController from "../controllers/client-controller";
import PathController from "../controllers/path-controller";

const routes = Router();
const clientController = new ClientController();
const pathController = new PathController();

routes.post("/clients", clientController.create);
routes.get("/clients", clientController.list);

routes.get("/path", pathController.show);

export default routes;
