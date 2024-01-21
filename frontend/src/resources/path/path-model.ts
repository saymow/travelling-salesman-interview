import { Client } from "../client/client-model";

type PathNode = Client;

export interface ClientsSalesmanTravellingResult {
  distance: number;
  path: PathNode[];
}