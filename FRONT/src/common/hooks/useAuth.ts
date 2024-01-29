import { useContext } from "react";

import { AuthContext, AuthProvider, IAuthContext } from "../context/auth";

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
