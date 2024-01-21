import { createContext } from "react";
import {
  CreateClient,
  ExternalData,
  ListClientsSearchParams,
  PaginetedClientsList
} from "./client-types";

export interface ClientContextType {
  clientsList: ExternalData<PaginetedClientsList>;
  createClient: (createClientData: CreateClient) => Promise<void>;
  listClients: (params: ListClientsSearchParams) => Promise<void>;
}

const ClientCtx = createContext<ClientContextType>(
  null as unknown as ClientContextType
);

export default ClientCtx;
