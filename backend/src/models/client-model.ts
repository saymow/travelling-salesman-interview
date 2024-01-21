import { LatLng } from "./lat-lng";

export interface Client {
  id: number;
  email: string;
  name: string;
  phone: string;
  latLng: LatLng;
}
