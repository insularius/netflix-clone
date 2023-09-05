import { SignUpResponse } from "./../../types/griffon";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {
  BASE_GRIFFON_URL,
  GRIFFON_SIGNUP_URL,
  SIGNUP_PARAMS,
} from "../../constants/constants";
import instance from "@/app/services/axiosInstance";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import testInstance from "@/app/services/axiosInstance";

export async function POST(req: NextRequest) {
  const data = await req.json();
  SIGNUP_PARAMS.append("username", data.username);
  try {
    const response = await axios.post<SignUpResponse>(
      BASE_GRIFFON_URL + GRIFFON_SIGNUP_URL,
      SIGNUP_PARAMS
    );
    console.log("Received response:", response.data);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status || 500,
      });
    }
    throw error;

    // if (axios.isAxiosError(error) && error.response?.status === 409) {
    //   res
    //     .status(409)
    //     .send("User already exists. Please, try with a different email.");
    // } else if (axios.isAxiosError(error) && error.response?.status === 400) {
    //   res.status(400).send("Seems invalid email or phone format, try again");
    // } else {
    //   res.status(500).send("Internal Server Error");
    // }
  }
}
