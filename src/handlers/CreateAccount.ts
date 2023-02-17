import { post } from "@/services/fetchService";
import { NewUser } from "@/stores/interfaces/NewUser";
import { User } from "@/stores/interfaces/User";


export const CreateAccount = async (user: NewUser) => {
  console.log('Api call to create account started');
  return await post<User>('', user).then(res => res);
};