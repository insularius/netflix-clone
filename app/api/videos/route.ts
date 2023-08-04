import { VideoResponse } from "../../types/naiza";
import axios from "axios";
import { CMS_ROOT } from "../../constants/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  console.log(category);
  const token =
    "f3ee8fb51fc7bdbd822d7c903cfc3d01936381e093303b78bca3ecfa7f4f053bf9e636486e17542020f531195b580a5ade4ecda931edd82dbcf6bdb7d093ee2a6bc8359ce92257a564495673aa39d6498fead9356b631400b09070db7664883e15ae2ec7aa0d9621e0ac9b8aad43a1f68f463c924e663f0ea2573dc41f2b3451";
  const data = await axios
    .get<VideoResponse>(`${CMS_ROOT}/video-contents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);

  return NextResponse.json(data);
}
