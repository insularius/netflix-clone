import { Category } from "@/app/types/firebase";
import { Typography, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import VideoModal from "../customModal/videoModal";
import { Show } from "@/app/types/firebase";
import { useDispatch } from "react-redux";
import { setAdminCode } from "@/app/redux/auth/auth";
import { AppDispatch } from "@/app/redux/store/store";
import { useRouter } from "next/navigation";
type Props = {
  videos: Show[];
  categories: Category[];
  activeCategory: number | null;
  selectedVideo: Show | null;
};

const VideoPanels: React.FC<Props> = ({
  videos,
  categories,
  activeCategory,
  selectedVideo,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [adminCode, setAdminCodeState] = useState("");
  const router = useRouter();

  const checkAdminCode = () => {
    dispatch(setAdminCode(adminCode))
      .then((result: any) => {
        if (result.payload === "admin") {
          console.log("if result payload === admin");
          console.log("Result payload login page: ", result.payload);
          router.push("/admin");
        }
      })
      .catch((error: any) => {
        console.log("Invalid code", error);
      });
  };

  const filteredVideos = videos.filter((video) =>
    video.categoryIds?.includes(`categoryId${activeCategory}`)
  );

  const selectedCategory = categories.find(
    (category) => category.id === activeCategory
  );
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);
  const [localSelectedVideo, setLocalSelectedVideo] = useState<Show | null>(
    null
  );
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null);

  const handleVideoClick = (videoUrl: string, video: Show, showId: number) => {
    setSelectedVideoUrl(videoUrl);
    setLocalSelectedVideo(video);
    setSelectedShowId(showId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVideoUrl(null);
    setModalOpen(false);
    setPlayingVideoUrl(null);
  };
  return (
    <Box>
      {activeCategory &&
        categories
          .filter((category) => category.id === activeCategory)
          .map((category) => (
            <Typography
              variant="h6"
              component="div"
              key={category.id}
              marginLeft={5}
              sx={{
                color: "white",
              }}
            >
              {category?.name}
            </Typography>
          ))}

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          margin: "100px 40px",
          gap: "20px",
        }}
      >
        {filteredVideos.map((video, index) => (
          <Box
            sx={{
              flex: "0 0 auto",
              width: "300px",
              height: "180px",
              position: "relative",
            }}
            key={video.title}
          >
            <Button
              onClick={() => handleVideoClick(video.url, video, video.id)}
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
            </Button>
          </Box>
        ))}
      </Box>
      {modalOpen && (
        <VideoModal
          open={modalOpen}
          onClose={handleCloseModal}
          videos={videos}
          category={selectedCategory}
          videoUrl={selectedVideoUrl}
          playingUrl={playingVideoUrl}
          setPlayingUrl={setPlayingVideoUrl}
          selectedVideo={selectedVideo}
          localSelectedVideo={localSelectedVideo}
          selectedShowId={selectedShowId}
        />
      )}
      <Box>
        <TextField
          label="Введи цифру 1"
          variant="outlined"
          value={adminCode}
          onChange={(e) => setAdminCodeState(e.target.value)}
          sx={{
            background: "#333",
            width: "10%",
            display: "flex",
            flexDirection: "column",
            "& label": { color: "#8c8c8c" },
            "& input": { color: "#8c8c8c" },
          }}
        />
        <Button onClick={checkAdminCode}>Клац</Button>
      </Box>
    </Box>
  );
};

export default VideoPanels;
