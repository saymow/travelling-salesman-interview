import { LatLngTuple } from "../../components/Map/helpers";

export interface CreateClient {
  name: string;
  email: string;
  phone: string;
  location: LatLngTuple;
}