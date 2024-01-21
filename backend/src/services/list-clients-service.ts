import { Client } from "../models/client-model";
import ClientRepository, {
  SearchParams,
  SearchResult,
} from "../repositories/client-repository";

interface ListClientsResult {
  list: Client[];
  total: number;
}

export class ListClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(params: SearchParams): Promise<ListClientsResult> {
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
