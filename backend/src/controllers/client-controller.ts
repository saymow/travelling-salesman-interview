import { Request, Response } from "express";
import CreateClientService from "../services/create-client-service";
import ClientRepository, {
  SearchParams,
} from "../repositories/client-repository";
import ListClientsService from "../services/list-clients-service";
import { createClientSchema, searchParamsSchema } from "../schemas";

class ClientController {
  async create(req: Request, res: Response) {
    const data = req.body;
    const createClientService = new CreateClientService(new ClientRepository());

    await createClientSchema.validate(data, { abortEarly: false });
    await createClientService.execute(data);

    return res.sendStatus(201);
  }

  async list(req: Request, res: Response) {
    const params = req.query;
    const listClientsService = new ListClientsService(new ClientRepository());

    await searchParamsSchema.validate(params, { abortEarly: false });

    const clients = await listClientsService.execute(
      params as unknown as SearchParams
    );

    return res.send(clients);
  }
}

export default ClientController;
