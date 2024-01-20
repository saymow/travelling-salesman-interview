import { LatLngTuple } from "../../components/Map/helpers";

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

export interface Paginated<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
}

export interface ListClientsSearchParams {
  limit: number;
  page: number;
  query: {
    name?: string;
    email?: string;
    phone?: string;
  };
}
