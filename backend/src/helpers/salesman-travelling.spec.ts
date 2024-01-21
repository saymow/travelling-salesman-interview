import { salesman_travelling } from "./salesman-travelling";

describe("Haversine", () => {
  it("Should work for 4x4 matrix", () => {
    const matrix = [
      [0, 3, 2, 5],
      [3, 0, 6, 4],
      [2, 6, 0, 3],
      [5, 4, 3, 0],
    ];

    expect(salesman_travelling(matrix)).toEqual([12, [0, 1, 3, 2]]);
  });

  it("Should work for 4x4 matrix", () => {
    const matrix = [
      [0, 5, 8, 4, 5],
      [5, 0, 7, 4, 5],
      [8, 7, 0, 8, 6],
      [4, 4, 8, 0, 8],
      [5, 5, 6, 8, 0],
    ];

    expect(salesman_travelling(matrix)).toEqual([26, [0, 1, 3, 2, 4]]);
  });
});
