import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { post } from './fetchService';
const baseUrl = `auth.jessepecar.com/User`;
const userSubject = new BehaviorSubject(typeof(window) && JSON.parse(localStorage.getItems('user')));



//Going to use the email as the password in this case so people don't freak out.
const login = (userName: string, email: string) => {
  return post<{authData: string}>(`${baseUrl}/Authenticate`, {
    userName,
    email
  }).then(user => {
    user.authData = window.btoa(`${userName}:${email}`);
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });
};

const logout = () => {
  localStorage.removeItem('user');
  userSubject.next(null);
  Router.push('/Login');
};

const getAll = () => {
  return;
};

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value },
  login, 
  logout,
  getAll,
}