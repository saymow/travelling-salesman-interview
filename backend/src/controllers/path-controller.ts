import { Request, Response } from "express";
import ClientRepository from "../repositories/client-repository";
import ComputeSalesmanTravellingService from "../services/compute-salesman-travelling";
import ListAllClientsService from "../services/list-all-clients-service";

class PathController {
  async show(req: Request, res: Response) {
    const listAllClientsService = new ListAllClientsService(
      new ClientRepository()
    );
    const salesman_travelling_service = new ComputeSalesmanTravellingService();
    const clients = await listAllClientsService.execute();
    const salesman_travelling = await salesman_travelling_service.execute(
      clients
    );

    return res.send(salesman_travelling);
  }
}

export default PathController;
