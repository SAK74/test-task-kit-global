import type { RouteObject } from "react-router";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";

export const Paths = {
  root: "/",
  details: "/details",
} as const;

export const routes: RouteObject[] = [
  {
    index: true,
    path: Paths.root,
    element: <Home />,
  },
  {
    path: `${Paths.details}/:id`,
    element: <Details />,
  },
];
