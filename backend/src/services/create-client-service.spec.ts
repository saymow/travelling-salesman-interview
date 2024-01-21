import { SearchParams } from "../repositories/client-repository";
import { CreateClient } from "../repositories/types";
import { makeClientRepositoryStub } from "./__tests__";
import CreateClientService from "./create-client-service";
import ListAllClientsService from "./list-all-clients-service";

const makeSut = () => {
  const clientRepository = makeClientRepositoryStub();
  const sut = new CreateClientService(clientRepository);

  return {
    sut,
    clientRepository,
  };
};

const makeCreateClient = (): CreateClient => ({
  name: "example",
  email: "exampe@example.com",
  phone: "55 5555 5555",
  location: [1, 1],
});

describe("CreateClientService", () => {
  it("Should call clientRepository.create with correct values", async () => {
    const { sut, clientRepository } = makeSut();
    const createClient = makeCreateClient();

    jest.spyOn(clientRepository, "create");

    await sut.execute(createClient);

    expect(clientRepository.create).toHaveBeenCalledWith(createClient);
  });

  it("Should throw if clientRepository.create throws", async () => {
    const { sut, clientRepository } = makeSut();

    jest.spyOn(clientRepository, "create").mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute(makeCreateClient())).rejects.toThrow();
  });
});
