import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FilterState } from "@/types/event";
import { useQuerySync } from "@/hooks/useQuerySync";

export const DEFAULT: FilterState = {
  q: "",
  eventType: "All",
  category: "All",
  sortBy: "start",
};

type FilterCtx = {
  filters: FilterState;
  setFilters: (updater: (curr: FilterState) => FilterState) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterCtx | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT);
  useQuerySync(filters, setFilters); // keep URL <-> state in sync

  const resetFilters = () => setFilters(() => DEFAULT);

  const value = useMemo(() => ({ filters, setFilters, resetFilters }), [filters]);
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export const useFilterCtx = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterCtx must be used within FilterProvider");
  return ctx;
};
