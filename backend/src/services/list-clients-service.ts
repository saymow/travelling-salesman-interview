import ClientRepository, {
  SearchParams,
} from "../repositories/client-repository";
import { CreateClient } from "../repositories/types";

export class ListClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(params: SearchParams) {
    return this.clientRepository.list(params);
  }
}

export default ListClientsService;
