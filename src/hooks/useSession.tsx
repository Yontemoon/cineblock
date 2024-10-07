import { useContext } from "react";
import {
  SupabaseContext,
  SupabaseContextType,
} from "../context/SessionContext";

export const useSession = () => {
  return useContext(SupabaseContext) as SupabaseContextType;
};
