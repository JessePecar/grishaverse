import { post } from "@/services/fetchService";
import { User } from "@/stores/interfaces/User";
import { NextApiRequest, NextApiResponse } from "next";

// const baseUrl = process.env.API_URL;
const baseUrl = 'http://localhost:5085';

const login = (request: NextApiRequest, response: NextApiResponse) => {
  return post<User>(`${baseUrl}/Authenticate`, request.body);
};

export default login;