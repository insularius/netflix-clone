"use client";
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
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../../redux/likes/likes";
import { RootState } from "@/app/redux/store/store";
import { AppDispatch } from "@/app/redux/store/store";
import { toggleCheck } from "@/app/redux/check/check";
import { Category, Show, Episode } from "@/app/types/firebase";
import VideoPlayer from "../videoPlayer/videoPlayer";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  closeVideoModal: () => void;
  openVideoModal: boolean;
  videoUrl: string | null;
  playingUrl: string | null;
  setPlayingUrl: (url: string) => void;
  selectedShowId: number | null;
  handlePlayClick: () => void;
  videoData: Show | null;
  categories: Category[];
  episodesData: Episode[];
  onSeasonChange: (event: SelectChangeEvent<string>) => void;
  selectedSeason: string;
};
const VideoInfoModal: React.FC<ModalProps> = ({
  open,
  onClose,
  openVideoModal,
  closeVideoModal,
  videoUrl,
  playingUrl,
  setPlayingUrl,
  selectedShowId,
  handlePlayClick,
  videoData,
  onSeasonChange,
  episodesData,
  categories,
  selectedSeason,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLiked = useSelector((state: RootState) => state.likes.isLiked);
  const isCheked = useSelector((state: RootState) => state.check.isChecked);

  const generateSeasonsArray = (num: number): string[] => {
    return Array.from({ length: num }, (_, i) => `S${i + 1}`);
  };

  const getSeasonLabel = (season: string): string => {
    const seasonNumber = season.slice(1);
    return `Season ${seasonNumber}`;
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
                  src={videoData?.thumbnail!}
                  alt=""
                  width={700}
                  height={400}
                  objectFit="cover"
                  objectPosition="center"
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
                    onClick={handlePlayClick}
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
                  {selectedShowId === 1 ? (
                    <Image
                      src="/images/the-witcher.png"
                      alt=""
                      width={200}
                      height={76}
                    />
                  ) : null}
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
                      "&:hover": { backgroundColor: "white", color: "black" },
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
                      {videoData?.match} match
                    </Typography>
                    <Typography>{videoData?.year}</Typography>
                    <Typography>{videoData?.seasons} seasons</Typography>
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
                    <Box
                      sx={{
                        position: "absolute",
                        top: 40,
                        left: 150,
                        width: "300px",
                        height: "300px",
                      }}
                    >
                      {playingUrl && (
                        <VideoPlayer
                          url={playingUrl}
                          isOpen={openVideoModal}
                          onClose={closeVideoModal}
                        />
                      )}
                    </Box>
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
                      {videoData?.description}
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
                    <span className={styles.genreColor}>Cast: </span>
                    {videoData?.cast}
                  </Typography>
                  <Typography variant="caption">
                    <span className={styles.genreColor}>Genres: </span>
                    {categories.map((category, index) => (
                      <span key={index}>
                        {category.name}
                        {index !== categories.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </Typography>
                  <Typography variant="caption">
                    <span className={styles.genreColor}>This show is: </span>
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
                    value={selectedSeason}
                    // onChange={handleSeasonChange}
                    onChange={onSeasonChange}
                    className={styles.select}
                    sx={{
                      color: "white",
                      fontSize: "14px",
                      "& .MuiSvgIcon-root": {
                        fill: "white",
                      },
                    }}
                  >
                    {videoData &&
                      generateSeasonsArray(videoData.seasons).map((season) => (
                        <MenuItem key={season} value={season}>
                          {getSeasonLabel(season)}
                        </MenuItem>
                      ))}
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
              {episodesData.map((episode, index) => (
                <>
                  <Box className={styles.videosContainer} key={index}>
                    <Typography>{index + 1}</Typography>
                    <Box sx={{ width: "auto", height: "auto" }}>
                      <Image
                        src={episode.thumbnail}
                        alt=""
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
                          paddingRight: "10px",
                        }}
                      >
                        <Typography>{episode.title}</Typography>
                        <Typography>{episode.duration}</Typography>
                      </Box>
                      <Typography
                        sx={{
                          marginLeft: "10px",
                          marginRight: "0px",
                          color: "rgb(190,190,190)",
                        }}
                      >
                        {episode.description}
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
