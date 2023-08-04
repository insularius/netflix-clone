import { VideoResponse } from "../types/naiza";
import axios from "axios";

export const getVideoList = () => {
  return axios
    .get<VideoResponse>(`api/videos`)
    .then((response) => response.data);
};
