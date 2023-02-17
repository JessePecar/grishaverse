import { post } from "@/services/fetchService";
import { User } from "@/stores/interfaces/User";


export const Login = async (email: string, password: string) => {
  console.log('Api call to log in started');
  return await post<User>(`Authenticate`, {email, password}).then(res => res);
};