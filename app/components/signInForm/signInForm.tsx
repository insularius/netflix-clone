"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { LoginData, schema } from "@/app/types/loginData";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterResponse } from "@/app/types/griffon";
import {
  BASE_GRIFFON_URL,
  GRIFFON_MY_CLIENT,
  GRIFFON_MY_SECRET,
} from "@/app/constants/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store/store";
import { setSid } from "@/app/redux/auth/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const SignInForm = () => {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const getCookie = useCallback((name: string) => {
    if (typeof window === "undefined") {
      return;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    setValue,
    control,
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: getCookie("remembered_email"),
      rememberMe: getCookie("remember_me") === "true" || false,
      password: sessionStorage.getItem("saved_password") || "",
    },
  });
  const email = watch("email");
  const signinPass = async (
    username: string,
    password: string
  ): Promise<RegisterResponse> => {
    let url = BASE_GRIFFON_URL + "/oauth/token";
    const params = new URLSearchParams();
    params.append("client_id", GRIFFON_MY_CLIENT);
    params.append("client_secret", GRIFFON_MY_SECRET);
    params.append("grant_type", "password");
    params.append("username", username);
    params.append("password", password);
    try {
      const res = await axios.post<RegisterResponse>(url, params);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
      dispatch(setSid(res.data.sid));
      router.push("/videos");
      return res.data;
    } catch (e: any) {
      if (
        (axios.isAxiosError(e) && e.response?.status === 400) ||
        e.response?.status === 403
      ) {
        setError("password", {
          message: "Wrong password!",
        });
      }
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        setError("email", {
          message: "User doesn't exist",
        });
      } else {
        toast.error("An unknown error occured");
        console.log(e?.response?.data.message);
      }
      throw e;
    }
  };

  const onSubmit = async (values: LoginData) => {
    console.log(values);
    try {
      await signinPass(values.email, values.password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRememberMeChange = (checked: boolean) => {
    setValue("rememberMe", checked);
    document.cookie = `remember_me=${checked}; max-age=604800;`;
  };

  useEffect(() => {
    const rememberMe = getCookie("remember_me");
    if (rememberMe !== null) {
      setValue("rememberMe", rememberMe === "true");
    }
    const savedPassword = sessionStorage.getItem("saved_password");
    if (savedPassword) {
      setValue("password", savedPassword);
    }
  }, [getCookie, setValue]);

  useEffect(() => {
    if (watch("rememberMe")) {
      document.cookie = `remembered_email=${email}; max-age=604800;`;
    } else {
      document.cookie = "remembered_email=; max-age=0";
    }
  }, [email, watch]);

  return (
    <>
      <h1 style={{ color: "#fff", margin: "0px" }}>{t("login.signIn")}</h1>
      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <TextField
          {...register("email")}
          variant="outlined"
          margin="normal"
          label={t("login.emailOrPhone")}
          fullWidth
          name="email"
          autoComplete="email"
          helperText={errors.email?.message}
          sx={{
            background: "#333",
            "& label": { color: "#8c8c8c" },
            "& input": { color: "#8c8c8c" },
            "& .MuiFormHelperText-root": {
              color: "red",
              fontSize: "14px",
              fontStyle: "inherit",
            },
          }}
          InputLabelProps={{
            style: {
              color: "gray",
            },
          }}
        />

        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label={t("login.password")}
          type={showPassword ? "text" : "password"}
          helperText={errors.password?.message}
          sx={{
            background: "#333",
            "& label": { color: "#8c8c8c" },
            "& input": { color: "#8c8c8c" },
            "& .MuiFormHelperText-root": {
              color: "red",
              fontSize: "14px",
              fontStyle: "inherit",
            },
          }}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: {
              color: "gray",
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: "#e50914",
            "&:hover": { bgcolor: "#b5070c" },
          }}
        >
          {t("login.signIn")}
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#8c8c8c",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Controller
            name="rememberMe"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                color="primary"
                inputProps={{ "aria-label": "remember me checkbox" }}
                sx={{
                  "& .MuiSvgIcon-root": { color: "#8c8c8c" },
                  marginLeft: "-3px",
                  padding: 0,
                }}
                onChange={(e) => {
                  field.onChange(e);
                  handleRememberMeChange(e.target.checked);
                }}
              />
            )}
          />
          <Typography variant="body2">{t("login.rememberMe")}</Typography>
        </Box>
        <Typography variant="body2">
          <Link
            href={"/loginHelp"}
            sx={{
              textDecoration: "none",
              color: "#8c8c8c",
              cursor: "pointer",
              "&:hover": {
                borderBottom: "1px solid gray",
              },
            }}
          >
            {t("login.needHelp")}
          </Link>
        </Typography>
      </Box>
      <Box sx={{ marginTop: "100px", color: "#8c8c8c" }}>
        <Typography variant="body2">
          {t("login.newToService")}
          <Link
            style={{
              color: "white",
              cursor: "pointer",
              marginLeft: "5px",
            }}
            href={`/`}
          >
            {t("login.signUpNow")}
          </Link>
          .
        </Typography>
        <Typography variant="body2">
          {t("login.recaptchaNotice")}{" "}
          <Link style={{ cursor: "pointer" }}>{t("login.learnMore")}</Link>.
        </Typography>
      </Box>
    </>
  );
};

export default SignInForm;
