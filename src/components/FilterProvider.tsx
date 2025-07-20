import {
  createContext,
  use,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

type ContextType = {
  filterByAuthor: boolean;
  setFilterByAuthor: Dispatch<SetStateAction<boolean>>;
  authorValue?: string;
  setAuthorValue: Dispatch<SetStateAction<string | undefined>>;

  filterByContent: boolean;
  setFilterByContent: Dispatch<SetStateAction<boolean>>;
  contentValue?: string;
  setContentValue: Dispatch<SetStateAction<string | undefined>>;
} | null;

export const FilterContext = createContext<ContextType>(null);

export const FilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filterByAuthor, setFilterByAuthor] = useState(false);
  const [authorValue, setAuthorValue] = useState<string>();
  const [filterByContent, setFilterByContent] = useState(false);
  const [contentValue, setContentValue] = useState<string>();
  return (
    <FilterContext
      value={{
        filterByAuthor,
        filterByContent,
        authorValue,
        contentValue,
        setAuthorValue,
        setContentValue,
        setFilterByAuthor,
        setFilterByContent,
      }}
    >
      {children}
    </FilterContext>
  );
};

export const useFilterCtx = () => {
  const ctx = use(FilterContext);
  if (!ctx) {
    throw new Error("Element is out of context...");
  }
  return ctx;
};
