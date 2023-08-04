import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  SvgIcon,
  TextField,
  Fade,
} from "@mui/material";
import Image from "next/image";
import { Category, VideoData } from "@/app/types/naiza";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import styles from "./videoModal.module.css";
import VideoPlayer from "../videoPlayer/videoPlayer";
import VideoInfoModal from "./videoInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../../redux/comments/comments";
import { AppDispatch, RootState } from "@/app/redux/store/store";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  category: Category | undefined;
  videos: VideoData[];
  onClick: (videoUrl: string) => void;
  videoUrl: string | null;
  playingUrl: string | null;
  setPlayingUrl: (url: string) => void;
};

const VideoModal: React.FC<ModalProps> = ({
  open,
  category,
  onClose,
  videos,
  onClick,
  videoUrl,
  playingUrl,
  setPlayingUrl,
}) => {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const comments = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value as string);
  };

  console.log(playingUrl, "playing url");
  console.log(videoUrl, "video url");

  const handleInfoClick = () => {
    setInfoModal(true);
  };
  const handleCloseModal = () => {
    setInfoModal(false);
  };
  const handlePlayClick = () => {
    if (videoUrl) {
      setPlayingUrl(videoUrl);
      setVideoPlaying(true);
    }
  };

  return (
    <>
      <Modal disablePortal open={open} onBackdropClick={onClose}>
        <Fade in={open}>
          <Box
            sx={{
              height: "90vh",
              width: "90%",
              margin: "40px auto",
              background: `url(/images/header-image.png) no-repeat center center / cover`,
              backgroundSize: "cover",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                width: "100%",
                color: "white",
                padding: "20px",
                gap: "30px",
                zIndex: "1",
              }}
            >
              {category && (
                <Typography fontWeight={700} variant="h5">
                  {category.attributes?.name}
                </Typography>
              )}
              <Select
                value={selectedGenre}
                onChange={handleGenreChange}
                sx={{
                  color: "#fff",
                  border: "1px solid white",
                  width: "120px",
                  height: "30px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  "& .MuiSvgIcon-root": {
                    fill: "white",
                  },
                  zIndex: 2,
                }}
                size="small"
              >
                <MenuItem disabled value="Genres">
                  Genres
                </MenuItem>
                <MenuItem value="historical">Historical</MenuItem>
                <MenuItem value="musical">Musical</MenuItem>
                <MenuItem value="criminal">Criminal</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                maxWidth: "30%",
                zIndex: 1,
                color: "white",
                marginLeft: "20px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                marginTop: "210px",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                qui ut, asperiores iste repellendus officiis quaerat nihil
                quisquam saepe, dsadsadasdasdsa sadasdas asdasdsdsadads asdas
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                marginTop: "30px",
                zIndex: 1,
                marginLeft: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  className={styles.buttonStyle}
                  onClick={handlePlayClick}
                  sx={{
                    zIndex: isVideoPlaying ? 1 : 3,
                    backgroundColor: "rgba(128, 128, 128, 0.7)",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                >
                  PLAY
                </Button>
                <Button
                  variant="contained"
                  onClick={handleInfoClick}
                  startIcon={<SvgIcon component={InfoIcon} />}
                  className={styles.buttonStyle}
                  sx={{
                    zIndex: isVideoPlaying ? 1 : 3,
                    backgroundColor: " rgba(128, 128, 128, 0.7)",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                >
                  More info
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingLeft: "10px",
                  backgroundColor: "rgba(128, 128, 128, 0.7)",
                  opacity: "70%",
                  width: "100px",
                  height: "35px",
                  borderLeft: "3px solid white",
                }}
              >
                <Typography variant="body1">18+</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: "70px",
                marginLeft: "20px",
                color: "#fff",
                zIndex: 1,
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>
                Popular on Netflix
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: "10px",
                marginLeft: "20px",
                marginRight: "20px",
                overflow: "auto",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 40,
                  left: 70,
                  width: "91%",
                  height: "80%",
                  zIndex: isVideoPlaying ? 2 : 1,
                }}
              >
                {playingUrl && <VideoPlayer url={playingUrl} />}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  width: "87%",
                  backgroundColor: "black",
                  color: "white",
                  zIndex: 2,
                  display: isVideoPlaying ? "block" : "none",
                  maxHeight: "20vh",
                  overflow: "auto",
                }}
              >
                <Typography>Video Comments:</Typography>
                {comments.map((comment, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{comment}</Typography>
                    <Button onClick={() => dispatch(deleteComment(index))}>
                      Delete
                    </Button>
                  </Box>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target as typeof e.target & {
                      0: { value: string };
                    };
                    dispatch(addComment(input[0].value));
                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      name="comment"
                      type="text"
                      placeholder="Add comment"
                      required
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        style: { backgroundColor: "white", color: "black" },
                      }}
                    />
                    <Button type="submit">Send</Button>
                  </Box>
                </form>
              </Box>
              {videos.map((video) => (
                <Box
                  key={video.id}
                  sx={{
                    display: "flex",
                    flex: "0 0 auto",
                    width: "270px",
                    height: "160px",
                    zIndex: "1",
                    bottom: "5px",
                    marginRight: "5px",
                    alignSelf: "flex-end",
                    position: "relative",
                  }}
                >
                  <Button
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src="/images/feature-4.png"
                      alt={video.attributes.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <Image
                      src="/images/netflix-logo.webp"
                      alt=""
                      width={30}
                      height={30}
                      style={{
                        zIndex: "1",
                        position: "absolute",
                        top: "10px",
                        left: "0px",
                      }}
                    />
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
      {infoModal && (
        <VideoInfoModal
          open={infoModal}
          onClose={handleCloseModal}
          videos={videos}
          category={category}
          onClick={onClick}
          videoUrl={videoUrl}
          playingUrl={playingUrl}
          setPlayingUrl={setPlayingUrl}
        />
      )}
    </>
  );
};

export default VideoModal;
