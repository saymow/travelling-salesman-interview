import { ReactNode, useCallback } from "react";
import ClientCtx, { ClientContextType } from "./client-context";
import clientService from "./client-service";

const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const createClient: ClientContextType["createClient"] = useCallback(
    async (clientData) => {
      return clientService.create(clientData);
    },
    []
  );

  return (
    <ClientCtx.Provider value={{ createClient }}>{children}</ClientCtx.Provider>
  );
};

export default ClientProvider;
