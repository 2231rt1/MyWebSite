import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homePage } from "@pages/homePage";
import { Fallback } from "@shared/ui/fallback/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: homePage(),
    errorElement: <Fallback />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
