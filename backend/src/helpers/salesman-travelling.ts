type Matrix = Array<Array<number>>;

type SalesmanTravellingResult = [number, number[]];

const salesman_travelling = (m: Matrix): SalesmanTravellingResult => {
  const salesman_travelling_helper = (
    current: number,
    visited: number[]
  ): SalesmanTravellingResult => {
    visited.push(current);

    if (visited.length === m.length) {
      return [m[current][0], visited];
    }

    let total_distance: [number, number[]] = [Infinity, []];

    for (let i = 0; i < m.length; i++) {
      if (current != i && !visited.includes(i)) {
        let [distance, path] = salesman_travelling_helper(i, visited.slice());
        distance += m[current][i];

        if (distance < total_distance[0]) {
          total_distance = [distance, path];
        }
      }
    }

    return total_distance!;
  };

  return salesman_travelling_helper(0, []);
};

export { salesman_travelling, Matrix, SalesmanTravellingResult };
