import * as yup from "yup";
export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  rememberMe: yup.boolean().optional(),
});
