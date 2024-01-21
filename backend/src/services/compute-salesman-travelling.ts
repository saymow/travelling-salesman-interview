import { ORIGIN } from "../constants";
import { haversine } from "../helpers/haversine";
import {
  Matrix,
  SalesmanTravellingResult,
  salesman_travelling,
} from "../helpers/salesman-travelling";
import { Client } from "../models/client-model";
import { LatLng } from "../models/lat-lng";

interface ClietNode {
  id: number;
  latLng: LatLng;
}

type PathNode = Client;

interface ClientsSalesmanTravellingResult {
  distance: number;
  path: PathNode[];
}

const compute_clients_graph_matrix = (clients: Client[]): Matrix => {
  const clients_nodes = clients.slice() as ClietNode[];

  // Includes the origin (our initial point) as the first element
  clients_nodes.unshift({
    id: -1,
    latLng: ORIGIN,
  });

  return clients_nodes.reduce<Matrix>((matrix, client) => {
    const client_distances = clients_nodes.reduce<number[]>(
      (client_distances, other_client) => {
        if (client.id === other_client.id) {
          client_distances.push(0);
        } else {
          client_distances.push(haversine(client.latLng, other_client.latLng));
        }

        return client_distances;
      },
      []
    );

    matrix.push(client_distances);

    return matrix;
  }, []);
};

const populate_salesman_travelling_result_nodes = (
  result: SalesmanTravellingResult,
  clients: Client[]
): ClientsSalesmanTravellingResult => {
  const [distance, path] = result;
  const path_without_root = path;

  // Remember: the first node in the is the root node.
  // Since we dont need it, we can remove the first element of the path
  path_without_root.shift();

  const nodes: PathNode[] = path_without_root.map((graph_node) => {
    // Remember: the origin node is inserted at the first row of the matrix.
    // Hence, Our matrix client's rows are shifted to the right
    return clients[graph_node - 1];
  });

  return {
    distance,
    path: nodes,
  };
};

class ComputeSalesmanTravellingService {
  async execute(clients: Client[]): Promise<ClientsSalesmanTravellingResult> {
    return new Promise((resolve) => {
      const graph_matrix = compute_clients_graph_matrix(clients);
      const path = salesman_travelling(graph_matrix);
      const populated_path = populate_salesman_travelling_result_nodes(
        path,
        clients
      );

      resolve(populated_path);
    });
  }
}

export default ComputeSalesmanTravellingService;
