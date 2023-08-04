import { Box } from "@mui/system";
import {
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
  Fade,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import styles from "./videoInfoModal.module.css";
import { Category, VideoData } from "@/app/types/naiza";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../../redux/likes/likes";
import { RootState } from "@/app/redux/store/store";
import { AppDispatch } from "@/app/redux/store/store";
import { toggleCheck } from "@/app/redux/check/check";

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

const VideoInfoModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onClick,
  videoUrl,
  videos,
  playingUrl,
  setPlayingUrl,
  category,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLiked = useSelector((state: RootState) => state.likes.isLiked);
  const isCheked = useSelector((state: RootState) => state.check.isChecked);

  const [selectedSeason, setSelectedSeason] = useState("s1");
  const handleSeasonChange = (event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value);
  };

  return (
    <>
      <Modal open={open} closeAfterTransition onClose={onClose}>
        <Fade in={open}>
          <Box
            sx={{
              overflowY: "auto",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "700px",
                height: "auto",
                margin: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Image
                  src="/images/witcher-cover.webp"
                  alt=""
                  width={700}
                  height={400}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "30px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    className={styles.buttonStyle}
                    sx={{
                      backgroundColor: "rgba(128, 128, 128, 0.7)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                  >
                    PLAY
                  </Button>
                  <IconButton
                    onClick={() => dispatch(toggleCheck())}
                    sx={{
                      color: "white",
                    }}
                  >
                    {isCheked ? (
                      <CheckCircleIcon />
                    ) : (
                      <CheckCircleOutlineIcon />
                    )}
                  </IconButton>
                  <IconButton
                    sx={{
                      color: "white",
                    }}
                    onClick={() => dispatch(toggleLike())}
                  >
                    {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                  </IconButton>
                </Box>
                <Box sx={{ position: "absolute", bottom: 80, left: 30 }}>
                  <Image
                    src="/images/the-witcher.png"
                    alt=""
                    width={200}
                    height={76}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 160,
                    left: 25,
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <Image
                    src="/images/netflix-logo.webp"
                    alt=""
                    width={25}
                    height={25}
                  ></Image>
                  <Typography variant="button" fontSize={10}>
                    series
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "white",
                  }}
                >
                  <IconButton
                    onClick={onClose}
                    size="small"
                    className={styles.closeIcon}
                    sx={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": { backgroundColor: "black" },
                    }}
                  >
                    <CloseIcon color="inherit" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(35, 35, 35, 1)",
                height: "auto",
                width: "700px",
                margin: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  margin: "40px 30px",
                }}
              >
                <Box
                  sx={{
                    flex: "0 0 70%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="rgb(10, 195, 10);" variant="body1">
                      99% match
                    </Typography>
                    <Typography>2023</Typography>
                    <Typography>3 seasons</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        border: "1px solid gray",
                        fontSize: "8px",
                        padding: "0px 6px",
                      }}
                    >
                      HD
                    </Typography>
                    <Typography>Dolby Atmos</Typography>
                    <Typography>sub</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        border: "1px solid gray",
                        padding: "0px 6px",
                        fontSize: "10px",
                      }}
                    >
                      18+
                    </Typography>
                    <Typography variant="caption">language</Typography>
                  </Box>
                  <Box sx={{ marginTop: "20px" }}>
                    <Typography variant="body2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repellendus ex cumque iste sint a totam saepe tempora
                      minus fuga, doloremque eos expedita veritatis quas
                      corrupti sunt quam ipsam, accusamus odit?
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flex: "0 0 30%",
                    paddingLeft: "20px",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Typography variant="caption">
                    <span className={styles.genreColor}>Cast:</span> Henry
                    Cavill, Freya Allan, Anya Chalotra
                  </Typography>
                  <Typography variant="caption">
                    <span className={styles.genreColor}>Genres:</span> Action,
                    Adventure, Drama, Fantasy
                  </Typography>
                  <Typography variant="caption">
                    <span className={styles.genreColor}>This show is:</span>{" "}
                    Magnificent
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "50px 30px 0px 30px",
                  color: "white",
                }}
              >
                <Typography variant="h6">Episodes</Typography>
                <FormControl>
                  <Select
                    labelId="season-select-label"
                    id="season-select"
                    name="season"
                    defaultValue="s1"
                    value={selectedSeason}
                    onChange={handleSeasonChange}
                    className={styles.select}
                    sx={{
                      color: "white",
                      fontSize: "14px",
                      "& .MuiSvgIcon-root": {
                        fill: "white",
                      },
                    }}
                  >
                    <MenuItem value="s1">Season 1</MenuItem>
                    <MenuItem value="s2">Season 2</MenuItem>
                    <MenuItem value="s3">Season 3</MenuItem>
                    <MenuItem value="s4">Season 4</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  marginLeft: "30px",
                  color: "white",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography>Season {selectedSeason.slice(1)}:</Typography>
                <Typography
                  sx={{
                    border: "1px solid gray",
                    padding: "0px 6px",
                    fontSize: "10px",
                  }}
                >
                  16+
                </Typography>
                <Typography variant="caption">language</Typography>
              </Box>

              {videos.map((video, index) => (
                <>
                  <Box className={styles.videosContainer} key={video.id}>
                    <Typography>{index + 1}</Typography>
                    <Box sx={{ width: "auto", height: "auto" }}>
                      <Image
                        src="/images/witcher-cover.webp"
                        alt={video.attributes.title}
                        width={194}
                        height={109}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "10px 0px 10px 10px",
                          paddingRight: "20px",
                        }}
                      >
                        <Typography>Episode {index + 1}</Typography>
                        <Typography>2{index + 1}m</Typography>
                      </Box>
                      <Typography
                        sx={{ marginLeft: "10px", marginRight: "0px" }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </Typography>
                    </Box>
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default VideoInfoModal;
