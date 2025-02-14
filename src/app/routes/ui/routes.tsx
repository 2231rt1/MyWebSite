import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "./__root";

import { homePage } from "@pages/HomePage";
import { AuthForm } from "@pages/AuthForm";
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

const SignInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/SignIn",
  component: AuthForm,
  errorComponent: FallbackInternal,
});

const SignUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/Signup",
  component: AuthForm,
  errorComponent: FallbackInternal,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  SignInRoute,
  SignUpRoute,
]);
