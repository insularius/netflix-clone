export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  sid: string;
  add_info: {
    cool_down: string;
    cool_down_ending_date_time: string;
  };
}

export interface SignUpResponse {
  sid: string;
  add_info: {
    cool_down: string;
    cool_down_ending_date_time: string;
  };
}

export interface SendOtpResponse {
  redirect_uri: string;
  sid: string;
  add_info: { cool_down_ending_date_time: string };
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
  sid: string;
  add_info: {
    cool_down: string;
    cool_down_ending_date_time: string;
  };
  expire_date?: number; // set on front
}

export interface Profile {
  id?: string;
  bucket_id?: string;
  brand_id?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  mfa_type?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  city?: string;
  date_of_birth?: string;
  nickname?: string;
  email?: string;
  avatar?: { original: string; normal: string; thumbnail: string };
  last_password_update?: string;
}

export interface ProfileUpdateDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: "male" | "female";
  date_of_birth?: string;
  country?: string;
  city?: string;
  time_zone?: string;
  nickname?: string;
  phone_number?: string;
}

export type AuthSubjectValue = {
  profile: Profile;
  tokens: AuthTokens;
};

export interface ResetPasswordResponseDto {
  message: string;
  status: number;
  sid: string;
}
export type LoginPayloadType = { username: string; password: string };

export interface GriffonJwtDecoded {
  sub: string;
  roles: string[];
  email: string;
}

export interface ProfileCardInfoProps {
  handleFileChangeAndUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleProfileInfoChange: (name: string, value: string) => void;
  updateProfileInfo: () => void;
  handleDelete: () => void;
  handleOpenEmailModal: () => void;
  handleOpenPhoneModal: () => void;
  profile: Profile;
  avatarUrl: string | undefined;
  nicknameChanged: boolean;
}
export interface ProfileCardChangeInfoProps {
  profile: Profile;
  editing: boolean;
  handleProfileInfoChange: (name: string, value: string) => void;
  toggleEditing: () => void;
  handleButtonClick: () => void;
  country: string;
}
