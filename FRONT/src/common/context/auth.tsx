import React, { createContext, useState } from "react";
import { api } from "../../services/axios";

export interface IAuthContext {
  authenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [token, setToken] = useState(() => {
    const recoveryToken = localStorage.getItem("ada@token");

    if (recoveryToken) {
      api.defaults.headers.Authorization = `Bearer ${recoveryToken}`;
      return recoveryToken;
    }

    return "";
  });

  return (
    <AuthContext.Provider value={{ authenticated: !!token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
