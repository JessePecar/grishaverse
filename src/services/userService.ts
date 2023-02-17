import { NewUser } from '@/stores/interfaces';
import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import {CreateAccount, Login} from '@/handlers';

const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '{}'));



//Going to use the email as the password in this case so people don't freak out.
const login = async (password: string, email: string) => {
  let user = await Login(email, password);
  console.log('called log in, with result ' + JSON.stringify(user));
  if (user){
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
    
  return user;
};

const logout = () => {
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/Login');
};

const getAll = () => {
  return;
};

const create = async (user: NewUser) => {
  let newUser = await CreateAccount(user);
  console.log('called create account, with result ' + JSON.stringify(newUser));
  if (newUser){
    userSubject.next(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }
    
  return newUser;
}

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value },
  login, 
  logout,
  getAll,
  create,
}