import { combineSlices, configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts.slice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: combineSlices(postsSlice),
});

export type TypedStore = ReturnType<typeof store.getState>;

export const useTypedSelector = useSelector.withTypes<TypedStore>();

export const useTypedDispatch = useDispatch.withTypes<typeof store.dispatch>();
