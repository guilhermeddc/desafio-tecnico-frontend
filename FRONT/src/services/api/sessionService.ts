import { Session } from "../../common/interfaces/session";
import { api } from "../axios";

const signIn = async (data: Session): Promise<string> => {
  const { data: response } = await api.post("/login/", data);

  api.defaults.headers.Authorization = `Bearer ${response}`;

  localStorage.setItem("ada@token", response);

  return response;
};

const signOut = (): void => {
  localStorage.clear();
  api.defaults.headers.Authorization = "";
  window.location.href = "/";
};

export const sessionService = { signIn, signOut };
