import React from "react";
import { Outlet, useLocation } from "@tanstack/react-router";

export const Root: React.FC = () => {
  const location = useLocation();
  return <Outlet />;
};
