import { ORIGIN } from "../constants";
import * as haversineUtils from "../helpers/haversine";
import * as salesmanUtils from "../helpers/salesman-travelling";
import { Client } from "../models/client-model";
import ComputeSalesmanTravellingService from "./compute-salesman-travelling-service";

const makeSut = () => {
  const sut = new ComputeSalesmanTravellingService();

  return {
    sut,
  };
};

const makeCreateClientList = (): Client[] => [
  {
    id: 1,
    name: "example",
    email: "exampe@example.com",
    phone: "55 5555 5555",
    latLng: [1, 1],
  },
  {
    id: 2,
    name: "example2",
    email: "exampe2@example.com",
    phone: "45 5555 5555",
    latLng: [10, 10],
  },
];

describe("ComputeSalesmanTravellingService", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("Should throw if haversine throws", async () => {
    const { sut } = makeSut();

    jest.spyOn(haversineUtils, "haversine").mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute(makeCreateClientList())).rejects.toThrow();
  });

  it("Should throw if salesman-travelling throws", async () => {
    const { sut } = makeSut();

    jest.spyOn(salesmanUtils, "salesman_travelling").mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute(makeCreateClientList())).rejects.toThrow();
  });

  it("Should call haversine with correct values", async () => {
    const { sut } = makeSut();
    const [client1, client2] = makeCreateClientList();

    const haversineMock = jest.spyOn(haversineUtils, "haversine");

    await sut.execute([client1, client2]);

    expect(haversineMock.mock.calls.length).toBe(6);
    expect(haversineMock.mock.calls).toEqual([
      [ORIGIN, client1.latLng],
      [ORIGIN, client2.latLng],
      [client1.latLng, ORIGIN],
      [client1.latLng, client2.latLng],
      [client2.latLng, ORIGIN],
      [client2.latLng, client1.latLng],
    ]);
  });

  // We can test how populate_salesman_travelling_result_nodes is called and so on...
});
