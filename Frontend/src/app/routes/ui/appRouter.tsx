import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routes";

const router = createRouter({ routeTree });

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
