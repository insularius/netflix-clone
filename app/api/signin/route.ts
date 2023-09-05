import { BASE_GRIFFON_URL, GRIFFON_MY_CLIENT } from "@/app/constants/constants";
import { SignUpResponse } from "@/app/types/griffon";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

//username: string
export async function POST(req: NextRequest) {
  const data = await req.json();
  let url = BASE_GRIFFON_URL + `/oauth/helpers/signin_type?sid=`;
  const params = new URLSearchParams();
  params.append("client_id", GRIFFON_MY_CLIENT);
  params.append("username", data.username);
  try {
    const res = await axios.post<SignUpResponse>(url, params);
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
    return NextResponse.json(res.data);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      console.log("User not found");
      return;
    }
    throw e;
  }
}

// async function signin(username: string) {
//   let url = BASE_GRIFFON_URL + `/oauth/helpers/signin_type?sid=`;
//   const params = new URLSearchParams();
//   params.append("client_id", GRIFFON_MY_CLIENT);
//   params.append("username", username);
//   try {
//     const res = await axios.post<SignUpResponse>(url, params);
//     setSid(res.data.sid);
//     if (res.status !== 200 && res.status !== 201) {
//       throw new Error(`Unexpected response status: ${res.status}`);
//     }
//     const userExist = await checkIfUserExists(email);
//     setIsUserExist(userExist);
//     console.log(userExist);
//   } catch (e) {
//     if (axios.isAxiosError(e) && e.response?.status === 404) {
//       setIsUserNotFound(true);
//       setIsUserExist(false);
//       toast.error("User not found");
//       return;
//     } else {
//       console.error(e);
//     }
//   }
// }
