import { Client } from "../../models/client-model";
import {
  SearchParams,
  SearchResult,
} from "../../repositories/client-repository";
import { CreateClient } from "../../repositories/types";

export const makeClientRepositoryStub = () => {
  class ClientRepository {
    async create(data: CreateClient): Promise<Client> {
      return Promise.resolve({
        id: 1,
        name: data.name,
        email: data.email,
        phone: data.phone,
        latLng: data.location,
      });
    }

    async list(params: SearchParams): Promise<SearchResult> {
      return Promise.resolve({
        list: [],
        total: 0,
      });
    }

    async listAll(): Promise<any[]> {
      return Promise.resolve([]);
    }
  }

  return new ClientRepository();
};
