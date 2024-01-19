import { Request, Response } from "express";
import CreateClientService from "../services/create-client-service";
import ClientRepository from "../repositories/client-repository";

class ClientController {
  async create(req: Request, res: Response) {
    const data = req.body;
    const createClientService = new CreateClientService(new ClientRepository());

    await createClientService.execute(data);

    res.sendStatus(201);
  }
}

export default ClientController;
