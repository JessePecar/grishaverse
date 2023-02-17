import { userService } from "./userService"
import https from 'https';
import axios, { AxiosRequestConfig, AxiosResponse, } from 'axios';

const baseUrl = 'https://localhost:7085';

const authHeader = (url: string): string => {
  const user = userService.userValue;
  const isLoggedIn = user && user.authdata; //TODO: come back to change this to what it should be
  const isApiUrl = url.includes(`jessepecar.com`); //This means it is going to my api
  if (isLoggedIn && isApiUrl) {
    return `Bearer: ${user.token}`;
  } else {
    return ''; //TODO: use an application token/guid to make sure this isn't being hit outside of the application
  }
}

function handleResponse<TResponse>(response: AxiosResponse<TResponse, any>): TResponse | PromiseLike<TResponse> {
  console.log('Response is being handled');
  if (response.status !== 200) {
    console.log('Returning a blank object');
    return {} as TResponse;
  }
  console.log(JSON.stringify(response.data));
  return response.data;
}

export async function get<TResponse>(url: string): Promise<TResponse | undefined> {
  const requestOptions: AxiosRequestConfig = {
    method: 'GET',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
    headers: {
      'Authorization': authHeader(url)
    }
  }
  
  var result = await axios.get<TResponse>(`${baseUrl}/${url}`, requestOptions).then(handleResponse<TResponse>).catch(err => {
    console.error(err);
    return undefined;
  });

  return result;  
}

export async function post<TResponse>(url: string, body: any): Promise<TResponse | undefined> {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',  'Authorization': authHeader(url)},
    body: JSON.stringify(body),
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
  }

  console.log('RequestOptions created');
  var result = axios.post<TResponse>(`${baseUrl}/${url}`, body, requestOptions).then(handleResponse<TResponse>).catch(err => {
    console.error(err);
    return undefined;
  });
  console.log(result);
  return result;
}

export async function put<TResponse>(url: string, body: any): Promise<TResponse | undefined> {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader(url) },
      body: JSON.stringify(body),
      httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
  };

  var result = await axios.put<TResponse>(`${baseUrl}/${url}`, body, requestOptions).then(handleResponse<TResponse>).catch(err => {
    console.error(err);
    return undefined;
  });
  
  return result;   
}