"use client";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import VideoPanels from "../components/videoPanels/videoPanels";
import VideosNavbar from "../components/videosNavbar/videosNavbar";
import { getCategoriesList } from "../services/getCategoriesList";
import { getVideoList } from "../services/getVideoList";
import { Category, VideoData } from "../types/naiza";
import { capitalize } from "lodash";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  useEffect(() => {
    getCategoriesList().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    getVideoList().then((res: any) => setVideos(res.data));
  }, []);

  const formattedCategories = categories.map((category) => ({
    ...category,
    attributes: {
      ...category.attributes,
      name: capitalize(category.attributes?.name),
    },
  }));

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.925);",
        height: "100vh",
      }}
    >
      <VideosNavbar
        categories={formattedCategories}
        onCategoryClick={handleCategoryClick}
      />
      <Provider store={store}>
        <VideoPanels
          categories={formattedCategories}
          videos={videos}
          activeCategory={activeCategory}
        />
      </Provider>
    </Box>
  );
};

export default Page;
