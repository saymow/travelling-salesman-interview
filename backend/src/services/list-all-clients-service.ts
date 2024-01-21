import { Client } from "../models/client-model";
import ClientRepository from "../repositories/client-repository";

export class ListAllClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return this.clientRepository.listAll().then((clientsData) =>
      clientsData.map((clientData) => ({
        ...clientData,
        latLng: [clientData.lat, clientData.lng],
      }))
    );
  }
}

export default ListAllClientsService;
