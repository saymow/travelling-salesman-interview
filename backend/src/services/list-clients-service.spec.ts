import { Client } from "../models/client-model";
import { SearchParams, SearchResult } from "../repositories/client-repository";
import { CreateClient } from "../repositories/types";
import { makeClientRepositoryStub } from "./__tests__";
import ListClientsService from "./list-clients-service";

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

  it("Should throw if clientRepository.list throws", async () => {
    const { sut, clientRepository } = makeSut();
    const params = makeSearchParams();

    jest.spyOn(clientRepository, "list").mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute(params)).rejects.toThrow();
  });

  it("Should return search result on success", async () => {
    const { sut, clientRepository } = makeSut();
    const params = makeSearchParams();

    expect(await sut.execute(params)).toEqual(
      expect.objectContaining({
        list: [],
        total: 0,
      })
    );
  });
});
