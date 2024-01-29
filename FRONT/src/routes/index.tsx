import React, { useCallback } from "react";
import { BrowserRouter } from "react-router-dom";

import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { useAuth } from "../common/hooks";

export const Routes: React.FC = () => {
  const { authenticated } = useAuth();

  const Routes = useCallback(() => {
    if (authenticated) return <PrivateRoutes />;
    return <PublicRoutes />;
  }, [authenticated]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
