import { createContext } from "react";
import { ClientsSalesmanTravellingResult } from "./path-model";
import { ExternalData } from "../client/client-types";

export interface PathContextType {
  salesmanPath: ExternalData<ClientsSalesmanTravellingResult>;
  fetchSalesmanPath: () => Promise<void>;
}

const PathCtx = createContext<PathContextType>(
  null as unknown as PathContextType
);

export default PathCtx;
