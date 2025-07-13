import { combineSlices, configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts.slice";
import { useDispatch, useSelector } from "react-redux";

export const makeStore = () =>
  configureStore({
    reducer: combineSlices(postsSlice),
  });

export type TypedStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<TypedStore["getState"]>;
export const useTypedSelector = useSelector.withTypes<RootState>();

export const useTypedDispatch = useDispatch.withTypes<TypedStore["dispatch"]>();
