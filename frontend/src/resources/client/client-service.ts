import api from "../../services/api";
import {
  CreateClient,
  ListClientsSearchParams,
  PaginetedClientsList,
} from "./client-types";

class ClientService {
  async create(createClientData: CreateClient): Promise<void> {
    return api.post("/clients", { ...createClientData });
  }

  async list(params: ListClientsSearchParams): Promise<PaginetedClientsList> {
    const { limit, page, query: q } = params;

    return api
      .get("/clients", { params: { limit, offset: page * limit, q } })
      .then((res) => res.data)
      .then((data) => ({
        data: data.list,
        limit,
        page,
        total: data.total,
        query: q,
      }));
  }
}

export default new ClientService();
