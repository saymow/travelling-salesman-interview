import api from "../../services/api";
import { CreateClient } from "./client-types";

class ClientService {
  async create(createClientData: CreateClient): Promise<void> {
    return api.post("/clients", createClientData);
  }
}

export default new ClientService();
