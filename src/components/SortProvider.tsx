"use client";

import {
  createContext,
  use,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

export type Sort = "title" | "date" | "author";
export type SortOrder = "asc" | "dsc";

type ContextType = {
  sortBy?: Sort;
  setSortBy: Dispatch<SetStateAction<Sort | undefined>>;
  sortDir?: SortOrder;
  setSortDir: Dispatch<SetStateAction<SortOrder | undefined>>;
} | null;

export const SortContext = createContext<ContextType>(null);

export const SortProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sortBy, setSortBy] = useState<Sort>();
  const [sortDir, setSortDir] = useState<SortOrder>();
  return (
    <SortContext value={{ sortBy, setSortBy, sortDir, setSortDir }}>
      {children}
    </SortContext>
  );
};

export const useSortCtx = () => {
  const ctx = use(SortContext);
  if (!ctx) {
    throw new Error("Element is out of context...");
  }
  return ctx;
};
