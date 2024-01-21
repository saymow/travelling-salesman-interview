import { Client } from "../models/client-model";
import { SearchParams, SearchResult } from "../repositories/client-repository";
import { CreateClient } from "../repositories/types";
import ListClientsService from "./list-clients-service";

const makeClientRepositoryStub = () => {
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

const makeSut = () => {
  const clientRepository = makeClientRepositoryStub();
  const sut = new ListClientsService(clientRepository);

  return {
    sut,
    clientRepository,
  };
};

const makeSearchParams = (): SearchParams => ({
  limit: 10,
  offset: 0,
  q: {
    name: "",
    email: "",
    phone: "",
  },
});

describe("ListClientsService", () => {
  it("Should call clientRepository.list with correct values", async () => {
    const { sut, clientRepository } = makeSut();
    const params = makeSearchParams();

    jest.spyOn(clientRepository, "list");

    await sut.execute(params);

    expect(clientRepository.list).toHaveBeenCalledWith(params);
  });
});
