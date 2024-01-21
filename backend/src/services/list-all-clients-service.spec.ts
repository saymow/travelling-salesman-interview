import { SearchParams } from "../repositories/client-repository";
import { makeClientRepositoryStub } from "./__tests__";
import ListAllClientsService from "./list-all-clients-service";

const makeSut = () => {
  const clientRepository = makeClientRepositoryStub();
  const sut = new ListAllClientsService(clientRepository);

  return {
    sut,
    clientRepository,
  };
};

describe("ListClientsService", () => {
  it("Should throw if clientRepository.listALL throws", async () => {
    const { sut, clientRepository } = makeSut();

    jest.spyOn(clientRepository, "listAll").mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute()).rejects.toThrow();
  });

  it("Should return search result on success", async () => {
    const { sut } = makeSut();

    expect(await sut.execute()).toEqual([]);
  });
});
