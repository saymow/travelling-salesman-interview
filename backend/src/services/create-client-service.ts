import ClientRepository from "../repositories/client-repository";
import { CreateClient } from "../repositories/types";

export class CreateClientService {
  constructor(
    private readonly clientRepository: ClientRepository
  ) {}

  async execute(createClientData: CreateClient) {
    await this.clientRepository.create(createClientData)
  }
}

export default CreateClientService;
