import { CMS_ROOT } from "./../constants/constants";
import { CategoriesResponse } from "../types/naiza";
import axios from "axios";

export const getCategoriesList = () => {
  return axios
    .get<CategoriesResponse>(`${CMS_ROOT}/video-categories`)
    .then((response) => response.data);
};
