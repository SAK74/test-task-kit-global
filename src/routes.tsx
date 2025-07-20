import type { RouteObject } from "react-router";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Spinner";

const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home }))
);
const Details = lazy(() =>
  import("./pages/Details").then((m) => ({ default: m.Details }))
);

export const Paths = {
  root: "/",
  details: "/details",
} as const;

export const routes: RouteObject[] = [
  {
    index: true,
    path: Paths.root,
    element: (
      <Suspense fallback={<Spinner className="mx-auto my-[10%]" />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: `${Paths.details}/:id`,
    element: (
      <Suspense fallback={<Spinner className="mx-auto my-[10%]" />}>
        <Details />
      </Suspense>
    ),
  },
];
