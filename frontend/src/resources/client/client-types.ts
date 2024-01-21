import { LatLngTuple } from "../../components/Map/helpers";
import { Client } from "./client-model";

export interface CreateClient {
  name: string;
  email: string;
  phone: string;
  location: LatLngTuple;
}

export interface ExternalData<T> {
  data?: T;
  loading?: boolean;
  success?: boolean;
  error?: {
    message: string;
  };
}

export interface Paginated<T, K = undefined> {
  data: T[];
  limit: number;
  page: number;
  total: number;
  query: K;
}

export type PaginetedClientsList = Paginated<
  Client,
  {
    name?: string;
    email?: string;
    phone?: string;
  }
>;

export interface ListClientsSearchParams {
  limit: number;
  page: number;
  query: {
    name?: string;
    email?: string;
    phone?: string;
  };
}
