import { userService } from "./userService"

const authHeader = (url: string): HeadersInit => {
  const user = userService.userValue;
  const isLoggedIn = user && user.authdata; //TODO: come back to change this to what it should be
  const isApiUrl = url.includes(`jessepecar.com`); //This means it is going to my api
  if (isLoggedIn && isApiUrl) {
    return {
      Authorization: `Bearer: ${user.authdata}`,
    }
  } else {
    return {}; //TODO: use an application token/guid to make sure this isn't being hit outside of the application
  }
}

function handleResponse<TResponse>(response: Response): Promise<TResponse | never> {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText; //Probably want to use the status text for most things
      return Promise.reject(error);
    }

    return data;
  });
}

export async function get<TResponse>(url: string): Promise<TResponse> {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(url),
  }
  
  return await fetch(url, requestOptions).then(handleResponse<TResponse>);
}

export async function post<TResponse>(url: string, body: any): Promise<TResponse> {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',  ...authHeader(url)},
    body: JSON.stringify(body),
  }
  
  return await fetch(url, requestOptions).then(handleResponse<TResponse>);
}

export async function  put<TResponse>(url: string, body: any): Promise<TResponse> {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader(url) },
      body: JSON.stringify(body)
  };
  return await fetch(url, requestOptions).then(handleResponse<TResponse>);    
}