import { ReactNode, useCallback, useState } from "react";
import ClientCtx, { ClientContextType } from "./client-context";
import clientService from "./client-service";

const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientsList, setClientsList] = useState<
    ClientContextType["clientsList"]
  >({ loading: true, uninitialized: true });

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

        const data = await clientService.list(params);

        setClientsList({ success: true, loading: false, data });
      } catch (err: unknown) {
        console.error(err);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setClientsList({ success: false, loading: false, error: err as any });
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
