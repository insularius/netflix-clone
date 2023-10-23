"use client";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import VideoPanels from "../../components/videoPanels/videoPanels";
import VideosNavbar from "../../components/videosNavbar/videosNavbar";
import { Category } from "../../types/firebase";
import { getVideosFromFirebase } from "../../services/getVideosFromFirebase";
import { getCategoriesFromFirebase } from "../../services/getCategoriesFromFirebase";
import { Show } from "../../types/firebase";
const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [videoData, setVideoData] = useState<Show[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Show | null>(null);
  console.log("Selected video: ", selectedVideo);
  const handleCategoryClick = (categoryId: number) => {
    console.log("handled");
    setActiveCategory(categoryId);
    const matchingVideo = videoData.find((video) =>
      video.categoryIds?.includes(`categoryId${categoryId}`)
    );
    if (matchingVideo) {
      setSelectedVideo(matchingVideo);
    }
  };

  useEffect(() => {
    getVideosFromFirebase().then((data) => {
      console.log("Video Data:", data);
      setVideoData(data);
    });
  }, []);

  useEffect(() => {
    if (videoData.length > 0) {
      const allCategoryIds = new Set(
        videoData.flatMap((show) => show.categoryIds)
      );
      const uniqueCategoryIds = Array.from(allCategoryIds);
      if (uniqueCategoryIds.length > 0) {
        getCategoriesFromFirebase(uniqueCategoryIds).then((data) => {
          console.log("Category Data:", data);
          setCategories(data);
        });
      }
    }
  }, [videoData]);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.925);",
        height: "100vh",
      }}
    >
      <VideosNavbar
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
      <VideoPanels
        categories={categories}
        videos={videoData}
        activeCategory={activeCategory}
        selectedVideo={selectedVideo}
      />
    </Box>
  );
};

export default Page;
