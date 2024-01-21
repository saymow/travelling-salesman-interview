import { haversine } from "./haversine";

describe("Haversine", () => {
  it("Should work for [-15.834866, -47.878418] and [-31.579705, -52.822266]", () => {
    expect(
      Math.round(haversine([-15.834866, -47.878418], [-31.579705, -52.822266]))
    ).toBe(Math.round(1820.97));
  });

  it("Should work for [-19.146466, -44.121094] and [-32.25462, 20.390625]", () => {
    expect(
      Math.round(haversine([-19.146466, -44.121094], [-32.25462, 20.390625]))
    ).toBe(Math.round(6532.29));
  });
});
