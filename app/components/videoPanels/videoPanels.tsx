import { Category, VideoData } from "@/app/types/naiza";
import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import VideoModal from "../customModal/videoModal";
import VideoPlayer from "../videoPlayer/videoPlayer";
type Props = {
  videos: VideoData[];
  categories: Category[];
  activeCategory: number | null;
};

const VideoPanels: React.FC<Props> = ({
  videos,
  categories,
  activeCategory,
}) => {
  const filteredVideos = videos.filter((video) => video.id === activeCategory);
  const selectedCategory = categories.find(
    (category) => category.id === activeCategory
  );
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
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
              {category.attributes?.name}
            </Typography>
          ))}

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          width: "900px",
          margin: "100px 40px",
          gap: "20px",
        }}
      >
        {filteredVideos.map((video) => (
          <Box
            sx={{
              flex: "0 0 auto",
              width: "300px",
              height: "180px",
              position: "relative",
            }}
            key={video.id}
          >
            <Button
              onClick={() => handleVideoClick(video.attributes.video_url)}
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
                height={40}
                style={{
                  zIndex: "1",
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                }}
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
          onClick={handleVideoClick}
          videoUrl={selectedVideoUrl}
          playingUrl={playingVideoUrl}
          setPlayingUrl={setPlayingVideoUrl}
        />
      )}
    </Box>
  );
};

export default VideoPanels;
