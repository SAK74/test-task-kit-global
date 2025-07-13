"use client";
import { makeStore, type TypedStore } from "@/store";
import { initiate } from "@/store/posts.slice";
import { FC, PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<TypedStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initiate());
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
