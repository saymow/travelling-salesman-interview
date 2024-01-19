import { Router } from "express";
import ClientController from "../controllers/client-controller";

const routes = Router();
const clientController = new ClientController();

routes.post("/clients", clientController.create);

export default routes;