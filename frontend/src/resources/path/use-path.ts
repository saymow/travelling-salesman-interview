import { useContext } from "react";
import PathCtx, { PathContextType } from "./path-context";

export default function usePath(): PathContextType {
  return useContext(PathCtx);
}