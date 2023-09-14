"use client";
import {
  Button,
  Container,
  Typography,
  Link,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthorized,
  getProfile,
  setProfile,
  resetState,
} from "../../redux/auth/auth";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import { deleteAvatar, updateAvatar } from "@/app/types/authService";
import dynamic from "next/dynamic";

const Ava = dynamic(() => import("@mui/material/Avatar"), { ssr: false });

const SignupFormInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.auth.profile);

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("fileupload", file);
      const avatarRes = await updateAvatar(formData);
      await dispatch(
        setProfile({
          ...profile,
          avatar: {
            original: `${avatarRes.original}?timestamp=${Date.now()}`,
            normal: avatarRes.normal,
            thumbnail: avatarRes.thumbnail,
          },
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    router.push("/videos");
  };
  const logoutUser = () => {
    dispatch(setIsAuthorized(false));
    dispatch(resetState());
  };

  const handleDelete = async () => {
    await deleteAvatar();
    await getProfile();
    dispatch(
      setProfile({
        ...profile,
        avatar: { original: "", normal: "", thumbnail: "" },
      })
    );
  };

  const handleFileChangeAndUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.files);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      await handleUpload(file);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={1}
        sx={{
          borderBottom: "1px grey",
          height: "90px",
          display: "flex",
          marginBottom: "40px",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt=""
                width={150}
                height={40}
                style={{ cursor: "pointer" }}
                onClick={logoutUser}
              />
            </Link>
          </Box>
          <Link
            color="inherit"
            sx={{
              textTransform: "none",
              textDecoration: "none",
              fontFamily: "sans-serif",
              cursor: "pointer",
            }}
            onClick={logoutUser}
          >
            Sign In
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            height: "300px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle1">Step 3 of 3</Typography>
          <Typography variant="h4" sx={{ textAlign: "left", fontWeight: 600 }}>
            Welcome back!
          </Typography>
          <Typography variant="h4" sx={{ textAlign: "left", fontWeight: 600 }}>
            Joining Netflix is easy.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            Enter your nickname and upload profile picture.
          </Typography>
          <input
            id="avatar-input"
            type="file"
            onChange={handleFileChangeAndUpload}
          />
          <Button variant="contained" fullWidth onClick={handleClick}>
            NEXT
          </Button>
          <Ava src={profile?.avatar?.original} alt="" />
        </Box>
      </Container>
      <Box sx={{ padding: 3, backgroundColor: "#f7f7f7" }}>
        <Typography variant="body2">
          Popular questions and answers here.
        </Typography>
      </Box>
    </Box>
  );
};
export default SignupFormInfo;
