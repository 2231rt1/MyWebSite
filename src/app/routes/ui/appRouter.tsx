import { routeTree } from "./routes";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const router = createRouter({ routeTree });

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
