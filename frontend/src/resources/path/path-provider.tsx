import { ReactNode, useCallback, useState } from "react";
import PathCtx, { PathContextType } from "./path-context";
import pathService from "./path-service";

const PathProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [salesmanPath, setSalesmanPath] = useState<
    PathContextType["salesmanPath"]
  >({ loading: true });

  const fetchSalesmanPath: PathContextType["fetchSalesmanPath"] = useCallback(async () => {
    try {
      setSalesmanPath((prev) => ({ ...prev, loading: true }));

      const data = await pathService.show();

      setSalesmanPath({ success: true, loading: false, data });
    } catch (err: unknown) {
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSalesmanPath({ success: false, loading: false, error: err as any });
    }
  }, []);

  return (
    <PathCtx.Provider value={{ salesmanPath, fetchSalesmanPath }}>
      {children}
    </PathCtx.Provider>
  );
};

export default PathProvider;
