export const CMS_ROOT = "https://naiza-cms.dar-dev.zone/api";
export const GRIFFON_TOKEN = "griffon";
export const BASE_GRIFFON_URL = "https://griffon.dar-qa.zone/api/v1";
export const GRIFFON_SECRET =
  "$2a$10$qC9dtMHqvgbA/Rn10UV49OY4Lp6yETBsNKPTAdp4mnQcVL/.bDbQS";
export const GRIFFON_SIGN_URL = "/oauth/sign";
export const GRIFFON_SIGNUP_URL = "/oauth/signup";
export const GRIFFON_PROFILE_URL = "/oauth/profile";
export const GRIFFON_VERIFY_URL = "/oauth/signup/verify";
export const GRIFFON_REGISTER_URL = "/oauth/register";
export const CODE = "000000";
export const TOKEN_STORAGE_KEY = "auth";
export const PROFILE_STORAGE_KEY = "dar-u-web-profile";
export const GRIFFON_TOKEN_URL = "/oauth/token";
export const PASSWORD_PAGE = "/signup/password";
export const PROFILE_PAGE = "/profile";
export const DASHBOARD_PAGE = "/dashboard";
export const GRIFFON_CHECK_URL = "/oauth/signup/check";
export const GRIFFON_BUCKET_ID = "3e80eca8-af51-4b51-8202-61400e5923dc";
export const GRIFFON_MY_CLIENT = "88d6972a-50b7-44e8-91a5-cc82b7186c0d";
export const GRIFFON_MY_BUCKET = "3e80eca8-af51-4b51-8202-61400e5923dc";
export const GRIFFON_MY_SECRET =
  "bnb1FbqsUiyFSR6YrtacT5hw2o7PEMrRYZchNql8uOoredDJcn7v4p4tksI4rEOI";
export const GRIFFON_PASSWORD_RESET_URL = "/oauth/password/reset";
export const GRIFFON_RESET_VERIFY = "/oauth/password/reset/verify";
export const GRIFFON_USER_EMAIL = "/oauth/user/email";
export const GRIFFON_EMAIL_VERIFY_CODE = "/oauth/user/email/code";
export const GRIFFON_RESET_PASSWORD = "/oauth/password/reset";
export const GRIFFON_PROFILE_AVATAR = "/oauth/profile/avatar";

export const SIGNUP_PARAMS = new URLSearchParams();
SIGNUP_PARAMS.append("client_id", GRIFFON_MY_CLIENT);
SIGNUP_PARAMS.append("client_secret", GRIFFON_MY_SECRET);
