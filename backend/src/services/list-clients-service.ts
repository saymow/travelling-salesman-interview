import ClientRepository, {
  SearchParams,
} from "../repositories/client-repository";
import { CreateClient } from "../repositories/types";

export class ListClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(params: SearchParams) {
    return this.clientRepository.list(params).then((listResult) => ({
      total: listResult.total,
      list: listResult.list.map((clientData) => ({
        ...clientData,
        latLng: [clientData.lat, clientData.lng],
      })),
    }));
  }
}

export default ListClientsService;
