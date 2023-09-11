"use client";
import React, { useEffect, useState } from "react";
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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import styles from "./videoModal.module.css";
import VideoPlayer from "../videoPlayer/videoPlayer";
import VideoInfoModal from "./videoInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../../redux/comments/comments";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import { Category, Episode, Show } from "@/app/types/firebase";
import db from "@/app/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  category: Category | undefined;
  videos: Show[];
  videoUrl: string | null;
  playingUrl: string | null;
  setPlayingUrl: (url: string) => void;
  selectedVideo: Show | null;
  localSelectedVideo: Show | null;
  selectedShowId: number | null;
};

const VideoModal: React.FC<ModalProps> = ({
  open,
  category,
  onClose,
  videos,
  // onClick,
  videoUrl,
  playingUrl,
  setPlayingUrl,
  selectedVideo,
  localSelectedVideo,
  selectedShowId,
}) => {
  const [selectedGenre, setSelectedGenre] = useState("Genres");
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const comments = useSelector((state: RootState) => state.comments);
  const dispatch = useDispatch<AppDispatch>();
  const bg = localSelectedVideo?.thumbnail || "defaultThumbnail.jpg";
  const [selectedSeason, setSelectedSeason] = useState("S1");
  const [episodesData, setEpisodesData] = useState<Episode[]>([]);
  const [videoData, setVideoData] = useState<Show | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (selectedShowId === null) return;

      const videoDocRef = doc(db, "shows", `showId${selectedShowId}`);
      const videoSnapshot = await getDoc(videoDocRef);

      if (videoSnapshot.exists()) {
        setVideoData(videoSnapshot.data() as Show);
      }
    };

    fetchVideoData();
  }, [selectedShowId]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoriesData: Category[] = [];
      if (videoData !== null) {
        for (let categoryId of videoData.categoryIds) {
          const categoriesDocRef = doc(db, "categories", categoryId);
          const categoriesSnapshot = await getDoc(categoriesDocRef);
          if (categoriesSnapshot.exists()) {
            categoriesData.push(categoriesSnapshot.data() as Category);
          }
        }
        setCategories(categoriesData);
      }
    };
    fetchCategoryData();
  }, [videoData]);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      const episodesCollectionRef = collection(
        db,
        `shows/showId${selectedShowId}/seasons/${selectedSeason}/episodes`
      );
      const episodesSnapshot = await getDocs(episodesCollectionRef);

      const episodes: Episode[] = [];
      episodesSnapshot.forEach((doc) => {
        const episodeData = doc.data() as Episode;
        episodes.push(episodeData);
      });
      setEpisodesData(episodes);
    };

    fetchEpisodesData();
  }, [selectedSeason]);

  const handleSeasonChange = (event: SelectChangeEvent<string>) => {
    setSelectedSeason(event.target.value);
  };

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value);
  };

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
      setVideoModal(true);
    }
  };
  const handleCloseVideoModal = () => {
    setVideoModal(false);
    setVideoPlaying(false);
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
              background: `url(${bg}) no-repeat center center / cover`,
              backgroundSize: "cover",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                color: "white",
                padding: "20px",
                gap: "30px",
                zIndex: "1",
              }}
            >
              {category && (
                <Typography fontWeight={700} variant="h5">
                  {category.name}
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
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: "210px",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                {localSelectedVideo?.description}
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
              {playingUrl && (
                <VideoPlayer
                  url={playingUrl}
                  isOpen={videoModal}
                  onClose={handleCloseVideoModal}
                />
              )}
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
                      src={video.thumbnail}
                      alt={video.title}
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
                    <Box
                      sx={{ position: "absolute", bottom: 30, left: 20 }}
                    ></Box>
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
          closeVideoModal={handleCloseVideoModal}
          openVideoModal={videoModal}
          videoUrl={videoUrl}
          playingUrl={playingUrl}
          setPlayingUrl={setPlayingUrl}
          selectedShowId={selectedShowId}
          handlePlayClick={handlePlayClick}
          videoData={videoData}
          categories={categories}
          episodesData={episodesData}
          onSeasonChange={handleSeasonChange}
          selectedSeason={selectedSeason}
        />
      )}
    </>
  );
};

export default VideoModal;
