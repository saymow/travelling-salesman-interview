import { CreateClient } from "./client-types";

class ClientService {
  async create(createClientData: CreateClient): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

export default new ClientService();
