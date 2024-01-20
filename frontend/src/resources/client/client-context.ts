import { createContext } from "react";
import {
  CreateClient,
  ExternalData,
  ListClientsSearchParams,
  Paginated,
} from "./client-types";
import { Client } from "./client-model";

export interface ClientContextType {
  clientsList: ExternalData<Paginated<Client>>;
  createClient: (createClientData: CreateClient) => Promise<void>;
  listClients: (params: ListClientsSearchParams) => Promise<void>;
}

const ClientCtx = createContext<ClientContextType>(
  null as unknown as ClientContextType
);

export default ClientCtx;
