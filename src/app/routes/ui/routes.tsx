import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "./__root";
import { homePage } from "@pages/homePage";
import { FallbackInternal, FallbackNotFound } from "@shared/ui/fallback";

const rootRoute = createRootRoute({
  component: Root,
  notFoundComponent: FallbackNotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: homePage,
  errorComponent: FallbackInternal,
});

export const routeTree = rootRoute.addChildren([indexRoute]);
