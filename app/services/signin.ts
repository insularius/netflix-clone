import axios from "axios";
import { SignUpResponse } from "../types/griffon";

export const signinService = async (username: string) => {
  const response = await axios.post<SignUpResponse>(`api/signin`, {
    username,
  });
  return response.data;
};
