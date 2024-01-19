import { useContext } from "react";
import ExerciseCtx, { ClientContextType } from "./client-context";

export default function useClient(): ClientContextType {
  return useContext(ExerciseCtx);
}