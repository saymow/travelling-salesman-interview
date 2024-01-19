import { createContext } from "react";
import { CreateClient } from "./client-types";

export interface ClientContextType {
  createClient: (createClientData: CreateClient) => Promise<void>;
}

const ClientCtx = createContext<ClientContextType>(
  null as unknown as ClientContextType
);

export default ClientCtx;
