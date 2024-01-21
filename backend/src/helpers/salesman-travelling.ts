type Matrix = Array<Array<number>>;

type SalesmanTravellingResult = [number, number[]];

const salesman_travelling = (m: Matrix): SalesmanTravellingResult => {
  const n = m.length;
  const cache: Record<string, SalesmanTravellingResult> = {};

  const salesman_travelling_helper = (
    current: number,
    mask: number,
    visited: number[]
  ): SalesmanTravellingResult => {
    visited.push(current);
    mask = mask | (1 << current);

    if (mask === (1 << n) - 1) {
      return [m[current][0], visited];
    }

    const key = `${current}-${mask}`;

    if (cache[key] != undefined) {
      return cache[key];
    }

    let total_distance: [number, number[]] = [Infinity, []];

    for (let i = 0; i < n; i++) {
      if (current != i && ((mask >> i) & 1) === 0) {
        let [distance, path] = salesman_travelling_helper(
          i,
          mask,
          visited.slice()
        );
        distance += m[current][i];

        if (distance < total_distance[0]) {
          total_distance = [distance, path];
        }
      }
    }

    cache[key] = total_distance;

    return total_distance!;
  };

  return salesman_travelling_helper(0, 1, []);
};

export { salesman_travelling, Matrix, SalesmanTravellingResult };
