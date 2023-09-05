import axios from "axios";
import { SignUpResponse } from "../types/griffon";

export const signupService = async (username: string) => {
  const response = await axios.post<SignUpResponse>(`api/signup`, {
    username,
  });
  return response.data;
};
