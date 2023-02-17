import { UserContext } from "@/stores/interfaces/UserContext";

export interface User{
  isAuthorized: boolean;
  token: string;
  userContext: UserContext;
}