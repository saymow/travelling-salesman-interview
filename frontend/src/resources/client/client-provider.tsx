import { ReactNode, useCallback, useState } from "react";
import ClientCtx, { ClientContextType } from "./client-context";
import clientService from "./client-service";

const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientsList, setClientsList] = useState<
    ClientContextType["clientsList"]
  >({ loading: true });

  const createClient: ClientContextType["createClient"] = useCallback(
    async (clientData) => {
      return clientService.create(clientData);
    },
    []
  );

  const listClients: ClientContextType["listClients"] = useCallback(
    async (params) => {
      try {
        setClientsList((prev) => ({ ...prev, loading: true }));

        const clientsList = await clientService.list(params);

        setClientsList((prev) => ({
          ...prev,
          success: true,
          loading: false,
          data: clientsList,
        }));
      } catch (err: unknown) {
        console.error(err);
        setClientsList((prev) => ({
          ...prev,
          success: false,
          loading: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error: err as any,
        }));
      }
    },
    []
  );

  return (
    <ClientCtx.Provider value={{ createClient, clientsList, listClients }}>
      {children}
    </ClientCtx.Provider>
  );
};

export default ClientProvider;
